import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useContext, useRef, useState } from "react";
import { SyncLoader } from "react-spinners";
import { GameStatusContext } from "~/contexts/gameStatusContext";
import { api } from "~/utils/api";

const StartNewGame = () => {
  const clickSound = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined" ? new Audio("/menu.mp3") : undefined
  );

  const { SetStatus } = useContext(GameStatusContext);

  const [isClosing, setIsClosing] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsClosing(true);
    setTimeout(() => {
      SetStatus("playing");
    }, 200);
  };

  const getTop3 = api.scoreboard.getTop3.useQuery();

  return (
    <div className="flex h-screen w-screen items-center justify-center backdrop-blur-sm">
      <AnimatePresence>
        <motion.div
          initial={{ y: -1000, opacity: 0 }}
          animate={{ y: isClosing ? -1000 : 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="flex h-4/5 w-3/4 flex-col items-center rounded-xl bg-red-900 p-1"
        >
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
              onClick={() => clickSound.current?.play()}
            />
          </form>
          <div className="relative flex w-full flex-col items-center gap-6">
            <Image src="/btn-score.png" alt="top-3" height="64" width="64" />
            <div className="flex w-full flex-col items-center gap-2 text-center font-bold">
              {getTop3.data?.map((player, index) => (
                <div className="flex items-center" key={index}>
                  <span
                    className={`material-symbols-outlined absolute left-8 ${
                      index === 1
                        ? "text-menu-silver"
                        : index === 2
                        ? "text-menu-copper"
                        : "text-menu-gold"
                    }`}
                  >
                    workspace_premium
                  </span>
                  <span
                    className={`w-3/4 rounded-lg p-1 text-xl underline ${
                      index === 1
                        ? "decoration-menu-silver"
                        : index === 2
                        ? "decoration-menu-copper"
                        : "decoration-menu-gold"
                    }`}
                  >
                    {player.username}
                  </span>
                </div>
              ))}
              {getTop3.isLoading && <SyncLoader color="#FBB201" size="32px" />}
              {getTop3.isError && (
                <p className="text-xl">
                  Error status code: {getTop3.error.data?.httpStatus}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default StartNewGame;
