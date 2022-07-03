/* eslint-disable @typescript-eslint/no-explicit-any */
import { isChrome } from 'react-device-detect';

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

const preventDefault = (e: any): void => {
    e.preventDefault();
};

const preventDefaultForScrollKeys = (e: any): boolean => {
    const keyCode = Number(e.keyCode);
    if (keyCode === 37 || keyCode === 38 || keyCode === 39 || keyCode === 40) {
        preventDefault(e);
        return false;
    }

    return true;
};


const wheelOpt = isChrome ? { passive: false } : false;
const wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

export const disableScroll = (): void => {
    document.addEventListener('DOMMouseScroll', preventDefault, false);
    document.addEventListener(wheelEvent, preventDefault, wheelOpt);
    document.addEventListener('touchmove', preventDefault, wheelOpt);
    document.addEventListener('keydown', preventDefaultForScrollKeys, false);
};

export const enableScroll = (): void => {
    document.removeEventListener('DOMMouseScroll', preventDefault, false);
    document.removeEventListener(wheelEvent, preventDefault);
    document.removeEventListener('touchmove', preventDefault);
    document.removeEventListener('keydown', preventDefaultForScrollKeys, false);
};