import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { useCookies } from "react-cookie";
import { ClipLoader } from "react-spinners";
import { type ZodIssue, z } from "zod";
import { GameStatusContext } from "~/contexts/gameStatusContext";
import { api } from "~/utils/api";
import Link from "next/link";
import { BiMedal } from "react-icons/bi";

const StartNewGameMenu = () => {
  const [play, setPlay] = useState(false);
  const { SetStatus } = useContext(GameStatusContext);
  const [isClosing, setIsClosing] = useState(false);
  const [username, setUsername] = useState("");
  const [addUserError, setAddUserError] = useState<ZodIssue>();
  const [cookies, setCookie] = useCookies(["id"]);

  const addUser = api.user.createUser.useMutation();
  const getTop3 = api.scoreboard.getTop3.useQuery();
  const getUsername = api.user.getUsername.useQuery(cookies.id as string, {
    enabled: false,
  });
  const updateUsername = api.user.updateUsername.useMutation({
    onSuccess: async () => {
      await getUsername.refetch();
    },
  });

  const usernameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetch = async () => {
      if (cookies.id) {
        await getUsername.refetch();
        setUsername(getUsername.data?.username || "");
      }
    };
    fetch().catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    var cookieExpiresDate = new Date();
    cookieExpiresDate.setTime(cookieExpiresDate.getTime() + 5 * 60 * 1000);

    e.preventDefault();
    if (!cookies.id) {
      const id = await addUser.mutateAsync(usernameRef.current!.value);
      setCookie("id", id, {
        path: "/",
        expires: cookieExpiresDate,
      });
      const schema = z
        .string()
        .min(3, { message: "Username must contain at least 3 letters" })
        .max(25, { message: "Username must conatin less than 25 letters" });
      const check = await schema.safeParseAsync(usernameRef.current?.value);

      if (!check.success) {
        console.log(check.error);
        setAddUserError(check.error.issues[0]);
        return;
      }
    } else if (
      usernameRef.current?.value !== getUsername.data?.username &&
      getUsername.data?.username !== null
    ) {
      const schema = z
        .string()
        .min(3, { message: "Username must contain at least 3 letters" })
        .max(25, { message: "Username must conatin less than 25 letters" });

      const check = await schema.safeParseAsync(usernameRef.current?.value);

      if (!check.success) {
        setAddUserError(check.error.issues[0]);
        return;
      }

      await updateUsername.mutateAsync({
        id: cookies.id as string,
        newName: usernameRef.current!.value,
      });
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
          className="flex h-5/6 w-72 flex-col items-center rounded-xl bg-red-900 xl:h-full 2xl:h-5/6"
        >
          <Image
            src="/timberman_logo.png"
            alt="Timberman"
            height="96"
            width="250"
            className="relative top-5"
          />
          <form
            className="relative top-12 flex h-1/2 w-full flex-col items-center gap-5"
            onSubmit={(e) => {
              handleSubmit(e).catch(console.error);
            }}
          >
            <label className="text-2xl font-bold text-menu-yellow">
              Username
            </label>
            <input
              type="text"
              className="h-10 w-2/3 rounded-xl p-3 text-center font-bold outline-none"
              defaultValue={getUsername.data?.username}
              ref={usernameRef}
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
            {addUser.isError && (
              <p className="text-center text-sm font-bold">
                Error status code: {addUser.error.message}
              </p>
            )}
            {updateUsername.isLoading && (
              <ClipLoader size="32px" color="white" />
            )}
          </form>
          {play && <ReactAudioPlayer src="/menu.mp3" autoPlay />}
          <div className="relative flex w-full flex-col items-center gap-6">
            <Link href="/leaderboard">
              <Image
                className="cursor-pointer"
                src="/btn-score.png"
                alt="top-3"
                height="64"
                width="64"
              />
            </Link>
            <div className="flex w-full flex-col items-center gap-5 text-center font-bold">
              {getTop3.data?.map((player, index) => (
                <div className="flex items-center gap-2" key={index}>
                  {index === 1 ? (
                    <span className="text-menu-silver">
                      <BiMedal />
                    </span>
                  ) : index === 2 ? (
                    <span className="text-menu-copper">
                      <BiMedal />
                    </span>
                  ) : (
                    <span className="text-menu-gold">
                      <BiMedal />
                    </span>
                  )}
                  <span
                    className={`text-md w-full rounded-lg p-1 text-slate-200 underline ${
                      index === 1
                        ? "decoration-menu-silver"
                        : index === 2
                        ? "decoration-menu-copper"
                        : "decoration-menu-gold"
                    }`}
                  >
                    {player.username.length >= 9
                      ? player.username.substring(0, 9) + "..."
                      : player.username}
                  </span>
                </div>
              ))}
              {getTop3.isLoading && <ClipLoader color="#FBB201" size="32px" />}
              {getTop3.isError && (
                <p className="text-lg">
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
