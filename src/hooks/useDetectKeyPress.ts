import { useEffect } from "react";

const useDetectKeyPress = (key: string, callback: () => void) => {
  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === key) {
        callback();
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);
};

export default useDetectKeyPress;
