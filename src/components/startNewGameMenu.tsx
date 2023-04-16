import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { useCookies } from "react-cookie";
import { ClipLoader } from "react-spinners";
import { ZodError, ZodIssue, z } from "zod";
import { GameStatusContext } from "~/contexts/gameStatusContext";
import { api } from "~/utils/api";

const StartNewGameMenu = () => {
  const [play, setPlay] = useState(false);
  const { SetStatus } = useContext(GameStatusContext);
  const [isClosing, setIsClosing] = useState(false);
  const [username, setUsername] = useState("");
  const [addUserError, setAddUserError] = useState<ZodIssue>();
  const [cookies, setCookie] = useCookies(["id"]);

  const addUser = api.scoreboard.createUser.useMutation();
  const getTop3 = api.scoreboard.getTop3.useQuery();
  const getUsername = api.scoreboard.getUsername.useQuery(cookies.id, {
    enabled: false,
  });

  useEffect(() => {
    const fetch = async () => {
      if (cookies.id) {
        await getUsername.refetch();
        setUsername(getUsername.data?.username || "");
      }
    };
    fetch();
    console.log(username);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!cookies.id) {
      const id = await addUser.mutateAsync(username);
      setCookie("id", id);
      const schema = z
        .string()
        .min(3, { message: "Username must contain at least 3 letters" })
        .max(25, { message: "Username must conatin less than 25 letters" });
      const check = await schema.safeParseAsync(username);

      if (!check.success) {
        console.log(check.error);
        setAddUserError(check.error.issues[0]);
        return;
      }
    }

    setIsClosing(true);
    setTimeout(() => {
      SetStatus("playing");
    }, 200);
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center backdrop-blur-sm">
      <AnimatePresence>
        <motion.div
          initial={{ y: -1000, opacity: 0 }}
          animate={{ y: isClosing ? -1000 : 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="flex h-4/5 w-72 flex-col items-center rounded-xl bg-red-900"
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
              value={getUsername.data ? getUsername.data?.username : username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="submit"
              value="Start"
              className="h-10 w-2/3 cursor-pointer rounded-xl bg-menu-yellow font-bold text-red-900 duration-100 active:scale-110 active:bg-menu-copper"
              onClick={() => setPlay(true)}
            />
            {addUser.isLoading && <ClipLoader color="#FBB201" size="32px" />}
            {addUserError && (
              <p className="text-center text-sm font-bold">
                {addUserError.message}
              </p>
            )}
          </form>
          {play && <ReactAudioPlayer src="/menu.mp3" autoPlay />}
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
                    className={`w-full rounded-lg p-1 text-xl underline ${
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
              {getTop3.isLoading && <ClipLoader color="#FBB201" size="32px" />}
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

export default StartNewGameMenu;
