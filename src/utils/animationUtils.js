/**
 * Animation utility functions
 */

/**
 * Trigger pulse animation on an element
 * @param {string} elementId - ID of element to animate
 */
export function triggerPulse(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;

    element.classList.remove('pulse');
    // Force reflow to restart animation
    void element.offsetWidth;
    element.classList.add('pulse');
}
