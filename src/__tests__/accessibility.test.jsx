import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { describe, test, expect, vi } from 'vitest';
import { Header } from '../components/Header'; // יש להתאים את הנתיב לקובץ ה-Header שלך

// מוק (Mock) למצב הנגישות ופונקציות ה-State שלה עבור Vitest
const createMockAccessibility = (overrides = {}) => ({
  fontSizeLevel: 0,
  setFontSizeLevel: vi.fn(),
  grayscale: false,
  setGrayscale: vi.fn(),
  highContrast: false,
  setHighContrast: vi.fn(),
  highlightLinks: false,
  setHighlightLinks: vi.fn(),
  stopAnimations: false,
  setStopAnimations: vi.fn(),
  readableFont: false,
  setReadableFont: vi.fn(),
  handleResetAccessibility: vi.fn(),
  ...overrides,
});

describe('Accessibility Widget & Standard Tests (בדיקות עמידה בתקני נגישות)', () => {
  
  test('1. פתיחת תפריט הנגישות וודוא שכל כפתורי הפונקציות קיימים ונגישים', () => {
    const mockAccess = createMockAccessibility();
    render(
      <BrowserRouter>
        <Header accessibility={mockAccess} />
      </BrowserRouter>
    );

    // לחיצה על כפתור הנגישות הראשי בהדר
    const accessButton = screen.getByRole('button', { name: /תפריט נגישות/i });
    fireEvent.click(accessButton);

    // בדיקה שחלונית הנגישות נפתחת וכל הכפתורים קיימים ותקינים
   expect(screen.getByRole('heading', { name: 'נגישות' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /הגדל טקסט a\+/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /הקטן טקסט a\-/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ניגודיות גבוהה/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /גווני אפור/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /הדגש קישורים/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /גופן קריא/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /עצירת אנימציות/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /איפוס הגדרות נגישות/i })).toBeInTheDocument();
  });

  test('2. בדיקת תקינות פעולות הנגישות (הפעלת מצבים ושינוי State)', () => {
    const setHighContrast = vi.fn();
    const setGrayscale = vi.fn();
    const setFontSizeLevel = vi.fn();
    
    const mockAccess = createMockAccessibility({
      setHighContrast,
      setGrayscale,
      setFontSizeLevel,
    });

    render(
      <BrowserRouter>
        <Header accessibility={mockAccess} />
      </BrowserRouter>
    );

    // פתיחת חלונית הנגישות
    fireEvent.click(screen.getByRole('button', { name: /תפריט נגישות/i }));

    // בדיקת לחיצה על ניגודיות גבוהה
    fireEvent.click(screen.getByRole('button', { name: /ניגודיות גבוהה/i }));
    expect(setHighContrast).toHaveBeenCalled();

    // בדיקת לחיצה על גווני אפור
    fireEvent.click(screen.getByRole('button', { name: /גווני אפור/i }));
    expect(setGrayscale).toHaveBeenCalled();

    // בדיקת הגדלת טקסט
    fireEvent.click(screen.getByRole('button', { name: /הגדל טקסט a\+/i }));
    expect(setFontSizeLevel).toHaveBeenCalled();
  });

  test('3. בדיקת תקינות התנהגות המקלדת (Keyboard Navigation & ARIA)', () => {
    const mockAccess = createMockAccessibility();
    render(
      <BrowserRouter>
        <Header accessibility={mockAccess} />
      </BrowserRouter>
    );

    const accessButton = screen.getByRole('button', { name: /תפריט נגישות/i });
    
    // וידוא שהכפתור תומך בתווית נגישות תקנית (ARIA)
    expect(accessButton).toHaveAttribute('aria-label', 'תפריט נגישות');
    expect(accessButton).toHaveAttribute('aria-expanded', 'false');

    // פתיחה ובדיקת עדכון ה-ARIA
    fireEvent.click(accessButton);
    expect(accessButton).toHaveAttribute('aria-expanded', 'true');
  });

  test('4. בדיקת איפוס הגדרות נגישות (Reset Standard Compliance)', () => {
    const handleResetAccessibility = vi.fn();
    const mockAccess = createMockAccessibility({
      fontSizeLevel: 2,
      highContrast: true,
      handleResetAccessibility,
    });

    render(
      <BrowserRouter>
        <Header accessibility={mockAccess} />
      </BrowserRouter>
    );

    // פתיחת חלונית הנגישות ולחיצה על איפוס
    fireEvent.click(screen.getByRole('button', { name: /תפריט נגישות/i }));
    fireEvent.click(screen.getByRole('button', { name: /איפוס הגדרות נגישות/i }));

    expect(handleResetAccessibility).toHaveBeenCalled();
  });
});