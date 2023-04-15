import { type NextPage } from "next";
import Head from "next/head";
import { useContext, useEffect, useRef, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import PlayerMovement from "~/components/playerMovement";
import StartNewGame from "~/components/startNewGame";
import { GameStatusContext } from "~/contexts/gameStatusContext";
import Image from "next/image"
import Game from "~/components/Game"

const Home: NextPage = () => {
  const { Status, SetStatus } = useContext(GameStatusContext);
  const [isThemePlaying, setisThemePlaying] = useState(0);

  useEffect(() => {
    if (Status === "playing") {
      setTimeout(() => {
        setisThemePlaying(1);
      }, 300);
    } else {
      setisThemePlaying(2);
    }
  }, [Status]);

  return (
    <>
      {isThemePlaying && <ReactAudioPlayer src="theme.ogg" autoPlay loop />}
      <Head>
        <title>Timberman</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen w-screen bg-[url('/background.png')] bg-cover xl:bg-contain">
        {Status === "idle" && <StartNewGame />}
        {Status === "playing" && (<><Game /> <PlayerMovement /> </>)}
      </main>
    </>
  );
};

export default Home;
