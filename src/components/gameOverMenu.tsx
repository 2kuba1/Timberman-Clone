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
    <div className="z-[60] flex h-full w-full flex-col items-center justify-between backdrop-blur-sm">
      <div className="absolute top-[30vh] flex flex-col items-center justify-center text-2xl">
        <h2 className="text-2xl font-bold">{bestScore}</h2>
      </div>
      <div className="absolute top-[38vh] flex flex-col justify-center text-2xl">
        <h2 className="text-2xl font-bold">
          {sessionStorage.getItem("score")}
        </h2>
      </div>
      {getBestScore.isLoading && <ClipLoader color="#FBB201" size="32px" />}
      {getBestScore.isError && <p>{getBestScore.error.data?.httpStatus}</p>}
      <AnimatePresence>
        <motion.div
          initial={{ y: -200 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <Image
            src="/gameover.png"
            width={300}
            height={300}
            alt="gameover scoreboard"
          />
        </motion.div>
      </AnimatePresence>
      <div className='flex flex-col gap-5'>
        <Image
          src="/play.png"
          width={150}
          height={150}
          alt="play button"
          onClick={() => SetStatus("playing")}
        />
        <Image
          src="/home.png"
          width={150}
          height={150}
          alt="back home button"
          onClick={() => SetStatus("idle")}
        />
      </div>
      <AnimatePresence>
        <motion.div initial={{ y: 150 }} animate={{ y: 0 }} exit={{ y: -150 }}>
          <Image
            src="/rip.png"
            width={150}
            height={150}
            alt="rip"
            className="relative bottom-5"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default GameOverMenu;
