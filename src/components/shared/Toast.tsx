import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
  duration?: number;
}

const Toast = ({ message, type = 'success', onClose, duration = 4000 }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); 
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  const bgColor = type === 'success' ? 'bg-green-600' : 'bg-customRedAlert';
  const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';

  return (
    <>
      <style>
        {`
          @keyframes shrink {
            from {
              width: 100%;
            }
            to {
              width: 0%;
            }
          }
          .animate-shrink {
            animation: shrink linear;
          }
        `}
      </style>

      <div

        className={`fixed bottom-10 right-10 z-50 rounded-lg shadow-lg text-white transition-transform duration-300 ease-in-out ${bgColor} ${
          isVisible ? 'translate-x-0' : 'translate-x-[120%]'
        }  overflow-hidden`}
      >
        <div className="flex items-center p-4">
          <i className={`fa-solid ${icon} mr-3 text-xl`}></i>
          <span>{message}</span>
          <button onClick={onClose} className="ml-4 text-xl font-bold leading-none">&times;</button>
        </div>

        <div
          className="absolute bottom-0 left-0 h-1.5 bg-white bg-opacity-70 animate-shrink"
          style={{ animationDuration: `${duration}ms` }}
        ></div>
      </div>
    </>
  );
};

export default Toast;
