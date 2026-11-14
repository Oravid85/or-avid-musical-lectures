import { useEffect } from 'react';

/**
 * Hook גלובלי לטיפול בסגירת אלמנטים (מודאלים/תפריטים) בלחיצה על Escape
 * והחזרת הפוקוס לאלמנט שפתח אותם לפי תקני הנגישות.
 */
export function useEscapeKey(isOpen, onClose, triggerRef) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
        // מחזיר את הפוקוס לכפתור הפתיחה אם קיים רפרנס
        if (triggerRef && triggerRef.current) {
          triggerRef.current.focus();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, triggerRef]);
}