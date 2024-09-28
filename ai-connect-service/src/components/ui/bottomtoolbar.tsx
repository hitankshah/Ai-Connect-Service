"use client";

import { useState, useCallback, useMemo } from 'react';
import { Home, Sun, Moon, Settings, Wifi, Volume2, Battery, Clock, Headphones, MonitorSmartphone } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const icons = [
  { Icon: Clock, label: 'Clock' },
];

export default function BottomToolbar() {
  const [settings, setSettings] = useState({
    isDarkMode: false,
    backgroundColor: '#1f2937',
  });

  const toggleDarkMode = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      isDarkMode: !prev.isDarkMode,
    }));
    document.documentElement.classList.toggle('dark');
  }, []);

  const handleBackgroundColorChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setSettings((prev) => ({
      ...prev,
      backgroundColor: newColor,
    }));
    document.documentElement.style.backgroundColor = newColor;
  }, []);

  const toolbarButtons = useMemo(() => [
    { icon: Home, label: "Home" },
    { icon: settings.isDarkMode ? Sun : Moon, label: "Toggle theme", onClick: toggleDarkMode },
  ], [settings.isDarkMode, toggleDarkMode]);

  const [time, setTime] = useState(new Date());

  // Update time every minute
  useState(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, [1]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background" style={{ backgroundColor: settings.backgroundColor }}>
      <div className="text-foreground p-1 flex justify-between items-center max-w-md mx-auto">
        <div className="flex space-x-2">
          {toolbarButtons.map(({ icon: Icon, label, onClick }, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm" // Smaller button size
              onClick={onClick}
              aria-label={label}
              className="p-1" // Reduced padding for buttons
            >
              <Icon className="h-4 w-4" />
            </Button>
          ))}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" aria-label="Settings" className="p-1">
                <Settings className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-36">
              <div className="flex items-center space-x-1">
                <label htmlFor="bg-color" className="text-xs font-medium">
                  Background:
                </label>
                <input
                  id="bg-color"
                  type="color"
                  value={settings.backgroundColor}
                  onChange={handleBackgroundColorChange}
                  className="w-6 h-6 rounded-md border border-input"
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <TooltipProvider>
          <div className="flex items-center space-x-2">
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
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
}
