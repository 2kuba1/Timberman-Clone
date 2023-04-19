import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { ClipLoader } from "react-spinners";
import { GameStatusContext } from "~/contexts/gameStatusContext";
import { api } from "~/utils/api";
import useDetectKeyPress from "~/hooks/useDetectKeyPress";

const GameOverMenu = () => {
  const { SetStatus } = useContext(GameStatusContext);

  const [cookies] = useCookies(["id"]);

  const [bestScore, setBestScore] = useState(0);
  const getBestScore = api.scoreboard.getBestScore.useQuery(
    cookies.id as string
  );
  const updateScore = api.scoreboard.updateScore.useMutation();

  useDetectKeyPress("Enter", () => SetStatus("playing"));

  useEffect(() => {
    if (getBestScore.data) {
      const update = async () => {
        if (
          getBestScore.data!.score < Number(sessionStorage.getItem("score"))
        ) {
          setBestScore(Number(sessionStorage.getItem("score")));
          await updateScore.mutateAsync({
            id: cookies.id as string,
            newScore: Number(sessionStorage.getItem("score")),
          });
        } else {
          setBestScore(getBestScore.data!.score);
        }
      };
      update().catch(console.error);
    }
  }, [getBestScore.data]);

  return (
    <div className="z-[60] flex h-full w-full flex-col items-center justify-center backdrop-blur-sm">
      {getBestScore.isLoading && <ClipLoader color="#FBB201" size="32px" />}
      {getBestScore.isError && <p>{getBestScore.error.data?.httpStatus}</p>}
      <AnimatePresence>
        <motion.div
          initial={{ y: -200 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="relative top-10 flex h-2/5 w-3/4 flex-col items-center justify-center gap-3 rounded-2xl bg-red-900 xl:w-1/6"
        >
          <label className="text-2xl font-bold text-menu-yellow">
            Best Score
          </label>
          <h2 className="text-3xl font-bold">{bestScore}</h2>
          <label className="text-2xl font-bold text-menu-yellow">Score</label>
          <h2 className="text-3xl font-bold">
            {sessionStorage.getItem("score")}
          </h2>
        </motion.div>
      </AnimatePresence>
      <div className="relative bottom-10 flex h-full flex-col justify-end gap-16">
        <div className="flex flex-col gap-2">
          <Image
            priority={true}
            src="/play.png"
            width={150}
            height={150}
            alt="play button"
            onClick={() => SetStatus("playing")}
            className="cursor-pointer"
          />
          <Image
            priority={true}
            src="/home.png"
            width={150}
            height={150}
            alt="back home button"
            onClick={() => SetStatus("idle")}
            className="cursor-pointer"
          />
        </div>
        <AnimatePresence>
          <motion.div
            initial={{ y: 150 }}
            animate={{ y: 0 }}
            exit={{ y: -150 }}
          >
            <Image
              priority={true}
              src="/rip.png"
              width={150}
              height={150}
              alt="rip"
              className="relative bottom-8 "
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GameOverMenu;
