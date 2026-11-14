import { useState, useEffect } from "react";
import ReactGA from "react-ga4";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import { TestPage } from "./pages/TestPage";

import { LecturePage } from "./components/LecturePage";
import { AboutMe } from "./components/AboutMe.jsx";
import { MusicalLecturesInfo } from "./components/MusicalLecturesInfo.jsx";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Greeting } from "./components/Greeting.jsx";
import { BuisnessSection } from "./components/BuisnessSection.jsx";

import { artistsData } from "./artistdata";
import { aboutMe } from "./oravid.js";
import { lecturesCom } from "./lecturesrecom.js";

import ContactForm from "./components/form.jsx";
import FontClass from "./components/FontClass";
import RecomCar from "./components/RecomCar";
import "./App.css";
import MyEmojies from "./components/Emojies";
import ScrollToTop from "./components/ScrollToTop.jsx";
import FloatingWhatsApp from "./components/FloatingWhatsApp.jsx";
import { TermsModal } from "./components/TermsModal.jsx"; 
import { FocusManager } from "./components/FocusManager.jsx";

export function App() {
  const location = useLocation();
  const [isTermsOpen, setIsTermsOpen] = useState(false); 

  // סטייטים נפרדים לכל אפשרות נגישות
  const [fontSizeLevel, setFontSizeLevel] = useState(0); // 0 = רגיל, 1 = הגדלה קלה, 2 = הגדלה משמעותית
  const [grayscale, setGrayscale] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);
  const [stopAnimations, setStopAnimations] = useState(false);
  const [readableFont, setReadableFont] = useState(false);

  // פונקציית איפוס כללית לכל הגדרות הנגישות
  const handleResetAccessibility = () => {
    setFontSizeLevel(0);
    setGrayscale(false);
    setHighContrast(false);
    setHighlightLinks(false);
    setStopAnimations(false);
    setReadableFont(false);
  };

  // בניית מחלקות ה-CSS הדינמיות עבור ה-div הראשי
  const accessibilityClasses = [
    grayscale ? "grayscale-mode" : "",
    highContrast ? "high-contrast-mode" : "",
    highlightLinks ? "highlight-links-mode" : "",
    stopAnimations ? "stop-animations-mode" : "",
    readableFont ? "readable-font-mode" : "",
    fontSizeLevel === 1 ? "text-lg" : "",
    fontSizeLevel === 2 ? "text-xl" : "",
  ].filter(Boolean).join(" ");
 
  ReactGA.initialize("G-FER5E4CS2S");

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);

useEffect(() => {
    const htmlElement = document.documentElement;
    htmlElement.classList.remove("font-size-level-1", "font-size-level-2");
    if (fontSizeLevel === 1) htmlElement.classList.add("font-size-level-1");
    if (fontSizeLevel === 2) htmlElement.classList.add("font-size-level-2");
  }, [fontSizeLevel]);

  return (
    <>
      <div className={`min-h-screen flex flex-col ${accessibilityClasses}`}>
        <FocusManager />
        <ScrollToTop />
        <Header 
          artistsData={artistsData} 
          aboutMe={aboutMe}
          accessibility={{
            fontSizeLevel, setFontSizeLevel,
            grayscale, setGrayscale,
            highContrast, setHighContrast,
            highlightLinks, setHighlightLinks,
            stopAnimations, setStopAnimations,
            readableFont, setReadableFont,
            handleResetAccessibility
          }}
        />
        
        <main id="main-content" key={location.pathname} className="animate-fade-in">
          <Routes>
            {/* דף הבית */}
            <Route path="/" element={<Greeting />} />

            {/* דף About Me */}
            <Route path="/about" element={<AboutMe aboutMe={aboutMe} />} />

            {/* דף הרצאות מוזיקליות */}
            <Route path="/about-lectures" element={<MusicalLecturesInfo />} />

            {/* דף הרצאה */}
            <Route path="/lectures/:slug" element={<LecturePage />} />

            {/* דף Not Found */}
            <Route path="/404" element={<NotFoundPage />} />

            {/* דף Test */}
            <Route path="/test" element={<TestPage />} />

            {/* כל כתובת אחרת מפנה ל-404 */}
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </main>

        <BuisnessSection
          artistsData={artistsData}
          aboutMe={aboutMe}
          lecturesCom={lecturesCom}
        />
        <Footer 
          onOpenTerms={() => setIsTermsOpen(true)} 
        />
  
        <TermsModal 
          isOpen={isTermsOpen} 
          onClose={() => setIsTermsOpen(false)} 
        />
      </div>
    </>
  );
}