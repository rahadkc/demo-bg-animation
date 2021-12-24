import { useLayoutEffect } from 'react';

export default function useLockBodyScroll(openmenu) {
    useLayoutEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        if (openmenu === "active") {

            // Prevent scrolling on mount
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        // Get original value of body overflow

        // Re-enable scrolling when component unmounts
        return () => document.body.style.overflow = originalStyle;
    }, [openmenu]); // Empty array ensures effect is only run on mount and unmount
}
