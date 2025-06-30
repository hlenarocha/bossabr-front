
import { useState, useEffect } from 'react';

const ScrollToEndArrow = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      const buffer = 100;
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - buffer;

      const hasScrollableContent = document.documentElement.scrollHeight > window.innerHeight;

      if (hasScrollableContent && !isAtBottom) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    toggleVisibility();

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <button
      title='Ir para o final da página'
      type="button"
      onClick={scrollToBottom}
      style={{ animationDuration: '2s'}}
      className={`
        fixed 
        bottom-5 
        animate-bounce
        left-1/2 
        -translate-x-1/2 
        z-50 
        flex 
        items-center 
        justify-center 
        w-12 
        h-12 
        bg-customYellow/80
        hover:bg-customYellow
        backdrop-blur-sm
        rounded-full 
        shadow-xl
        transition-opacity 
        duration-300
        ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}
      aria-label="Rolar para o final da página"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-customTextGray"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
};

export default ScrollToEndArrow;