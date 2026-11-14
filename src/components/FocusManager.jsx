import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function FocusManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    // מחפש את הכותרת הראשית ומעביר אליו פוקוס במעבר עמוד
    const mainHeading = document.querySelector("h1");
    if (mainHeading) {
      mainHeading.setAttribute("tabIndex", "-1");
      mainHeading.focus();
    }
  }, [pathname]);

  return null;
}