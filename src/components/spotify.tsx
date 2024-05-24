"use client"

import "../../public/css/soundtrack.css"

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const songs = [
  {
    title: "Star Shopping",
    artist: "Lil Peep",
    url: "/songs/star-shopping.mp3",
    cover: "/images/star-shopping-cover.webp"
  },
  {
    title: "No Idea",
    artist: "Don Toliver",
    url: "/songs/no-idea.mp3",
    cover: "/images/no-idea-cover.webp"
  }
];

export default function Spotify() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [waveform, setWaveform] = useState(new Array(6).fill(2));
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    }
    return () => {
      if (audio) {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      const audioContext = new window.AudioContext();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 64;
      const source = audioContext.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      analyserRef.current = analyser;
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
    }
  }, []);

  useEffect(() => {
    if (isPlaying) {
      updateWaveform();
    }
  }, [isPlaying]);

  const updateWaveform = () => {
    if (analyserRef.current && dataArrayRef.current) {
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);

      const newWaveform = Array.from(dataArrayRef.current.slice(0, 6)).map((value: number) => Math.max(2, value / 16));

      setWaveform(newWaveform);
      requestAnimationFrame(updateWaveform);
    }
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    setDuration(audio.duration);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    setProgress(audio.currentTime);
  };

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentSongIndex((currentSongIndex + 1) % songs.length);
    setProgress(0);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentSongIndex((currentSongIndex - 1 + songs.length) % songs.length);
    setProgress(0);
    setIsPlaying(true);
  };

  useEffect(() => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [currentSongIndex]);


  return (
    <div className="w-full h-full flex flex-col gap-4">
      <audio ref={audioRef} src={songs[currentSongIndex].url} />
      <div className="flex justify-between">
        <div className="flex gap-4">
          <Image
            className="rounded-xl pointer-events-none"
            src={songs[currentSongIndex].cover}
            alt="Star Shopping album by Lil Peep" 
            width={56} height={56}
          />
          <div className="flex flex-col">
            <p className="font-semibold text-white">{songs[currentSongIndex].title}</p>
            <p className="text-sm">{songs[currentSongIndex].artist}</p>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1">
            {waveform.map((height, index) => (
              <span key={index} className="w-[2px] bg-purple-500 rounded-full" style={{ height: `${height}px` }}></span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs tabular-nums">{Math.floor(progress / 60)}:{('0' + Math.floor(progress % 60)).slice(-2)}</span>
        <input 
          className="soundtrack w-full h-2 focus:outline-none" 
          type="range" 
          min="0" 
          max={duration} 
          value={progress}
          onChange={(e) => {
            const audio = audioRef.current;
            audio.currentTime = e.target.value;
            setProgress(parseInt(e.target.value));
          }}></input>
        <span className="text-xs tabular-nums">{Math.floor(duration / 60)}:{('0' + Math.floor(duration % 60)).slice(-2)}</span>
      </div>
      <div className="grid grid-cols-5 place-items-center">
        <button className="col-start-2" onClick={handlePrev}>
          <motion.div whileTap={{scale: 0.8, opacity: 0.5}}>
            <Image
              className="w-6 h-6"
              src="/icons/player-control-back.svg" 
              alt="Star Shopping album by Lil Peep" 
              width={29} height={25}
            />
          </motion.div>
        </button>
        <button onClick={handlePlayPause}>
          <motion.div whileTap={{scale: 0.9, opacity: 0.5}}>
          {
            isPlaying
              ? (<Image
                  className="w-6 h-6"
                  src="/icons/player-control-pause.svg" 
                  alt="Star Shopping album by Lil Peep" 
                  width={24} height={24}
                />)
              : (<Image
                  className="w-6 h-6"
                  src="/icons/player-control-play.svg" 
                  alt="Star Shopping album by Lil Peep" 
                  width={22} height={25}
                />)
          }
          </motion.div>
        </button>
        <button onClick={handleNext}>
          <motion.div whileTap={{scale: 0.8, opacity: 0.5}}>
            <Image
              className="w-6 h-6" 
              src="/icons/player-control-next.svg" 
              alt="Star Shopping album by Lil Peep" 
              width={28} height={25}
            />
          </motion.div>
        </button>
        <Image
          className="w-7 h-7 place-self-end pointer-events-none"
          src="/icons/airplay.svg" 
          alt="Star Shopping album by Lil Peep" 
          width={24} height={24}
        />
      </div>
    </div>
  );
}
