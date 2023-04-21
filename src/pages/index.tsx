import { type NextPage } from "next";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import Game from "~/components/game";
import StartNewGameMenu from "~/components/startNewGameMenu";
import { GameStatusContext } from "~/contexts/gameStatusContext";
import GameOverMenu from "~/components/gameOverMenu";
import useDetectKeyPress from "~/hooks/useDetectKeyPress";

const Home: NextPage = () => {
  const { Status, SetStatus } = useContext(GameStatusContext);
  const [isThemePlaying, setisThemePlaying] = useState(false);

  useDetectKeyPress("Escape", () => {
    if (Status === "idle") return;
    SetStatus("idle");
  });

  useEffect(() => {
    if (Status === "playing") {
      setTimeout(() => {
        setisThemePlaying(true);
      }, 300);
    } else {
      setisThemePlaying(false);
    }
  }, [Status]);

  return (
    <>
      {isThemePlaying && (
        <ReactAudioPlayer src="theme.mp3" autoPlay loop volume={0.5} />
      )}
      <Head>
        <title>Timberman</title>
        <meta name="description" content="" />
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main className="h-screen w-screen bg-[url('/background.png')] bg-cover xl:bg-contain">
        {Status === "idle" && (
          <>
            <a
              className="absolute bottom-5 z-50 h-[10px] w-screen text-center text-[10px] text-sm text-white opacity-50 hover:underline hover:opacity-100 lg:bottom-5 lg:right-5 lg:w-[30%] lg:text-sm"
              href="https://github.com/2kuba1/Timberman-School-Open-Days"
            >
              by Jakub Wojtyna & Paweł Cyrzyk
            </a>
            <StartNewGameMenu />
          </>
        )}
        {Status === "playing" && <Game />}
        {Status === "gameOver" && <GameOverMenu />}
      </main>
    </>
  );
};

export default Home;
