// imports
import { GiLog } from "react-icons/gi";
import { api } from "~/utils/api";
import Head from "next/head";
import { TfiCup } from "react-icons/tfi";
import { ClipLoader } from "react-spinners";

const Leaderboard = () => {
  const { data: scores } = api.scoreboard.getAllScores.useQuery(undefined, {
    refetchInterval: 3000,
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
        <div className="flex h-full w-full flex-wrap items-center justify-center gap-5">
          {scores && scores.length > 0 ? (
            scores?.map((score, index) => (
              <div
                key={index}
                className="flex h-10 w-2/5 flex-wrap items-center justify-between rounded-md bg-white "
              >
                <div className="relative left-5 flex items-center gap-3 text-sm">
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
                  <div>{score.username}</div>
                </div>
                <div className="relative right-10 flex items-center gap-2">
                  {score.score} <GiLog />
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
