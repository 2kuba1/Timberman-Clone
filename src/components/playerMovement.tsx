import Image from "next/image";
import { useContext, useState } from "react";
import { GameStatusContext } from "~/contexts/gameStatusContext";
import useDetectKeyPress from "~/hooks/useDetectKeyPress";

const PlayerMovement = () => {
  const [playerPosition, setPlayerPosition] = useState(0); // 0 = standing, 1 =  left, 2  = right
  const [lastPostion, setLastPostion] = useState("justify-start");
  const [animationStage, setAnimationStage] = useState(0);

  const { Status } = useContext(GameStatusContext);

  const cutSound = new Audio("/cut.mp3");

  const playCutSound = () => {
    cutSound.currentTime = 0;
    cutSound.play();
  };

  useDetectKeyPress("ArrowLeft", async () => {
    playCutSound();
    setPlayerPosition(1);
    setLastPostion("justify-start");
    setTimeout(() => {
      setAnimationStage(1);
      setTimeout(() => {
        setAnimationStage(2);
        setTimeout(() => {
          setAnimationStage(0);
        }, 100);
      }, 100);
    }, 100);
  });
  useDetectKeyPress("ArrowRight", async () => {
    playCutSound();
    setPlayerPosition(2);
    setLastPostion("justify-end");
    setTimeout(() => {
      setAnimationStage(1);
      setTimeout(() => {
        setAnimationStage(2);
        setTimeout(() => {
          setAnimationStage(0);
        }, 100);
      }, 100);
    }, 100);
  });

  return (
    <>
      {Status === "playing" && (
        <div
          className={`relative bottom-4 flex h-full w-full items-end ${
            playerPosition === 0
              ? lastPostion
              : playerPosition === 1
              ? "justify-start"
              : "justify-end"
          }`}
        >
          <Image
            src={`${
              animationStage === 0
                ? "/man1.png"
                : animationStage === 1
                ? "/man2.png"
                : "/man3.png"
            }`}
            alt="man"
            height="128"
            width="128"
          />
        </div>
      )}
      {Status === "gameover" && (
        <div
          className={`relative bottom-4 flex h-full w-full items-end ${
            playerPosition === 0
              ? lastPostion
              : playerPosition === 1
              ? "justify-start"
              : "justify-end"
          }`}
        >
          <Image src="/rip.png" alt="rip" height="128" width="128" />
        </div>
      )}
    </>
  );
};

export default PlayerMovement;
