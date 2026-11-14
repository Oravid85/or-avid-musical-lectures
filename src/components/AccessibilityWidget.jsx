import { useState, useRef, useEffect } from "react";
import { FaUniversalAccess, FaTimes } from "react-icons/fa";

export default function AccessibilityWidget({ accessibility }) {
  const {
    fontSizeLevel, setFontSizeLevel,
    grayscale, setGrayscale,
    highContrast, setHighContrast,
    highlightLinks, setHighlightLinks,
    stopAnimations, setStopAnimations,
    readableFont, setReadableFont,
    handleResetAccessibility
  } = accessibility;

  const [isAccessibilityMenuOpen, setIsAccessibilityMenuOpen] = useState(false);
  const accessibilityMenuRef = useRef(null);

  // ===== סגירה של תפריט הנגישות בלחיצה מחוץ =====
  useEffect(() => {
    const handleAccessibilityClickOutside = (event) => {
      if (
        accessibilityMenuRef.current && 
        !accessibilityMenuRef.current.contains(event.target)
      ) {
        setIsAccessibilityMenuOpen(false);
      }
    };

    if (isAccessibilityMenuOpen) {
      document.addEventListener("mousedown", handleAccessibilityClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleAccessibilityClickOutside);
    };
  }, [isAccessibilityMenuOpen]);

  // פונקציית שינוי גודל טקסט שמעדכנת גם את ה-state וגם את ה-HTML ישירות
  const changeFontSize = (newLevel) => {
    setFontSizeLevel(newLevel);
    const html = document.documentElement;
    html.classList.remove("font-size-level-1", "font-size-level-2");
    if (newLevel === 1) html.classList.add("font-size-level-1");
    if (newLevel === 2) html.classList.add("font-size-level-2");
  };

  // פונקציית איפוס כוללת שמנקה גם את ה-HTML
  const handleResetAll = () => {
    handleResetAccessibility();
    const html = document.documentElement;
    html.classList.remove("font-size-level-1", "font-size-level-2");
    setIsAccessibilityMenuOpen(false);
  };

  // בדיקה האם יש לפחות מאפיין נגישות אחד פעיל
  const isAnyAccessibilityActive = 
    fontSizeLevel > 0 || grayscale || highContrast || highlightLinks || stopAnimations || readableFont;

  return (
    <div className="relative inline-block text-right" ref={accessibilityMenuRef}>
      {/* כפתור הנגישות הראשי */}
      <button
        onClick={() => setIsAccessibilityMenuOpen((prev) => !prev)}
        aria-expanded={isAccessibilityMenuOpen}
        aria-label="תפריט נגישות"
        className={`flex items-center justify-center gap-2 p-2.5 md:px-3.5 md:py-2 rounded-full md:rounded-xl border text-sm font-medium transition-all shadow-sm cursor-pointer shrink-0 ${
          isAnyAccessibilityActive
            ? "bg-amber-900 text-white border-amber-900 ring-2 ring-amber-400"
            : "bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100"
        }`}
      >
        <FaUniversalAccess className="text-xl md:text-lg" />
        <span className="hidden md:inline">נגישות</span>
      </button>

      {/* חלונית ווידג'ט הנגישות - ממוקמת נכון ובטוח במובייל ובדסקטופ */}
      {isAccessibilityMenuOpen && (
        <div className="absolute left-0 md:left-auto md:right-0 mt-2 w-[calc(100vw-2rem)] sm:w-80 bg-white border border-amber-100 shadow-2xl rounded-3xl p-5 font-heebo text-amber-900 z-50 text-right animate-fade-in max-h-[80vh] overflow-y-auto">
          
          {/* כותרת וכפתור סגירה */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-amber-100">
            <button
              onClick={() => setIsAccessibilityMenuOpen(false)}
              className="p-1.5 rounded-full bg-amber-50 text-amber-900 hover:bg-amber-100 transition-colors cursor-pointer"
              aria-label="סגור תפריט נגישות"
            >
              <FaTimes size={14} />
            </button>
            <h3 className="font-bold text-amber-950 text-base">נגישות</h3>
          </div>
          
          {/* גריד כפתורי הפונקציות */}
          <div className="grid grid-cols-2 gap-2.5 mb-4">
            {/* הגדל טקסט */}
            <button
              onClick={() => {
                const next = fontSizeLevel < 2 ? fontSizeLevel + 1 : 2;
                changeFontSize(next);
              }}
              className="p-2.5 border border-amber-200 rounded-2xl text-xs font-bold bg-white text-amber-950 hover:bg-amber-50 transition-all cursor-pointer flex items-center justify-center gap-1"
            >
              הגדל טקסט A+
            </button>

            {/* הקטן טקסט */}
            <button
              onClick={() => {
                const prev = fontSizeLevel > 0 ? fontSizeLevel - 1 : 0;
                changeFontSize(prev);
              }}
              className="p-2.5 border border-amber-200 rounded-2xl text-xs font-bold bg-white text-amber-950 hover:bg-amber-50 transition-all cursor-pointer flex items-center justify-center gap-1"
            >
              הקטן טקסט A-
            </button>

            {/* ניגודיות גבוהה */}
            <button
              onClick={() => setHighContrast((prev) => !prev)}
              className={`p-2.5 border rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                highContrast 
                  ? "bg-amber-900 text-white border-amber-900" 
                  : "bg-white text-amber-950 border-amber-200 hover:bg-amber-50"
              }`}
            >
              ניגודיות גבוהה
            </button>

            {/* גווני אפור */}
            <button
              onClick={() => setGrayscale((prev) => !prev)}
              className={`p-2.5 border rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                grayscale 
                  ? "bg-amber-900 text-white border-amber-900" 
                  : "bg-white text-amber-950 border-amber-200 hover:bg-amber-50"
              }`}
            >
              גווני אפור
            </button>

            {/* הדגש קישורים */}
            <button
              onClick={() => setHighlightLinks((prev) => !prev)}
              className={`p-2.5 border rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                highlightLinks 
                  ? "bg-amber-900 text-white border-amber-900" 
                  : "bg-white text-amber-950 border-amber-200 hover:bg-amber-50"
              }`}
            >
              הדגש קישורים
            </button>

            {/* גופן קריא */}
            <button
              onClick={() => setReadableFont((prev) => !prev)}
              className={`p-2.5 border rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                readableFont 
                  ? "bg-amber-900 text-white border-amber-900" 
                  : "bg-white text-amber-950 border-amber-200 hover:bg-amber-50"
              }`}
            >
              גופן קריא
            </button>

            {/* עצירת אנימציות */}
            <button
              onClick={() => setStopAnimations((prev) => !prev)}
              className={`col-span-2 p-2.5 border rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                stopAnimations 
                  ? "bg-amber-900 text-white border-amber-900" 
                  : "bg-white text-amber-950 border-amber-200 hover:bg-amber-50"
              }`}
            >
              עצירת אנימציות
            </button>
          </div>

          {/* כפתור איפוס */}
          <div className="pt-3 border-t border-amber-100 flex flex-col gap-2">
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