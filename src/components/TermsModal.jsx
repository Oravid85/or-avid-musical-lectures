import { legalData } from "../legalData.js";

export function TermsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-xl text-right relative flex flex-col max-h-[85vh]">
        
        {/* כותרת המודאל */}
        <h2 className="text-xl font-bold text-amber-950 mb-4 border-b border-amber-100 pb-3">
          תנאים, פרטיות ונגישות
        </h2>

        {/* תוכן המודאל מופרד ומסודר */}
        <div className="overflow-y-auto space-y-6 text-sm text-amber-950/80 leading-relaxed pl-2">
          
          {/* דיסקליימר */}
          <div className="space-y-2">
            <h3 className="font-bold text-amber-950 text-base">דיסקליימר אמנים</h3>
            <p>{legalData.artistDisclaimer}</p>
          </div>

          <hr className="border-amber-100" />

          {/* פרטיות */}
          <div className="space-y-2">
            <h3 className="font-bold text-amber-950 text-base">פרטיות</h3>
            <p>{legalData.privacy}</p>
          </div>

          <hr className="border-amber-100" />

          {/* נגישות */}
          <div className="space-y-2 bg-amber-50/50 p-4 rounded-xl border border-amber-100/60">
            <h3 className="font-bold text-amber-950 text-base flex items-center gap-2">
              <span>♿</span> נגישות האתר
            </h3>
            <p>{legalData.accessibility}</p>
          </div>

          <hr className="border-amber-100" />

          {/* קופירייט */}
          <div className="space-y-1">
            <h3 className="font-bold text-amber-950 text-base">זכויות יוצרים</h3>
            <p>{legalData.copyrightText}</p>
          </div>

        </div>

        {/* כפתור סגירה */}
        <div className="mt-6 pt-4 border-t border-amber-100 flex justify-end">
          <button
            onClick={onClose}
            className="bg-amber-900 text-white px-5 py-2 rounded-lg text-sm hover:bg-amber-800 transition-colors cursor-pointer"
          >
            סגור
          </button>
        </div>

      </div>
    </div>
  );
}