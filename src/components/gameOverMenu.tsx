import { useContext } from "react";
import { GameStatusContext } from "~/contexts/gameStatusContext";

const GameOverMenu = () => {
  const { SetStatus } = useContext(GameStatusContext);

  return (
    <div className="absolute z-[60] flex h-full w-full flex-col items-center justify-center backdrop-blur-sm">
      <h1 className="text-3xl">You have died</h1>
      <button
        onClick={() => {
          window.location.reload();
        }}
        className="h-24 w-3/4 bg-menu-yellow text-2xl text-black"
      >
        Play again
      </button>
    </div>
  );
};

export default GameOverMenu;
