/* eslint-disable @typescript-eslint/no-explicit-any */

const pow = Math.pow;

export const isDescendant = function (parent: HTMLElement, child: HTMLElement): boolean {
    if (child === parent) return true;
    let node = child.parentNode;
    while (node) {
        if (node === parent) return true;
        node = node.parentNode;
    }

    return false;
};

const easeOutQuart = (x: number): number => {
    return 1 - pow(1 - x, 4);
};

export const animateScroll = ({ targetPosition, initialPosition, duration }: { targetPosition: number, initialPosition: number, duration: number }): void => {
    let start: number;
    let position: number;
    let animationFrame: number;

    const requestAnimationFrame = window.requestAnimationFrame;
    const cancelAnimationFrame = window.cancelAnimationFrame;

    const maxAvailableScroll =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const amountOfPixelsToScroll = initialPosition - targetPosition;

    const step = (timestamp: number): void => {
        if (start === undefined) {
            start = timestamp;
        }

        const elapsed = timestamp - start;
        const relativeProgress = elapsed / duration;
        const easedProgress = easeOutQuart(relativeProgress);
        position = initialPosition - amountOfPixelsToScroll * Math.min(easedProgress, 1);
        window.scrollTo(0, position);
        if (
            initialPosition !== maxAvailableScroll &&
            window.scrollY === maxAvailableScroll
        ) {
            cancelAnimationFrame(animationFrame);
            return;
        }
        if (elapsed < duration) {
            animationFrame = requestAnimationFrame(step);
        }

    };

    animationFrame = requestAnimationFrame(step);
};

export const disableScroll = (): void => {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
};

export const enableScroll = (): void => {
    document.getElementsByTagName('body')[0].style.overflow = 'auto';    
};