import Image from "next/image";
import { useState } from "react";
import useDetectKeyPress from "~/hooks/useDetectKeyPress";

const PlayerMovement = () => {
  const [playerPosition, setPlayerPosition] = useState(0); // 0 = standing, 1 =  left, 2  = right
  const [lastPostion, setLastPostion] = useState("justify-start"); // 0 = standing, 1 =  left, 2  = right

  useDetectKeyPress("ArrowLeft", async () => {
    setPlayerPosition(1);
    setLastPostion("justify-start");
    console.log("left");
    await cancelKey();
  });
  useDetectKeyPress("ArrowRight", async () => {
    setPlayerPosition(2);
    setLastPostion("justify-end");
    console.log("right");
    await cancelKey();
  });

  const cancelKey = async () => {
    const detectKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") return;
    };
    window.addEventListener("keyup", detectKeyUp);
    return new Promise((resolve) =>
      setTimeout(() => {
        setPlayerPosition(0);
        removeEventListener("keyup", detectKeyUp);
        resolve(true);
      }, 400)
    );
  };

  return (
    <div
      className={`$ relative bottom-4 flex h-full w-full items-end ${
        playerPosition === 0
          ? lastPostion
          : playerPosition === 1
          ? "justify-start"
          : "justify-end"
      }`}
    ></div>
  );
};

export default PlayerMovement;
