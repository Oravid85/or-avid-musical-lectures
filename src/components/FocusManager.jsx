import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function FocusManager({ accessibilityActive }) {
  const { pathname } = useLocation();

  useEffect(() => {
    // מעביר פוקוס לכותרת הראשית רק אם מצב נגישות מופעל
    if (!accessibilityActive) return;

    const mainHeading = document.querySelector("h1");
    if (mainHeading) {
      mainHeading.setAttribute("tabIndex", "-1");
      mainHeading.focus();
    }
  }, [pathname, accessibilityActive]);

  return null;
}