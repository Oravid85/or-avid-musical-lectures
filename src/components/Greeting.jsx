import { Link } from "react-router-dom";

import { artistsData } from "../artistdata";

// הנתיבים הנכונים מתוך התיקייה של הקומפוננטה
import or_06 from "../assets/lecturesPictures/or_06.jpg"; // לדסקטופ
import or_04 from "../assets/lecturesPictures/or_04.jpg"; // למובייל

export function Greeting() {
  
  return (
    /* במובייל: px-2 למקסימום רוחב | במחשב (md): px-12 המקורי */
    <div className="bg-amber-50/50 min-h-screen px-2 md:px-12 py-8 max-w-6xl mx-auto">
      <div>
        <h1 className="flex font-semibold text-3xl mt-6 mb-2 font-assistant text-amber-900">
          ברוכים הבאים!
        </h1>

        <h2 className="text-right font-bold text-2xl m-4 font-noto text-amber-700">
          על האתר
        </h2>

        <p className="text-justify leading-relaxed whitespace-pre-wrap m-4 mb-6 font-alef text-lg text-gray-800">
  אם אתם מחפשים הרצאות מעניינות על מוזיקה ישראלית, אומנים ישראלים, קצת על
  השירה העברית ועל אנשי רוח שעיצבו את תרבותנו, הגעתם למקום הנכון:
  <br />
  שמי אור, ואני מדריך, נגן, ומרצה, ואשמח לפגוש אתכם לשעה-שעתיים, לדבר,
  להראות ולנגן את המוזיקה של האנשים שהשפיעו על כולנו.
  <br /><br />
  <span className="font-semibold text-amber-900">מעוניינים להבין יותר מה הן הרצאות מוזיקליות?</span>{' '}
  <Link 
    to="/about-lectures"
    className="text-amber-700 hover:text-amber-800 underline font-semibold transition-colors"
  >
    לחצו כאן
  </Link>
</p>

        {/* באנר תמונה רוחבי עדין ומזמין - שימוש בתגית <picture> */}
<div className="w-full h-72 md:h-96 my-6 overflow-hidden rounded-2xl shadow-sm border border-amber-200 bg-amber-100">
  <picture className="w-full h-full block">
    <source media="(min-width: 768px)" srcSet={or_06} />
    <img
      src={or_04}
      alt="אור אביד בהרצאה מוזיקלית"
      className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
    />
  </picture>
</div>

        <h2 className="text-right font-bold text-2xl m-4 font-noto text-amber-700">
          הרצאות
        </h2>

        {/* במובייל: gap-5 ללא שוליים חיצוניים | במחשב (md): gap-8 m-4 המקורי */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 mx-0 md:m-4">
          {artistsData.map((lecture) => (
            <Link
              key={lecture.name}
              to={`/lectures/${lecture.slug}`}
              /* במובייל: p-4 לניצול מקום | במחשב (md): p-6 המקורי */
              className="group bg-white border-2 border-amber-200 rounded-2xl shadow-sm hover:shadow-xl p-4 md:p-6 cursor-pointer transition-all duration-300 flex flex-col justify-between"
              onClick={() => {
                
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              <div className="flex flex-col items-center">
                <h3 className="text-right font-bold text-xl mb-1 md:mb-3 font-noto text-amber-800 group-hover:text-amber-950 transition-colors w-full line-clamp-1">
                  {lecture.name}
                </h3>
                
                <p className="text-base italic font-semibold font-noto text-amber-800 group-hover:text-amber-950 transition-colors line-clamp-2 mt-0.5 md:mt-1 mb-3 md:mb-0 w-full">
                  {lecture.header}
                </p>

                {/* מעטפת התמונה:
                    במובייל: h-auto ללא הגבלת גובה - התמונה תפוס את מלוא הרוחב ותשמור על הפרופורציות שלה ללא חיתוך!
                    במחשב (md): h-40 ו-object-contain כפי שהיה בגרסה המקורית */}
     <div className="w-full h-auto md:h-48 mb-4 overflow-hidden rounded-xl bg-amber-50 flex items-center justify-center">
  <img
    className="w-full h-auto md:h-full object-cover md:object-contain object-center transition-transform duration-500 group-hover:scale-105"
    src={lecture.picture}
    alt={lecture.name}
  />
</div>

                <p className="text-justify leading-relaxed font-alef text-base text-gray-800 mb-6 w-full line-clamp-6">
                  {lecture.onlecture}
                </p>
              </div>

              <div className="w-full text-right mt-auto">
                <span className="text-amber-700 font-semibold text-sm inline-block">
                  לפרטים נוספים ←
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}