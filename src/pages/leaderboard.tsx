// imports
import { GiLog } from "react-icons/gi";
import { api } from "~/utils/api";
import Head from "next/head";
import { TfiCup } from "react-icons/tfi";
import { ClipLoader } from "react-spinners";
import type { Player } from "~/types/player";
import Image from "next/image";
import Link from "next/link";
import useDetectKeyPress from "~/hooks/useDetectKeyPress";
import { useRouter } from "next/router";

const Leaderboard = () => {
  const { data: players } = api.scoreboard.getAllScores.useQuery(undefined, {
    refetchInterval: 3000,
  });

  const router = useRouter();
  useDetectKeyPress("Escape", () => {
    router.push("/").catch((err) => console.log(err));
  });

  return (
    <>
      <Head>
        <title>Leaderboard</title>
        <meta name="description" content="" />
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className='flex h-screen w-screen items-center gap-5 overflow-y-auto bg-[url("/background.png")] bg-cover p-5 text-xl font-bold lg:bg-contain lg:text-2xl'>
        <Link href="/">
          <Image
            className="fixed left-5 top-5"
            alt="back to homepage button"
            src="/home.png"
            width="100"
            height="100"
          />
        </Link>
        <div className="flex max-h-[90%] min-h-[90%] w-full flex-wrap items-center justify-center gap-5 overflow-y-scroll lg:grid-cols-2">
          <div className="relative top-10 mb-3 flex h-10 w-[100%] justify-around px-10 text-sm text-white lg:hidden lg:w-3/5">
            <div>nick</div>
            <div>|</div>
            <div>best score</div>
          </div>
          {players && players.length > 0 ? (
            players?.map((player: Player, index: number) => (
              <div
                key={index}
                className="flex h-16 w-[100%] flex-wrap items-center justify-between rounded-md bg-white lg:w-[45%]"
              >
                <div className="relative left-2 flex items-center gap-3 text-sm lg:left-5">
                  <div className="flex items-center gap-1 text-xl">
                    <span>{index + 1}#</span>
                    {index + 1 <= 3 && (
                      <div
                        className={`text-menu-${
                          index + 1 === 1
                            ? "gold"
                            : index + 1 === 2
                            ? "silver"
                            : "copper"
                        }`}
                      >
                        <TfiCup />
                      </div>
                    )}
                  </div>
                  <div className="text-sm">{player.username}</div>
                </div>
                <div className="relative right-2 flex items-center gap-2 text-sm lg:right-10 lg:text-lg">
                  {player.score} <GiLog />
                </div>
              </div>
            ))
          ) : (
            <div className="flex h-screen w-screen items-center justify-center">
              <ClipLoader size="32px" color="white" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
