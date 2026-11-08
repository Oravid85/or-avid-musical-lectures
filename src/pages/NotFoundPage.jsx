import { useNavigate } from "react-router-dom";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4 text-center">
      <h1 className="text-9xl font-extrabold text-red-600 mb-6">404</h1>

      <h2 className="text-3xl font-semibold mb-6">אופס... משהו השתבש!</h2>

      <button
        onClick={() => navigate("/")}
        className="px-5 py-2 border-2 border-amber-700 bg-amber-600 rounded-sm shadow hover:bg-amber-700 font-heebo text-base text-white hover:scale-105 hover:font-bold transition-all duration-200 mb-6"
      >
        חזרה לדף הראשי
      </button>

      <h3 className="text-xl font-medium mb-4 flex flex-col md:flex-row items-center justify-center gap-6">
        אפשר גם לפנות אלי ב
        <a
          href="https://wa.me/+972546738697"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-2xl text-amber-900 hover:text-green-700 hover:font-bold transition-colors"
        >
          <FaWhatsapp className="text-green-500 mr-2 text-3xl" />
          Whatsapp
        </a>
        או ב
        <a
          href="mailto:avidor85@gmail.com"
          className="inline-flex items-center text-2xl text-amber-900 hover:text-blue-700 hover:font-bold transition-colors"
        >
          <FaEnvelope className="text-blue-500 mr-2 text-3xl" />
          מייל
        </a>
      </h3>
    </div>
  );
}
