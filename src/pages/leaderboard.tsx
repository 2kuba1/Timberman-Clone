// imports
import { GiLog } from "react-icons/gi";
import { api } from "~/utils/api";

const Leaderboard = () => {
  const { data: scores } = api.scoreboard.getAllScores.useQuery();

  return (
    <div className='mt-5 flex h-screen w-screen items-center gap-5 overflow-x-scroll bg-[url("/background.png")] bg-cover text-xl font-bold lg:bg-contain lg:text-2xl '>
      <div className="relative top-5 flex h-full w-full flex-col items-center gap-5">
        {(scores && scores.length > 0) ? scores?.map((score, index) => (

        <div className="flex h-28 w-4/5 flex-wrap items-center justify-around rounded-md bg-white ">
          <div>{index + 1}# {score.username}</div>{" "}
          <div className="flex items-center gap-2">
            {score.score} <GiLog />
          </div>
        </div>
        )) : (
          <div>no scores yet</div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
