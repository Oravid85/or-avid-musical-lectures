import { useState, useEffect } from "react";
import { musicalLecturesInfoData } from "../musicalLecturesData";

export function MusicalLecturesInfo() {
  const { header, paragraphs, photos, videosSectionHeader, videos } = musicalLecturesInfoData;

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // החלפה אוטומטית של תמונות כל 3 שניות
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [photos.length]);
  
  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  return (
    <div className="bg-amber-50/50 min-h-screen px-4 md:px-12 py-8 max-w-6xl mx-auto">
      {/* כותרת ראשית */}
      <h1 className="flex font-semibold text-3xl md:text-4xl mt-6 mb-8 font-assistant text-amber-900">
        {header}
      </h1>

      {/* חלק עליון: טקסט זורם ומימין קרוסלת תמונות */}
      <div className="flex flex-col md:flex-row-reverse items-center md:items-start gap-8 md:gap-12 mb-16">
        
        {/* קרוסלת התמונות (איך נראית הרצאה) */}
        <div className="w-full md:w-[450px] flex-shrink-0 flex flex-col items-center">
          <H2 className="font-bold text-xl mb-3 font-noto text-amber-800 text-center">
            איך נראית הרצאה
          </H2>
          
          <div className="relative w-full h-[320px] md:h-[360px] rounded-3xl overflow-hidden shadow-md border border-amber-200/60 bg-white group">
            <img
              src={photos[currentPhotoIndex].src}
              alt={photos[currentPhotoIndex].alt}
              className="w-full h-full object-cover transition-all duration-700"
            />
            
          {/* כפתור שמאלי (הבא) - צבעי התמונה: רקע אמבר בהיר, חץ חום כהה */}
            <button
              onClick={nextPhoto}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-amber-100/90 hover:bg-amber-100 text-amber-900 font-bold w-9 h-9 rounded-full flex items-center justify-center transition-colors shadow-sm opacity-90 group-hover:opacity-100"
              aria-label="תמונה הבאה"
            >
              ❯
            </button>

            {/* כפתור ימני (קודם) - צבעי התמונה: רקע אמבר בהיר, חץ חום כהה */}
            <button
              onClick={prevPhoto}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-amber-100/90 hover:bg-amber-100 text-amber-900 font-bold w-9 h-9 rounded-full flex items-center justify-center transition-colors shadow-sm opacity-90 group-hover:opacity-100"
              aria-label="תמונה קודמת"
            >
              ❮
            </button>

            {/* פג'ינציה בהתאם לערכה: נקודות לבנות/בהירות, והאינדיקטור הנבחר בחום כהה */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
              {photos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPhotoIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentPhotoIndex ? "bg-amber-900 w-4" : "bg-amber-100/80 w-2"
                  }`}
                  aria-label={`עבור לתמונה ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* טקסט זורם ונקי */}
        <div className="flex flex-col text-right w-full">
          {paragraphs.map((text, idx) => (
            <p key={idx} className="text-justify leading-relaxed whitespace-pre-wrap font-alef text-lg md:text-xl text-gray-800 mb-6 last:mb-0">
              {text}
            </p>
          ))}
        </div>
      </div>

      {/* חלק תחתון: איך נשמעת הרצאה (קרוסלת סרטונים) */}
      <div className="mt-12 border-t border-amber-200/80 pt-10">
        <h2 className="font-bold text-2xl md:text-3xl mb-8 font-noto text-amber-800 text-center">
          {videosSectionHeader}
        </h2>

        <div className="max-w-2xl mx-auto bg-white p-4 md:p-6 rounded-3xl border border-amber-200 shadow-sm relative">
          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black/5 mb-4">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videos[currentVideoIndex].id}`}
              title={videos[currentVideoIndex].title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="flex justify-between items-center px-2">
            <button
              onClick={prevVideo}
              className="bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold px-4 py-2 rounded-xl transition-colors font-noto text-sm"
            >
              → קודם
            </button>
            
          {/* פג'ינציה סטנדרטית עם נקודות בערכת צבעי האתר */}
  <div className="flex items-center gap-1.5 mx-2">
    {videos.map((_, index) => (
      <button
        key={index}
        onClick={() => goToVideo(index)} // ודא ששם הפונקציה שלך למעבר ישיר הוא כזה, או שנה בהתאם (למשל setCurrentVideoIndex)
        aria-label={`עבור לסרטון ${index + 1}`}
        className={`h-2.5 rounded-full transition-all duration-300 ${
          currentVideoIndex === index
            ? "w-6 bg-amber-700"     // נקודה פעילה: פס רחב בצבע ענבר כהה
            : "w-2.5 bg-amber-200 hover:bg-amber-300" // נקודות לא פעילות: עיגולים קטנים
        }`}
      />
    ))}
  </div>

            <button
              onClick={nextVideo}
              className="bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold px-4 py-2 rounded-xl transition-colors font-noto text-sm"
            >
              הבא ←
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}