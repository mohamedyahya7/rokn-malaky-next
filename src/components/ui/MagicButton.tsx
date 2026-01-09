'use client';

import React from 'react';

interface MagicButtonProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  color1?: string;
  color2?: string;
  type?: "button" | "submit" | "reset";
  rel?: string;
  animationTrigger?: 'hover' | 'group-hover';
}

const MagicButton: React.FC<MagicButtonProps> = ({ 
  children, 
  className = '', 
  onClick,
  href,
  target,
  color1 = 
  // '#2563eb',
  '#05304A',
  //  '#40a0bf', // Default blue-600
  color2 = '#ffffff',
  animationTrigger = 'hover',
  ...props 
}) => {
  const commonStyles = {
    '--c-blue': color1,
    '--c-white': color2,
  } as React.CSSProperties;

  const Tag = href ? 'a' : 'button';
  
  // Tailwind classes for layout and static styles
  // width: w-full min-w-[200px] h-[60px]
  // border: border-[3px] border-[var(--c-blue)]
  // radius: rounded-full
  // layout: relative inline-flex items-center justify-center p-0
  // cursor: cursor-pointer
  // bg: bg-transparent
  // overflow: overflow-hidden
  // transition: transition-transform duration-200 ease-out
  // transform (hover): data-[trigger=hover]:hover:scale-105 group-hover:data-[trigger=group-hover]:scale-105
  // Note: 'group-hover' here relies on a PARENT 'group' class (Service Card).
  // The button itself also has 'group' class for internal logic if needed, but here it's fine.
  
  const baseClasses = "magic-btn relative inline-flex items-center justify-center p-0 w-full min-w-[200px] h-[60px] rounded-full border-[3px] border-[var(--c-blue)] bg-transparent cursor-pointer overflow-hidden transition-transform duration-200 ease-out no-underline";
  const hoverClasses = "data-[trigger=hover]:hover:scale-105 group-hover:data-[trigger=group-hover]:scale-105";

  const elementProps = {
    className: `${baseClasses} ${hoverClasses} ${className}`,
    style: commonStyles,
    'data-trigger': animationTrigger,
    ...props
  };

  if (href) {
    return (
      <a 
        href={href}
        target={target}
        {...elementProps}
      >
        <span className="magic-text relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
        <Style />
      </a>
    );
  }

  return (
    <button 
      onClick={onClick}
      type={props.type || 'button'}
      {...elementProps as React.ButtonHTMLAttributes<HTMLButtonElement>}
    >
      <span className="magic-text relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      <Style />
    </button>
  );
};

// CSS only handles the advanced gradient animation and gradients which are complex in pure Tailwind utilities without config
const Style = () => (
  <style jsx global>{`
    .magic-btn {
      --angle: 0deg;
      /* Static styles handled by Tailwind classes */
    }

    .magic-btn::before {
      content: '';
      position: absolute;
      inset: 0;
      z-index: 0;

      background: conic-gradient(
        from var(--angle),
        var(--c-blue) 0% 50%,
        var(--c-white) 50% 100%
      );
    }

    .magic-text {
      font-size: 20px;
      font-weight: bold;

      background: conic-gradient(
        from var(--angle),
        var(--c-white) 0% 50%,
        var(--c-blue) 50% 100%
      );

      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;

      pointer-events: none;
    }

    /* Icon styles - ensure they are visible if colored explicitly */
    .magic-text svg {
      color: var(--c-blue);
      fill: currentColor;
    }

    /* Animation Logic */
    @keyframes spin-gradient {
      to {
        --angle: 360deg;
      }
    }

    /* Trigger: Hover (Default) */
    .magic-btn[data-trigger="hover"]:hover::before,
    .magic-btn[data-trigger="hover"]:hover .magic-text {
      animation: spin-gradient 2s linear infinite;
    }

    /* Trigger: Group Hover (Parent) */
    :global(.group):hover .magic-btn[data-trigger="group-hover"]::before,
    :global(.group):hover .magic-btn[data-trigger="group-hover"] .magic-text {
      animation: spin-gradient 2s linear 1;
    }
  `}</style>
);

export default MagicButton;
