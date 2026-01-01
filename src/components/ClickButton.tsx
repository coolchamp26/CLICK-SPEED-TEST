import { useCallback, useRef } from "react";

interface ClickButtonProps {
  onClick: () => void;
  disabled: boolean;
  isActive: boolean;
  clickCount: number;
}

const ClickButton = ({ onClick, disabled, isActive, clickCount }: ClickButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;

      // Create ripple effect
      const button = buttonRef.current;
      if (button) {
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement("span");
        ripple.className = "ripple";
        ripple.style.left = `${e.clientX - rect.left}px`;
        ripple.style.top = `${e.clientY - rect.top}px`;
        ripple.style.width = ripple.style.height = `${Math.max(rect.width, rect.height)}px`;
        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      }

      onClick();
    },
    [onClick, disabled]
  );

  // Prevent context menu
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
  }, []);

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      disabled={disabled}
      className={`click-button w-64 h-64 sm:w-80 sm:h-80 rounded-full flex flex-col items-center justify-center ${
        isActive ? "animate-pulse-glow" : ""
      }`}
    >
      <span className="font-display text-6xl sm:text-7xl font-bold text-primary-foreground mb-2 pointer-events-none">
        {isActive ? clickCount : "CLICK"}
      </span>
      <span className="text-primary-foreground/80 text-sm sm:text-base uppercase tracking-widest pointer-events-none">
        {isActive ? "Keep clicking!" : disabled ? "Wait..." : "Start test"}
      </span>
    </button>
  );
};

export default ClickButton;
