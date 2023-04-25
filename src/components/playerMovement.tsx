import Image from "next/image";
import { FC } from "react";
import { useContext } from "react";
import { GameStatusContext } from "~/contexts/gameStatusContext";

interface Props {
  playerPosition: number;
  lastPosition: string;
  animationStage: number;
  isShifting: boolean;
}

const PlayerMovement: FC<Props> = ({
  playerPosition,
  animationStage,
  lastPosition,
  isShifting,
}) => {
  const { Status } = useContext(GameStatusContext);

  return (
    <>
      {Status === "playing" && (
        <div
          className={`relative bottom-16 z-10 flex h-full w-full items-end ${
            playerPosition === 0
              ? lastPosition
              : playerPosition === 1
              ? "justify-start xl:relative xl:right-[-39.5%]"
              : "justify-end xl:relative xl:left-[-39.5%]"
          }`}
        >
          <Image
            priority={true}
            src={`${setAnimationStage(animationStage, isShifting)}`}
            alt="man"
            height="200"
            width="200"
            className={`${
              playerPosition === 1 ? "" : "scale-x-[-1] transform"
            }`}
          />
        </div>
      )}
    </>
  );
};

export default PlayerMovement;

const setAnimationStage = (animationStage: number, isShifting: boolean) => {
  if (animationStage === 0) {
    if (isShifting) {
      return "/man1.png";
    }
    return "/man4.png";
  }
  if (animationStage === 1) {
    return "/man2.png";
  }
  return "/man3.png";
};
