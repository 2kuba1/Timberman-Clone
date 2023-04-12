import Image from "next/image";
import { useRef } from "react";

const StartNewGame = () => {
  const musicPlayers = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined" ? new Audio("/menu.mp3") : undefined
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center backdrop-blur-sm">
      <div className="flex h-4/5 w-3/4 flex-col items-center rounded-xl bg-red-900 p-1">
        <Image
          src="/timberman_logo.png"
          alt="Timberman"
          height="96"
          width="250"
          className="relative top-5"
        />
        <form
          className="relative top-16 flex h-1/2 w-full flex-col items-center gap-5"
          onSubmit={handleSubmit}
        >
          <label className="text-3xl font-bold text-menu-yellow">
            Username
          </label>
          <input
            type="text"
            className="h-10 w-2/3 rounded-xl p-3 text-center font-bold outline-none"
          />
          <input
            type="submit"
            value="Start"
            className="h-10 w-2/3 cursor-pointer rounded-xl bg-menu-yellow font-bold text-red-900 duration-100 active:scale-110 active:bg-menu-copper"
            onClick={() => musicPlayers.current?.play()}
          />
        </form>
        <div className="relative flex w-full flex-col items-center gap-6">
          <Image src="/btn-score.png" alt="top-3" height="64" width="64" />
          <div className="flex w-full flex-col items-center gap-2 text-center font-bold">
            <div className="flex items-center border-b-2 border-black">
              <span className="material-symbols-outlined absolute left-8 text-menu-gold">
                workspace_premium
              </span>
              <span className="w-3/4 rounded-lg p-1 text-menu-gold">
                XXXXXXX
              </span>
            </div>
            <div className="flex items-center border-b-2 border-black">
              <span className="material-symbols-outlined absolute left-8 text-menu-silver">
                workspace_premium
              </span>
              <span className="r w-3/4 rounded-lg p-1 text-menu-silver">
                XXXXXXX
              </span>
            </div>
            <div className="flex items-center">
              <span className="material-symbols-outlined absolute left-8 text-menu-copper">
                workspace_premium
              </span>
              <span className="rounded-lgr w-3/4 p-1 text-menu-copper">
                XXXXXXX
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartNewGame;
