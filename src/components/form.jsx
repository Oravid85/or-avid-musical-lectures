import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ContactForm({ lectureData, aboutMe, mainview }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telNum, setTelNum] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setIsSubmitting(true);
    setIsVisible(false);

    try {
      const response = await fetch("https://formspree.io/f/mdkwylbb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email: email,
          message: `טלפון: ${telNum}`,
          replyto: email,
        }),
      });

      if (response.ok) {
        const scriptUrl = "https://script.google.com/macros/s/AKfycbyj20kN480ADPUbLOpbV4MCFvq-Bcnf8AUIsfXpjI5JHXroClcI-glYIAqfvcbDwQ/exec"; 
        
        await fetch(scriptUrl, {
          method: "POST",
          body: new URLSearchParams({
            name: name,
            email: email,
            phone: telNum,
            type: "פניה מהאתר"
          })
        });

        // מנקה את השדות ומציג את ההודעה עם פתיחה הדרגתית של הקונטיינר
        setName("");
        setEmail("");
        setTelNum("");
        setIsVisible(true);

        // אחרי 4 שניות סוגרים את התיבה והקונטיינר מצטמצם בחזרה ברכות
        setTimeout(() => {
          setIsVisible(false);
        }, 4000);

      } else {
        navigate("/404");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      navigate("/404");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex justify-center h-full">
      <form
        onSubmit={handleSubmit}
        className="justify-center h-full flex flex-col items-center space-y-4 w-[90%] max-w-sm bg-gradient-to-b from-amber-50/70 to-amber-100/40 border border-amber-200/60 px-6 py-8 rounded-3xl shadow-md md:mr-auto md:w-[400px]"
      >
        <h2 className="text-center text-xl font-noto font-bold text-amber-900 mb-2 leading-relaxed">
          השאירו פרטים ואחזור אליכם בהקדם!
        </h2>

        {/* קונטיינר עוטף שמתרחב ומתכווץ בהדרגה (אקורדיון חלק) */}
        <div 
          className={`w-full overflow-hidden transition-all duration-700 ease-in-out ${
            isVisible ? "max-h-24 opacity-100 mb-2" : "max-h-0 opacity-0 mb-0"
          }`}
        >
          <div className="w-full bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-2xl text-center text-sm font-medium">
            הפרטים נשלחו בהצלחה! אצור קשר בהקדם.
          </div>
        </div>

        <input
          type="text"
          placeholder="שם מלא"
          aria-label="שם מלא"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
          className="w-full bg-white border border-amber-200/80 focus:border-amber-600 focus:outline-none p-3 rounded-2xl text-center shadow-xs text-gray-800 placeholder-gray-400 transition-all"
          required
          disabled={isSubmitting}
        />
        <input
          type="email"
          placeholder='דוא"ל'
          aria-label="כתובת דואר אלקטרוני"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          className="w-full bg-white border border-amber-200/80 focus:border-amber-600 focus:outline-none p-3 rounded-2xl text-center shadow-xs text-gray-800 placeholder-gray-400 transition-all"
          required
          disabled={isSubmitting}
        />
        <input
          type="tel"
          placeholder="מספר טלפון"
          aria-label="מספר טלפון"
          value={telNum}
          onChange={(ev) => setTelNum(ev.target.value)}
          className="w-full bg-white border border-amber-200/80 focus:border-amber-600 focus:outline-none p-3 rounded-2xl text-center shadow-xs text-gray-800 placeholder-gray-400 transition-all"
          disabled={isSubmitting}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className={`inline-flex items-center justify-center px-8 py-2.5 mt-2 border-2 border-amber-600 bg-white text-amber-900 font-semibold rounded-2xl shadow-sm transition-all duration-300 self-center text-base ${
            isSubmitting 
              ? "opacity-50 cursor-not-allowed" 
              : "hover:bg-amber-50 active:scale-95"
          }`}
        >
          {isSubmitting ? "שולח..." : "שלח"}
        </button>
      </form>
    </div>
  );
}