import {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';

export function useDebounce(callback, delay) {
    const timer = useRef();

    const debounceCallback = useCallback((...args) => {
        if(timer.current) {
            clearTimeout(timer.current)
        }
        timer.current = setTimeout(() => {
            callback(...args)
        }, delay);
    },[callback, delay]);

    return debounceCallback;
};

export const useScrollElementOnScreen = (options, cb) => {
    const containerRef = useRef(null);
    const [isVisible, setVisible] = useState(false);

    const callbackFunction = (entries) => {
        const [ entry ] = entries;
        setVisible(entry.isIntersecting)
        if(cb) cb(entry);
    }

    useEffect(() => {
        const ref = containerRef.current;
        const observer = new IntersectionObserver(callbackFunction, options)
        if(ref) observer.observe(ref)

        return () => {
            if(ref) observer.unobserve(ref)
        }
    }, [containerRef, options]) //eslint-disable-line

    return [containerRef, isVisible]
}

export const useWindowSize = () => {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}