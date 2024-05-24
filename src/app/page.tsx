"use client"

import Timer from '../components/timer';
import Spotify from '../components/spotify';

import Image from 'next/image'
import { useMemo, useState, useRef } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";

export default function Phone() {
  const [isleCurrentState, setIsleCurrentState] = useState('default');
  const isleContainer = useRef(null);
  const isleStyle = {
    default: {
      width: 128,
      height: 32,
      borderRadius: 999
    },
    timer: {
      width: 348,
      height: 77,
      borderRadius: 999
    },
    spotify: {
      width: 348,
      height: 176,
      borderRadius: 40
    },
  }
  const phoneIcons = [
    {
      name: "timer",
      src: "/icons/clock.svg",
      alt: "Clock Icon",
      width: 260,
      height: 260,
    },
    {
      name: "spotify",
      src: "/icons/spotify.png",
      alt: "Clock Icon",
      width: 100,
      height: 100,
    },
    {
      name: "default",
      src: "/icons/books.png",
      alt: "Books Icon",
      width: 60,
      height: 60,
    },
    {
      name: "default",
      src: "/icons/calculator.png",
      alt: "Calculator Icon",
      width: 60,
      height: 60,
    },
    {
      name: "default",
      src: "/icons/contacts.png",
      alt: "Contacts Icon",
      width: 60,
      height: 60,
    },
    {
      name: "default",
      src: "/icons/facetime.png",
      alt: "FaceTime Icon",
      width: 60,
      height: 60,
    },
    {
      name: "default",
      src: "/icons/files.png",
      alt: "Files Icon",
      width: 60,
      height: 60,
    },
    {
      name: "default",
      src: "/icons/fitness.png",
      alt: "Fitness Icon",
      width: 60,
      height: 60,
    },
    {
      name: "default",
      src: "/icons/home.png",
      alt: "Home Icon",
      width: 60,
      height: 60,
    },
    {
      name: "default",
      src: "/icons/mail.png",
      alt: "Mail Icon",
      width: 60,
      height: 60,
    },
    {
      name: "default",
      src: "/icons/music.png",
      alt: "Music Icon",
      width: 60,
      height: 60,
    },
    {
      name: "default",
      src: "/icons/phone.png",
      alt: "Phone Icon",
      width: 60,
      height: 60,
    },
  ]
  const variants = {
    initial: { 
      opacity: 0, 
      filter: "blur(8px)"
    },
    animate: { 
      opacity: 1, 
      filter: "blur(0px)"
    },
    exit: { 
      opacity: 0,
      filter: "blur(8px)"
    },
  }

  const closeIsle = () => {
    setIsleCurrentState('default');
  }

  const isleStates = useMemo(() => {
    switch (isleCurrentState) {
      case 'timer':
        return (
          <motion.div
            key="timer"
            layoutId='isle'
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: .6, type: "spring" }}
            className='w-full flex justify-between py-4 pl-4 pr-6'
          >
              <Timer closeIsle={closeIsle} />
          </motion.div>
        );
      case 'spotify':
        return (
          <motion.div
            key="spotify"
            layoutId='isle'
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: .6, type: "spring" }}
            className='w-full h-full flex justify-between p-6'
          >
              <Spotify />
          </motion.div>
        );
      default:
        return (
          <motion.div 
            layoutId='isle'
            transition={{ duration: .6, type: "spring" }}
          >
            <span className='opacity-0 pointer-events-none'>isle</span>
          </motion.div>
        );
    }
  }, [isleCurrentState]);

  useOnClickOutside(isleContainer, () => { setIsleCurrentState('default')})

  return (
    <main className="bg-black flex flex-col items-center justify-center antialiased h-screen max-h-screen gap-16">
      <h1 className="text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-br from-fuchsia-400 to-fuchsia-700">iPhone 14 Pro Max</h1>
      <div className="relative w-[400px] h-[400px] overflow-hidden after:content-[''] after:bg-gradient-to-t after:from-black after:from-10% after:rounded-lg after:pointer-events-none after:absolute after:bottom-0 after:w-full after:h-52">
        <nav>
          <motion.div 
            className="absolute top-6 h-8 left-9 flex gap-2 items-center"
            animate={{
              x: isleCurrentState === 'default' ? 0 : -24, 
              opacity: isleCurrentState === 'default' ? 1 : 0, 
              filter: isleCurrentState === 'default' ? "blur(0px)" : "blur(4px)",
            }}
            transition={{ type: "spring", duration: .6 }}
          >
              <span className="text-white font-medium text-sm">19:04</span>
              <Image
                className=''
                src="/icons/location.svg" 
                alt="iPhone 15" 
                width={15} height={14} 
              />
          </motion.div>
          <div className='absolute top-6 left-1/2 -translate-x-1/2 z-10'>
              <motion.div
                layout
                ref={isleContainer}
                className="relative z-20 flex items-center justify-center bg-black"
                style={isleStyle[isleCurrentState]}
                transition={{ duration: .6, type: "spring" }}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  {isleStates}
                </AnimatePresence>
              </motion.div>
          </div>
          <motion.div 
            className="absolute top-6 h-8 right-9 flex gap-2 items-center"
            animate={{
              x: isleCurrentState === 'default' ? 0 : 24, 
              opacity: isleCurrentState === 'default' ? 1 : 0, 
              filter: isleCurrentState === 'default' ? "blur(0px)" : "blur(4px)",
            }}
            transition={{ type: "spring", duration: .6 }}
          >
            <Image
              className=''
              src="/icons/network.svg" 
              alt="iPhone 15" 
              width={19} height={14} 
            />
            <Image
              className=''
              src="/icons/data.svg" 
              alt="iPhone 15" 
              width={21} height={14} 
            />
            <Image
              className=''
              src="/icons/battery.svg" 
              alt="iPhone 15" 
              width={27} height={14} 
            />
          </motion.div>
        </nav>
        <ul className="absolute w-full p-8 top-32 grid grid-cols-4 grid-rows-3 gap-6">
          {
            phoneIcons.map((icon, index) => {
              return (
                <li 
                  key={index}
                  onClick={() => setIsleCurrentState(icon.name)} 
                  className="cursor-pointer active:opacity-80">
                  <Image
                    className="w-[72px] h-auto rounded-xl"
                    src={icon.src} 
                    alt={icon.alt} 
                    width={icon.width} 
                    height={icon.height} 
                  />
                </li>
              )
            })
          }
        </ul>
        <Image
          priority
          className='w-full pointer-events-none'
          src="/mockups/iphone-15.webp" 
          alt="iPhone 15" 
          width={508} height={1000} 
        />
      </div>
    </main>
  );
}
