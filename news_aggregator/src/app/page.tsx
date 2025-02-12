"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@heroui/react";
import Main from '@/components/Main';
import { UserIcon } from "@heroicons/react/24/solid";
import NavBar from '@/components/navbar';

export default function HomePage() {
  const [isBottomDivExpanded, setIsBottomDivExpanded] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY) {
        setIsBottomDivExpanded(true);
      } else {
        setIsBottomDivExpanded(false);
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Main>
      <NavBar />
      
      <div className="flex justify-between mx-4 h-2/3 bg-foreground_light dark:bg-foreground_dark text-black dark:text-white rounded-3xl">
        <div className='flex flex-col justify-evenly items-start w-1/2 sm:ml-4 md:ml-6 ml-2'>
          <div className='w-full p-4'>
            <h2 className="text-left font-bold">News Aggregator</h2>
            <p className="text-left">
              Welcome to your one-stop news hub! 🌍
              <br />
              Stay updated with the latest headlines, breaking news, and in-depth stories from all around the world. With our easy-to-navigate interface, you can access the most relevant news based on your interests. From politics and technology to entertainment and sports, we've got it all covered.
              <br />
              Feel free to explore, personalize your feed, and dive into the stories that matter to you. Let’s keep you informed, every step of the way!
            </p>
          </div>
          <div className='flex w-full gap-8 p-4'>
            <Button color="primary">Read News</Button>
            <Button color="secondary">Explore More -{">"}</Button>
          </div>
        </div>

        <div className='flex flex-col justify-center items-end p-4 w-1/2 sm:mr-4 md:mr-6 mr-2'>
          <div className='flex flex-col items-center w-1/2'>
            <div className='flex items-center'>
              <span className='text-primary text-6xl'>1048576</span>
              <UserIcon className="text-primary h-12 w-12 ml-2" />
            </div>
            <h2 className='text-center'>Users Registered</h2>
          </div>
        </div>
      </div>

      {/* Bottom Div */}
      <div
        className={`fixed bottom-0 left-0 right-0 transition-transform duration-300 ease-in-out
          ${isBottomDivExpanded ? 'translate-y-0 h-2/3' : 'translate-y-[calc(100%-6rem)] h-24'}
          rounded-3xl bg-foreground_light dark:bg-foreground_dark text-black dark:text-white overflow-y-scroll`}
      >
        {/* Add your scrollable content here */}
      </div>
    </Main>
  );
}
