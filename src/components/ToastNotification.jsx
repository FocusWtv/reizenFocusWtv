import { useEffect } from 'react';

const VARIANT_STYLES = {
  success: 'border-[#162b58] bg-white text-[#162b58]',
  info: 'border-[#4ab0e1] bg-white text-[#162b58]',
  warning: 'border-orange-400 bg-white text-[#162b58]',
  error: 'border-red-500 bg-white text-[#162b58]',
};

const ToastNotification = ({ message, variant = 'info', onClose }) => {
  useEffect(() => {
    if (!message) return undefined;
    const timer = setTimeout(() => onClose?.(), 6000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  const style = VARIANT_STYLES[variant] || VARIANT_STYLES.info;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-6 left-1/2 z-50 w-[min(calc(100%-2rem),28rem)] -translate-x-1/2"
    >
      <div
        className={`flex items-start gap-3 rounded-lg border-2 px-4 py-3 shadow-lg ${style}`}
      >
        <p className="flex-1 text-sm font-medium leading-relaxed">{message}</p>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded px-1 text-lg leading-none text-[#162b58] hover:text-[#4ab0e1]"
          aria-label="Melding sluiten"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default ToastNotification;
