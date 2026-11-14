import { useState } from "react";

export default function RecomCar({
  items = [],
  mainview,
  lectureData = {},
  aboutMe = {},
}) {
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide(slide === items.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? items.length - 1 : slide - 1);
  };

  return (
    <div className="w-full flex justify-center my-4 md:my-0 h-full" dir="ltr">
      {/* הקונטיינר הראשי - מאפשר גובה דינמי עם מרווח תחתון מבוקר לכפתורים */}
      <div className="flex flex-col relative w-full max-w-xl mx-4 overflow-hidden rounded-3xl shadow-md border border-amber-200/60 bg-gradient-to-b from-amber-50/70 to-amber-100/40 pt-4 pb-20">
        
        {/* פס הסליידים שזז */}
        <div
          className="flex transition-transform duration-500 ease-in-out items-center"
          style={{ transform: `translateX(-${slide * 100}%)` }}
        >
          {items.map((item, index) => (
            /* מעטפת שקופה לכל סלייד - תמיד 100% מהרוחב */
            <div
              key={index}
              className="w-full flex-shrink-0 flex justify-center px-4"
            >
              {/* הכרטיסייה הפנימית - גובה מינימלי במקום גובה קבוע, כדי שתוכל להיפתח לפי הטקסט */}
              <div
                className="w-full flex flex-col justify-between bg-white min-h-[280px] rounded-2xl shadow-sm border border-amber-100 p-6 sm:p-8 relative"
                dir="rtl"
              >
                {/* אייקון מרכאות קטן ואסתטי למעלה */}
                <span className="text-4xl text-amber-300 font-serif leading-none absolute top-3 right-5 select-none opacity-60">
                  “
                </span>

                {/* אזור הטקסט - מרווח פנימי שמונע חסימה */}
                <div className="my-auto py-4 px-2">
                  <p className="text-lg md:text-xl text-center font-medium text-amber-950 leading-relaxed">
                    {item.text}
                  </p>
                </div>

                {item.author && (
                  <p className="w-full text-sm sm:text-base flex justify-end text-amber-800/80 font-medium italic border-t border-amber-50 pt-2 mt-2">
                    — {item.author}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ניווט ומספור (ממוקם מחוץ לכרטיסייה עם מרווח בטוח) */}
        <div
          className="absolute bottom-4 left-0 right-0 flex justify-center items-center px-6 sm:px-8 z-20"
          dir="rtl"
        >
          <div className="w-full flex justify-between items-center bg-amber-50/90 backdrop-blur-xs p-2 rounded-2xl border border-amber-200/50">
            <button
              onClick={prevSlide}
              className="inline-flex items-center justify-center px-4 py-2 border-2 border-amber-600 bg-white hover:bg-amber-50 text-amber-900 font-semibold rounded-xl shadow-xs transition-all duration-300 active:scale-95 text-xs sm:text-sm cursor-pointer"
            >
              → קודם
            </button>

            <div className="flex items-center justify-center font-bold text-amber-900 bg-white border border-amber-200/70 px-3 py-1 rounded-full shadow-xs text-xs sm:text-sm">
              <span>{slide + 1}</span>
              <span className="mx-1 text-amber-400">/</span>
              <span>{items.length}</span>
            </div>

            <button
              onClick={nextSlide}
              className="inline-flex items-center justify-center px-4 py-2 border-2 border-amber-600 bg-white hover:bg-amber-50 text-amber-900 font-semibold rounded-xl shadow-xs transition-all duration-300 active:scale-95 text-xs sm:text-sm cursor-pointer"
            >
              הבא ←
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}