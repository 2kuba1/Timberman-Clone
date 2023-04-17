import { type NextPage } from "next";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import Game from "~/components/game";
import StartNewGameMenu from "~/components/startNewGameMenu";
import { GameStatusContext } from "~/contexts/gameStatusContext";
import GameOverMenu from "~/components/gameOverMenu";

const Home: NextPage = () => {
  const { Status } = useContext(GameStatusContext);
  const [isThemePlaying, setisThemePlaying] = useState(false);

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
      </Head>
      <main className="h-screen w-screen bg-[url('/background.png')] bg-cover xl:bg-contain">
        {Status === "idle" && <StartNewGameMenu />}
        {Status === "playing" && <Game />}
        {Status === "gameOver" && <GameOverMenu />}
      </main>
    </>
  );
};

export default Home;
