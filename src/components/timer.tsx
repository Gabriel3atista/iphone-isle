"use client"

import { 
  PauseIcon, 
  XMarkIcon,
  PlayIcon
} from '@heroicons/react/24/solid'

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Timer({ closeIsle }) {
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval = null;
    
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    } else if (interval !== null) {
      clearInterval(interval);
    }

    return () => { 
      if (interval !== null) clearInterval(interval);
    }
  }, [isRunning]);

  const formatTime = (): string => {
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  const timer: string[] = formatTime().split('');
  const variants = {
    initial: { scale: 0, opacity: 0},
    animate: { scale: 1, opacity: 1},
    exit: { scale: 0, opacity: 0},
  }
  const transition = { 
    type: "sprint", 
    bounce: false, 
    opacity: { 
      duration: .050
    },
    scale: { 
      duration: .130
    }
  }

  return (
    <>
      <div className="flex gap-4">
        <button
            onClick={() => setIsRunning(!isRunning)} 
            className="flex justify-center items-center w-[48px] h-[48px] bg-orange-500/[20%] hover:bg-orange-500/[30%] transition-all duration-200 rounded-full cursor-pointer"
          >
          <AnimatePresence mode="popLayout" initial={false}>
            {
              isRunning 
              ? (
                  <motion.div
                    key="pause"
                    variants={variants} 
                    initial="initial" 
                    animate="animate" 
                    exit="exit"
                    transition={{ ...transition }}
                  >
                    <PauseIcon className="size-6 text-amber-500" />
                  </motion.div>
                )
              : (
                  <motion.div
                    key="play"
                    variants={variants} 
                    initial="initial" 
                    animate="animate" 
                    exit="exit"
                    transition={{ ...transition }}
                  >
                    <PlayIcon className="size-6 text-amber-500" />
                  </motion.div>
                )
            }
          </AnimatePresence>
        </button>
        <button 
          onClick={closeIsle}  
          className="flex justify-center items-center w-[48px] h-[48px] bg-gray-500/[20%] hover:bg-gray-500/[30%] transition-all duration-200 rounded-full cursor-pointer"
        >
          <XMarkIcon className="size-6 text-white" />
        </button>
      </div>
      <div className="flex items-end gap-2 text-amber-500">
        <div className="text-base leading-snug">Timer</div>
        <div className='flex items-end relative whitespace-nowrap text-[40px] leading-none tabular-nums'>
          <AnimatePresence mode="popLayout" initial={false}>
              {timer.map((digit, index) => {
                  return (
                      <motion.span
                          key={`${digit}-${index}`}
                          className='inline-block'
                          initial={{ y: -16, opacity: 0, filter: "blur(4px)" }} 
                          animate={{ y: 0, opacity: 1,filter: "blur(0px)" }} 
                          exit={{ y: 16, opacity: 0,  filter: "blur(4px)" }}
                      >
                          {digit}
                      </motion.span>
                  );
              })}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
