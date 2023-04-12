import { type NextPage } from "next";
import Head from "next/head";
import StartNewGame from "~/components/startNewGame";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Timberman</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen w-screen bg-[url('/background.png')] bg-cover xl:bg-contain">
        <StartNewGame />
      </main>
    </>
  );
};

export default Home;
