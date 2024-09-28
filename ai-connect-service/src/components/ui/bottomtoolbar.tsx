"use client";

import { useState, useEffect } from 'react';
import { Moon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const icons = [
  { Icon: Moon, label: 'Night Light' },
];

export default function TaskTray() {
  const [time, setTime] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Ensures the component is mounted before running client-side code
    const updateClock = () => setTime(new Date());
    
    if (isMounted) {
      updateClock(); // Set the time immediately
      const timer = setInterval(updateClock, 60000); // Update time every minute

      return () => clearInterval(timer); // Cleanup interval on component unmount
    }
  }, [isMounted]);

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
          {time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
        </div>
      </div>
    </TooltipProvider>
  );
}
