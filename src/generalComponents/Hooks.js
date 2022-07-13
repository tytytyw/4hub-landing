import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { CHAT_CALLROOM, LOCAL_CLIENT, MODALS, TYPES } from "./globalVariables";
import { useLocales } from "react-localized";
import { useDispatch } from "react-redux";
import { onSetModals } from "../Store/actions/CabinetActions";

export function useDebounce(callback, delay) {
  const timer = useRef();

  const debounceCallback = useCallback(
    (...args) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return debounceCallback;
}

export const useScrollElementOnScreen = (options, cb) => {
  const containerRef = useRef(null);
  const [isVisible, setVisible] = useState(false);

  const callbackFunction = (entries) => {
    const [entry] = entries;
    setVisible(entry.isIntersecting);
    if (cb) cb(entry);
  };

  useEffect(() => {
    const ref = containerRef.current;
    const observer = new IntersectionObserver(callbackFunction, options);
    if (ref) observer.observe(ref);

    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [containerRef, options]); //eslint-disable-line

  return [containerRef, isVisible];
};

export const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

export const useElementResize = () => {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const callback = (entries) => {
    const [entry] = entries;
    setWidth(entry.contentRect.width);
    setHeight(entry.contentRect.height);
  };

  const resizeObserver = new ResizeObserver(callback);

  useEffect(() => {
    const ref = containerRef?.current;
    if (ref) resizeObserver.observe(ref);
    return () => {
      if (ref) resizeObserver.unobserve(ref);
    };
  }, [containerRef]); //eslint-disable-line

  return [containerRef, width, height];
};

export function useWebRTC(socket /*config*/) {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const [clients, updateClients] = useStateWithCallback([]);

  // const peerConnection = useRef({});
  const localMediaStream = useRef(null);
  const peerMediaElements = useRef({
    [LOCAL_CLIENT]: null
  });

  const addNewClient = useCallback(
    (client, cb) => {
      if (!clients.includes(client)) {
        updateClients((state) => [...state, client], cb);
      }
    },
    [clients, updateClients]
  );

  useEffect(() => {
    async function startCapture() {
      localMediaStream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          width: 800,
          height: 600
        }
      });

      addNewClient(LOCAL_CLIENT, () => {
        const localVideoElement = peerMediaElements.current[LOCAL_CLIENT];

        if (localVideoElement) {
          localVideoElement.volume = 0;
          localVideoElement.srcObject = localMediaStream.current;
        }
      });
    }

    startCapture()
      .then(() => {
        console.log(socket, CHAT_CALLROOM);
        // socket.send(
        //   JSON.stringify({
        //     action: CHAT_CALLROOM.VOICE_CALL,
        //     data: null
        //   })
        // );
      })
      .catch((err) => {
        dispatch(onSetModals(MODALS.ERROR, { open: true, message: __("Не удалось захватить аудио/видео контент") }));
        console.log(err);
      });
  }, []); //eslint-disable-line

  const provideMediaRef = useCallback((id, node) => {
    peerMediaElements.current[id] = node;
  }, []);
  return { clients, provideMediaRef };
}

export function useStateWithCallback(initialState) {
  const [state, setState] = useState(initialState);
  const cbRef = useRef();

  const updateState = useCallback((newState, cb) => {
    cbRef.current = cb;

    setState((state) => (typeof newState === TYPES.FUNCTION ? newState(state) : newState));
  }, []);

  useEffect(() => {
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null;
    }
  }, [state]); //eslint-disable-line

  return [state, updateState];
}
