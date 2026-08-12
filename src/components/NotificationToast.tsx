import React from 'react';
import { ShoppingBag, Sparkles, Check, X } from 'lucide-react';

interface NotificationToastProps {
  message: string | null;
  type?: 'cart' | 'quiz' | 'info';
  onClose: () => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({
  message,
  type = 'cart',
  onClose,
}) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-in max-w-sm">
      <div className="bg-[#212925] text-white p-4 rounded-2xl shadow-2xl border border-[#7C9F8A] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#7C9F8A] flex items-center justify-center shrink-0">
            {type === 'quiz' ? (
              <Sparkles className="w-4 h-4 text-white" />
            ) : (
              <ShoppingBag className="w-4 h-4 text-white" />
            )}
          </div>
          <p className="text-xs font-medium text-[#FAF8F3] leading-snug">
            {message}
          </p>
        </div>

        <button
          onClick={onClose}
          className="p-1 text-[#A9C3C2] hover:text-white rounded-lg hover:bg-white/10"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
