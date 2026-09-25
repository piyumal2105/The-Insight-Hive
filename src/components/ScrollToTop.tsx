// src/components/ScrollToTop.tsx
import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router';

export default function ScrollToTop() {
    const { pathname } = useLocation();
    const navigationType = useNavigationType();

    useEffect(() => {
        // Don't fight the browser on back/forward navigation
        if (navigationType !== 'POP') {
            window.scrollTo(0, 0);
        }
    }, [pathname, navigationType]);

    return null;
}