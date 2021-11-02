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

export function useEventListener(eventName, handler, element) {
    // Create a ref that stores handler
    const savedHandler = useRef()

    useEffect(() => {
        // Define the listening target
        const targetElement = element?.current || window
        if (!(targetElement && targetElement.addEventListener)) {
            return
        }

        // Update saved handler if necessary
        if (savedHandler.current !== handler) {
            savedHandler.current = handler
        }

        // Create event listener that calls handler function stored in ref
        const eventListener = (event) => {
            // eslint-disable-next-line no-extra-boolean-cast
            if (!!savedHandler?.current) {
                savedHandler.current(event)
            }
        }

        targetElement.addEventListener(eventName, eventListener)

        // Remove event listener on cleanup
        return () => {
            targetElement.removeEventListener(eventName, eventListener)
        }
    }, [eventName, element, handler])
}

export const useElementSize = (elementRef = null) => {
    const [size, setSize] = useState({
        width: 0,
        height: 0,
    })

    // Prevent too many rendering using useCallback
    const updateSize = useCallback(() => {
        const node = elementRef?.current
        if (node) {
            setSize({
                width: node.offsetWidth || 0,
                height: node.offsetHeight || 0,
            })
        }
    }, [elementRef])

    // Initial size on mount
    useLayoutEffect(() => {
        updateSize()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEventListener('resize', updateSize)

    return size
}