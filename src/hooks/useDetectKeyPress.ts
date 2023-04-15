import { useEffect } from "react";

const useDetectKeyPress = (key: string, callback: () => void) => {
  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === key) {
        callback();
      }
    };
    document.addEventListener("keyup", keyDownHandler);
    return () => {
      document.removeEventListener("keyup", keyDownHandler);
    };
  }, []);
};

export default useDetectKeyPress;
