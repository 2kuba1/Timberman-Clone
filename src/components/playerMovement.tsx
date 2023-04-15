import Image from "next/image";
import { FC } from "react";
import { useContext } from "react";
import { GameStatusContext } from "~/contexts/gameStatusContext";

interface Props {
  playerPosition: number;
  lastPosition: string;
  animationStage: number;
}

const PlayerMovement: FC<Props> = ({
  playerPosition,
  animationStage,
  lastPosition,
}) => {
  const { Status } = useContext(GameStatusContext);

  return (
    <>
      {Status === "playing" && (
        <div
          className={`relative bottom-4 z-10 flex h-full w-full items-end ${
            playerPosition === 0
              ? lastPosition
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
            height="200"
            width="200"
            className={`${
              playerPosition === 1 ? "" : "scale-x-[-1] transform"
            }`}
          />
        </div>
      )}
      {Status === "gameOver" && (
        <div
          className={`relative bottom-4 flex h-full w-full items-end ${
            playerPosition === 0
              ? lastPosition
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
