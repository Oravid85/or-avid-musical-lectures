import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

export function Footer({ onOpenTerms }) {
  return (
    <footer className="bg-white border-t border-amber-100 py-8 px-6 md:px-12 mt-auto">
      <div className="max-w-5xl mx-auto flex flex-col items-center md:items-start text-right">
        
        {/* כותרת קטנה ועדינה */}
        <h3 className="font-medium mb-3 text-lg tracking-wide text-amber-950/80">
          לפרטים נוספים
        </h3>

        {/* קישורים */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start mb-6">
          <a
            href="https://wa.me/+972546738697"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base flex items-center gap-2 text-amber-900 hover:text-green-600 transition-colors"
          >
            <FaWhatsapp className="text-green-500 text-lg" />
            פנו אלי ב־ WhatsApp
          </a>

          <a
            href="mailto:avidor85@gmail.com"
            className="text-base flex items-center gap-2 text-amber-900 hover:text-blue-600 transition-colors"
          >
            <FaEnvelope className="text-blue-500 text-lg" />
            אפשר גם בדוא"ל
          </a>
        </div>

        {/* שורה תחתונה: זכויות יוצרים ומתחתיה הקישור לתנאים (סידור אנכי) */}
        <div className="w-full border-t border-amber-100/80 pt-4 flex flex-col gap-2 text-xs text-amber-900/60">
          <p>© כל הזכויות שמורות לאור אביד.</p>
          
          <div>
            <button 
              onClick={onOpenTerms}
              className="underline hover:text-amber-900 transition-colors cursor-pointer"
            >
              תנאים, פרטיות ונגישות
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}