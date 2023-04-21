// imports
import { GiLog } from "react-icons/gi";
import { api } from "~/utils/api";
import Head from "next/head";
import { TfiCup } from "react-icons/tfi";
import { ClipLoader } from "react-spinners";
import type { Player } from "~/types/player";
import Image from 'next/image';
import Link from 'next/link';
import useDetectKeyPress from "~/hooks/useDetectKeyPress";
import { useRouter } from "next/router";


const Leaderboard = () => {
  const { data: players} = api.scoreboard.getAllScores.useQuery(undefined, {
    refetchInterval: 3000,
  });

  const router = useRouter();
  useDetectKeyPress("Escape", () => { router.push('/') });

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
        <Link href='/'>
      <Image className='fixed top-5 left-5' alt='back to homepage button' src='/home.png' width='100' height='100'/>
        </Link>
        <div className="lg:grid-cols-2 flex min-h-[90%] max-h-[90%] w-full flex-wrap items-center justify-center gap-5 overflow-y-scroll">
          <div className='lg:hidden h-10 mb-3 relative top-10 text-sm px-10 flex lg:w-3/5 w-[100%] text-white justify-around'>
          <div>nick</div>
          <div>|</div>
          <div>best score</div>
          </div>
          {players && players.length > 0 ? (
            players?.map((player: Player, index: number) => (
              <div
                key={index}
                className="flex h-16 lg:w-[45%] w-[100%] flex-wrap items-center justify-between rounded-md bg-white"
              >
                <div className="relative left-2 lg:left-5 flex items-center gap-3 text-sm">
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
                  <div className='text-sm'>{player.username}</div>
                </div>
                <div className="relative lg:right-10 right-2 flex items-center gap-2 lg:text-lg text-sm">
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
