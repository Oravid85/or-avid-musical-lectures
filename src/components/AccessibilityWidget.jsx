import { useState, useRef } from 'react';
import { FaUniversalAccess, FaTimes } from 'react-icons/fa';
import { useEscapeKey } from '../hooks/useEscapeKey';

export function AccessibilityWidget({ accessibility }) {
  const {
    fontSizeLevel, setFontSizeLevel,
    grayscale, setGrayscale,
    highContrast, setHighContrast,
    highlightLinks, setHighlightLinks,
    stopAnimations, setStopAnimations,
    readableFont, setReadableFont,
    handleResetAccessibility
  } = accessibility;

  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  // שימוש ב-Hook החדש שלנו לטיפול ב-Esc באופן נקי!
  useEscapeKey(isOpen, () => setIsOpen(false), buttonRef);

  // פונקציות עזר מקומיות
  const changeFontSize = (newLevel) => {
    setFontSizeLevel(newLevel);
    const html = document.documentElement;
    html.classList.remove("font-size-level-1", "font-size-level-2");
    if (newLevel === 1) html.classList.add("font-size-level-1");
    if (newLevel === 2) html.classList.add("font-size-level-2");
  };

  const handleResetAll = () => {
    handleResetAccessibility();
    const html = document.documentElement;
    html.classList.remove("font-size-level-1", "font-size-level-2");
    setIsOpen(false);
  };

  const isAnyActive = 
    fontSizeLevel > 0 || grayscale || highContrast || highlightLinks || stopAnimations || readableFont;

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label="תפריט נגישות"
        className={`flex items-center justify-center gap-2 p-2.5 md:px-3.5 md:py-2 rounded-full md:rounded-xl border text-sm font-medium transition-all shadow-sm cursor-pointer ${
          isAnyActive
            ? "bg-amber-900 text-white border-amber-900 ring-2 ring-amber-400"
            : "bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100"
        }`}
      >
        <FaUniversalAccess className="text-xl md:text-lg" />
        <span className="hidden md:inline">נגישות</span>
      </button>

      {isOpen && (
        <div 
          ref={menuRef}
          className="absolute left-0 mt-2 w-72 max-w-[calc(100vw-2rem)] bg-white border border-amber-100 shadow-2xl rounded-3xl p-5 font-heebo text-amber-900 z-50 text-right animate-fade-in max-h-[80vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-amber-100">
            <button
              onClick={() => {
                setIsOpen(false);
                buttonRef.current?.focus();
              }}
              className="p-1.5 rounded-full bg-amber-50 text-amber-900 hover:bg-amber-100 transition-colors cursor-pointer"
              aria-label="סגור תפריט נגישות"
            >
              <FaTimes size={14} />
            </button>
            <h3 className="font-bold text-amber-950 text-base">נגישות</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-2.5 mb-4">
            <button
              onClick={() => changeFontSize(fontSizeLevel < 2 ? fontSizeLevel + 1 : 2)}
              className="p-2.5 border border-amber-200 rounded-2xl text-xs font-bold bg-white text-amber-950 hover:bg-amber-50 transition-all cursor-pointer flex items-center justify-center"
            >
              הגדל טקסט A+
            </button>
            <button
              onClick={() => changeFontSize(fontSizeLevel > 0 ? fontSizeLevel - 1 : 0)}
              className="p-2.5 border border-amber-200 rounded-2xl text-xs font-bold bg-white text-amber-950 hover:bg-amber-50 transition-all cursor-pointer flex items-center justify-center"
            >
              הקטן טקסט A-
            </button>
            <button
              onClick={() => setHighContrast((prev) => !prev)}
              className={`p-2.5 border rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                highContrast ? "bg-amber-900 text-white border-amber-900" : "bg-white text-amber-950 border-amber-200 hover:bg-amber-50"
              }`}
            >
              ניגודיות גבוהה
            </button>
            <button
              onClick={() => setGrayscale((prev) => !prev)}
              className={`p-2.5 border rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                grayscale ? "bg-amber-900 text-white border-amber-900" : "bg-white text-amber-950 border-amber-200 hover:bg-amber-50"
              }`}
            >
              גווני אפור
            </button>
            <button
              onClick={() => setHighlightLinks((prev) => !prev)}
              className={`p-2.5 border rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                highlightLinks ? "bg-amber-900 text-white border-amber-900" : "bg-white text-amber-950 border-amber-200 hover:bg-amber-50"
              }`}
            >
              הדגש קישורים
            </button>
            <button
              onClick={() => setReadableFont((prev) => !prev)}
              className={`p-2.5 border rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                readableFont ? "bg-amber-900 text-white border-amber-900" : "bg-white text-amber-950 border-amber-200 hover:bg-amber-50"
              }`}
            >
              גופן קריא
            </button>
            <button
              onClick={() => setStopAnimations((prev) => !prev)}
              className={`col-span-2 p-2.5 border rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                stopAnimations ? "bg-amber-900 text-white border-amber-900" : "bg-white text-amber-950 border-amber-200 hover:bg-amber-50"
              }`}
            >
              עצירת אנימציות
            </button>
          </div>

          <div className="pt-3 border-t border-amber-100">
            <button
              onClick={handleResetAll}
              className="w-full py-2.5 px-4 border border-amber-200 rounded-2xl text-xs font-bold text-amber-950 bg-amber-50 hover:bg-amber-100 transition-colors cursor-pointer text-center"
            >
              איפוס הגדרות נגישות
            </button>
          </div>
        </div>
      )}
    </div>
  );
}