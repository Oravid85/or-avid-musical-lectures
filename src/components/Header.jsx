import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { FaWhatsapp, FaEnvelope, FaBars, FaChevronDown, FaUniversalAccess, FaTimes } from "react-icons/fa";
import { artistsData } from "../artistdata";

export function Header({ accessibility }) {
  const {
    fontSizeLevel, setFontSizeLevel,
    grayscale, setGrayscale,
    highContrast, setHighContrast,
    highlightLinks, setHighlightLinks,
    stopAnimations, setStopAnimations,
    readableFont, setReadableFont,
    handleResetAccessibility
  } = accessibility;

  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const [IsMenuOpen, setIsMenuOpen] = useState(false);
  const [isLecturesSubOpen, setIsLecturesSubOpen] = useState(false);
  const [isAccessibilityMenuOpen, setIsAccessibilityMenuOpen] = useState(false); 
  const accessibilityMenuRef = useRef(null);
  const accessibilityButtonRef = useRef(null);
  const location = useLocation();

  // ===== גלילה למעלה בכל שינוי URL =====
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
    setIsLecturesSubOpen(false);
    setIsAccessibilityMenuOpen(false);
  }, [location.pathname]);

  // ===== סגירה של התפריט הראשי בלחיצה מחוץ =====
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target) &&
        buttonRef.current && 
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
        setIsLecturesSubOpen(false);
      }
    };

    if (IsMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [IsMenuOpen]);

  // ===== סגירה של תפריט הנגישות בלחיצה מחוץ =====
  useEffect(() => {
    const handleAccessibilityClickOutside = (event) => {
      if (
        accessibilityMenuRef.current && 
        !accessibilityMenuRef.current.contains(event.target) &&
        accessibilityButtonRef.current &&
        !accessibilityButtonRef.current.contains(event.target)
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

  // פונקציה ייעודית לחזרה לראש הדף בלחיצה על הלוגו
  const handleLogoClick = () => {
    setIsMenuOpen(false);
    setIsLecturesSubOpen(false);
    setIsAccessibilityMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // פונקציית שינוי גודל טקסט
  const changeFontSize = (newLevel) => {
    setFontSizeLevel(newLevel);
    const html = document.documentElement;
    html.classList.remove("font-size-level-1", "font-size-level-2");
    if (newLevel === 1) html.classList.add("font-size-level-1");
    if (newLevel === 2) html.classList.add("font-size-level-2");
  };

  // פונקציית איפוס כוללת
  const handleResetAll = () => {
    handleResetAccessibility();
    const html = document.documentElement;
    html.classList.remove("font-size-level-1", "font-size-level-2");
    setIsAccessibilityMenuOpen(false);
  };

  const isAnyAccessibilityActive = 
    fontSizeLevel > 0 || grayscale || highContrast || highlightLinks || stopAnimations || readableFont;

    // ===== טיפול בסגירת מודאלים ותפריטים בלחיצה על מקש ESC =====
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        if (isAccessibilityMenuOpen) {
          setIsAccessibilityMenuOpen(false);
          accessibilityButtonRef.current?.focus(); // החזרת הפוקוס לכפתור הנגישות
        }
        if (IsMenuOpen) {
          setIsMenuOpen(false);
          setIsLecturesSubOpen(false);
          buttonRef.current?.focus(); // החזרת הפוקוס לכפתור התפריט הראשי
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isAccessibilityMenuOpen, IsMenuOpen]);

  return (
    <>
      <header className="bg-white border-b border-amber-100 fixed top-0 right-0 left-0 z-50 shadow-sm">  
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center relative">
          
          {/* צד ימין: כפתור תפריט וכותרת */}
          <div className="flex items-center gap-3">
            <button
              ref={buttonRef}
              className="p-2.5 border border-amber-200 bg-amber-50 rounded-xl text-amber-800 hover:bg-amber-100 transition-all shadow-sm cursor-pointer"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="תפריט"
            >
              <FaBars size={20} />
            </button>

            <div className="flex items-center gap-1.5 font-heebo text-xl sm:text-2xl md:text-3xl font-bold">
              <Link 
                to="/" 
                onClick={handleLogoClick}
                className="text-amber-950 hover:text-amber-800 transition-colors"
              >
                אור אביד
              </Link>

              <span className="text-amber-600 font-normal text-xl">|</span>

              <Link 
                to="/about-lectures" 
                onClick={handleLogoClick}
                className="text-amber-600 hover:text-amber-800 font-normal text-lg sm:text-xl transition-colors"
              >
                הרצאות מוזיקליות
              </Link>
            </div>
          </div>

          {/* צד שמאל: קישורים וכפתור נגישות */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6">
              <a
                href="https://wa.me/+972546738697"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-amber-900 font-medium hover:text-green-600 transition-colors"
              >
                <FaWhatsapp className="text-green-500 text-xl" />
                WhatsApp
              </a>

              <a
                href="mailto:avidor85@gmail.com"
                className="flex items-center gap-2 text-amber-900 font-medium hover:text-blue-600 transition-colors"
              >
                <FaEnvelope className="text-blue-500 text-xl" />
                דוא"ל
              </a>
            </div>

            {/* כפתור ותפריט נגישות */}
            <div className="relative">
              <button
                ref={accessibilityButtonRef}
                onClick={() => setIsAccessibilityMenuOpen((prev) => !prev)}
                aria-expanded={isAccessibilityMenuOpen}
                aria-label="תפריט נגישות"
                className={`flex items-center justify-center gap-2 p-2.5 md:px-3.5 md:py-2 rounded-full md:rounded-xl border text-sm font-medium transition-all shadow-sm cursor-pointer ${
                  isAnyAccessibilityActive
                    ? "bg-amber-900 text-white border-amber-900 ring-2 ring-amber-400"
                    : "bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100"
                }`}
              >
                <FaUniversalAccess className="text-xl md:text-lg" />
                <span className="hidden md:inline">נגישות</span>
              </button>

              {/* חלונית נגישות מעוגנת לפי הצד השמאלי החיצוני ונפתחת פנימה ימינה */}
              {isAccessibilityMenuOpen && (
                <div 
                  ref={accessibilityMenuRef}
                  className="absolute left-0 mt-2 w-72 max-w-[calc(100vw-2rem)] bg-white border border-amber-100 shadow-2xl rounded-3xl p-5 font-heebo text-amber-900 z-50 text-right animate-fade-in max-h-[80vh] overflow-y-auto"
                >
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
                    <button
                      onClick={() => {
                        const next = fontSizeLevel < 2 ? fontSizeLevel + 1 : 2;
                        changeFontSize(next);
                      }}
                      className="p-2.5 border border-amber-200 rounded-2xl text-xs font-bold bg-white text-amber-950 hover:bg-amber-50 transition-all cursor-pointer flex items-center justify-center gap-1"
                    >
                      הגדל טקסט A+
                    </button>

                    <button
                      onClick={() => {
                        const prev = fontSizeLevel > 0 ? fontSizeLevel - 1 : 0;
                        changeFontSize(prev);
                      }}
                      className="p-2.5 border border-amber-200 rounded-2xl text-xs font-bold bg-white text-amber-950 hover:bg-amber-50 transition-all cursor-pointer flex items-center justify-center gap-1"
                    >
                      הקטן טקסט A-
                    </button>

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
          </div>

        </div>

        {/* ===== תפריט הניווט הראשי הנפתח ===== */}
        <div className="max-w-5xl mx-auto px-4 relative">
          <div
            ref={menuRef}
            className={`absolute right-4 top-2 z-50 flex flex-col w-64 md:w-72 space-y-1 bg-white border border-amber-100 shadow-2xl rounded-2xl p-3 font-heebo text-base text-amber-900 transform origin-top transition-all duration-300 ease-in-out ${
              IsMenuOpen
                ? "scale-y-100 opacity-100"
                : "scale-y-0 opacity-0 pointer-events-none"
            }`}
          >
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full rounded-xl py-2 px-3 text-right hover:bg-amber-50 transition-colors"
            >
              ברוכים הבאים!
            </Link>

            <div className="border-t border-amber-100 my-1"></div>

            <Link
              to="/about-lectures"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full rounded-xl py-2 px-3 text-right hover:bg-amber-50 transition-colors"
            >
              מה זה הרצאה מוזיקלית?
            </Link>

            <div className="border-t border-amber-100 my-1"></div>

            <div>
              <button
                onClick={() => setIsLecturesSubOpen((prev) => !prev)}
                className="w-full flex items-center justify-between rounded-xl py-2 px-3 text-right hover:bg-amber-50 transition-colors text-amber-950 font-semibold cursor-pointer"
              >
                <span>פירוט ההרצאות</span>
                <FaChevronDown
                  size={12}
                  className={`transition-transform duration-200 text-amber-700 ${
                    isLecturesSubOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isLecturesSubOpen && (
                <div className="pr-4 mt-1 space-y-1 border-r-2 border-amber-200 mr-2">
                  {artistsData.map((artist) => (
                    <Link
                      key={artist.name}
                      to={`/lectures/${artist.slug}`}
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsLecturesSubOpen(false);
                      }}
                      className="block w-full rounded-xl py-1.5 px-3 text-right hover:bg-amber-50 transition-colors text-sm text-amber-800"
                    >
                      {artist.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-amber-100 my-1"></div>

            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full rounded-xl py-2 px-3 text-right hover:bg-amber-50 transition-colors"
            >
              עלי
            </Link>
          </div>
        </div>
      </header>

      <div className="pt-20"></div>
    </>
  );
}