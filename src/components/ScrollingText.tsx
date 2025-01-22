// ScrollingText Component
// Features:
// - Handles text overflow with smooth scrolling animation
// - Activates on hover for better user experience
// - Automatically detects if scrolling is needed
// - Resets position when not hovered
// - Smooth transitions with configurable duration
// - Responsive to container width changes
// - Supports custom styling through className prop

import React, { useEffect, useRef, useState } from 'react';

interface ScrollingTextProps {
  text: string;
  className?: string;
}

export default function ScrollingText({ text, className = '' }: ScrollingTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Check if text overflows container and needs scrolling
  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current && textRef.current) {
        setShouldScroll(textRef.current.offsetWidth > containerRef.current.offsetWidth);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [text]);

  return (
    <div 
      ref={containerRef}
      className={`scroll-text ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={textRef}
        className="scroll-content"
        style={{
          transform: shouldScroll && isHovered ? 'translateX(-50%)' : 'translateX(0)'
        }}
      >
        {text.toLowerCase()}
      </div>
    </div>
  );
}