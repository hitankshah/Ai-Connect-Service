"use client";

import { useState, useEffect } from 'react';
import { Moon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const icons = [
  { Icon: Moon, label: 'Night Light' },
];

export default function TaskTray() {
  const [time, setTime] = useState(new Date()); // Initialize with the current time

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };

  useEffect(() => {
    const updateClock = () => setTime(new Date());

    // Set the time immediately on mount
    updateClock();

    const timer = setInterval(updateClock, 60000); // Update time every minute
    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, []);

  return (
    <TooltipProvider>
      <div className="fixed bottom-0 right-0 left-0 bg-gray-900 text-white p-1 flex justify-end items-center space-x-2">
        {icons.map(({ Icon, label }, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <button className="p-1 rounded hover:bg-gray-800 transition-colors">
                <Icon size={16} />
                <span className="sr-only">{label}</span>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
        <div className="text-xs font-medium ml-2">
          {time ? formatTime(time) : '--:--'}
        </div>
      </div>
    </TooltipProvider>
  );
}
