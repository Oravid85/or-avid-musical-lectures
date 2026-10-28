import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { LecturePage } from '../components/LecturePage';
import { artistsData } from '../artistdata';

describe('LecturePage Component', () => {
    it('should render the correct Lecture data based on the slug', () => {
        const mockLecture = artistsData[0];

        render(
            <MemoryRouter initialEntries={[`/Lectures/${mockLecture.slug}`]}>
                <Routes>
                    <Route path="/Lectures/:slug" element={<LecturePage />} />
                </Routes>
            </MemoryRouter>
        );
//@ts-ignore
        expect(screen.getByRole('heading', { name: mockLecture.header })).toBeInTheDocument();

        const image = screen.getByAltText(mockLecture.header);
        //@ts-ignore
        expect(image).toBeInTheDocument();
        //@ts-ignore
        expect(image).toHaveAttribute('src', mockLecture.picture);
    });

    it('should redirect to /404 if the lecture slug does not exist', () => {
        render(
            <MemoryRouter initialEntries={['/Lectures/non-existing-slug']}>
                <Routes>
                    <Route path="/Lectures/:slug" element={<LecturePage />} />
                    <Route path="/404" element={<div>404 Page Not Found</div>} />
                </Routes>
            </MemoryRouter>
        );
//@ts-ignore
        expect(screen.getByText('404 Page Not Found')).toBeInTheDocument();
    });
});