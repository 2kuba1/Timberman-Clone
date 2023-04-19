import PlayerMovement from "./playerMovement";
import Tree from "./tree";
import { useState, useEffect, useRef, useMemo } from "react";
import { useContext } from "react";
import { ClickContext } from "~/contexts/clickContext";
import { GameStatusContext } from "~/contexts/gameStatusContext";
import useDetectKeyPress from "~/hooks/useDetectKeyPress";
import Counter from "./counter";
import ScreenBtn from "./screenBtn";
import TimeBar from "./timeBar";
import Image from "next/image";
import ReactAudioPlayer from "react-audio-player";
import { generateTree, createLog } from "~/utils/tree";

const Game = () => {
  const [playerPosition, setPlayerPosition] = useState(0); // 0 = standing, 1 =  left, 2  = right
  const [lastPostion, setLastPostion] = useState(
    "justify-start xl:relative xl:right-[-39.5%]"
  );
  const [animationStage, setAnimationStage] = useState(0);
  const [treeBlocks, setTreeBlocks] = useState<string[]>(generateTree(8));
  const [isShifting, setIsShifting] = useState(false);
  const [barTime, setBarTime] = useState(50);
  const [score, setScore] = useState(0);
  const [isFull, setIsFull] = useState(false);

  const scoreRef = useRef(score);
  const timeRef = useRef(barTime);

  const { Status, SetStatus } = useContext(GameStatusContext);
  const { IsClicked, SetIsClicked } = useContext(ClickContext);

  const cutSound = useMemo(() => new Audio("/cut.mp3"), []);
  const gameOverSound = useMemo(() => new Audio("/death.mp3"), []);

  const playCutSound = async () => {
    cutSound.currentTime = 0;
    await cutSound.play();
  };

  useEffect(() => {
    const play = async () => {
      if (
        (treeBlocks[treeBlocks.length - 1] === "/branch1.png" &&
          playerPosition === 1) ||
        (treeBlocks[treeBlocks.length - 1] === "/branch2.png" &&
          playerPosition === 2)
      ) {
        setScore((prev) => prev - 1);
        await gameOverSound.play();
        SetStatus("gameOver");
      }
    };
    play().catch((err) => console.log(err));
  }, [IsClicked]);

  const addLog = () => {
    SetIsClicked(true);
    setTreeBlocks((prev) => {
      const arr = [...prev];
      const lastLog = arr[0];
      arr.unshift(createLog(lastLog as string));
      arr.pop();
      return arr;
    });
  };

  const handleLeftClick = () => {
    setScore((prev) => prev + 1);
    playCutSound().catch((err) => console.log(err));
    setPlayerPosition(1);
    setLastPostion("justify-start");
    setBarTime((prev) => (timeRef.current < 100 ? prev + 4 : prev));
    setIsFull(timeRef.current >= 100 ? true : false);
    setTimeout(() => {
      addLog();
      setAnimationStage(1);
      setTimeout(() => {
        setAnimationStage(2);
        setTimeout(() => {
          setAnimationStage(0);
        }, 100);
      }, 100);
    }, 100);
    SetIsClicked(false);
  };

  const handleRightClick = () => {
    setScore((prev) => prev + 1);
    playCutSound().catch((err) => console.log(err));
    setPlayerPosition(2);
    setLastPostion("justify-end");
    setBarTime((prev) => (timeRef.current < 100 ? prev + 4 : prev));
    setIsFull(timeRef.current >= 100 ? true : false);
    setTimeout(() => {
      addLog();
      setAnimationStage(1);
      setTimeout(() => {
        setAnimationStage(2);
        setTimeout(() => {
          setAnimationStage(0);
        }, 100);
      }, 100);
    }, 100);
    SetIsClicked(false);
  };

  useDetectKeyPress("ArrowLeft", handleLeftClick);
  useDetectKeyPress("ArrowRight", handleRightClick);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsShifting((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFull(timeRef.current >= 100 ? true : false);
      setBarTime((prev) => {
        if (scoreRef.current > 1 && scoreRef.current < 30) {
          return prev - 1.5;
        } else if (scoreRef.current > 20 && scoreRef.current < 60) {
          return prev - 1.75;
        } else if (scoreRef.current > 60 && scoreRef.current < 100) {
          return prev - 2;
        } else if (scoreRef.current > 100 && scoreRef.current < 175) {
          return prev - 2.5;
        } else if (scoreRef.current > 175 && scoreRef.current < 250) {
          return prev - 3;
        } else if (scoreRef.current > 250 && scoreRef.current < 350) {
          return prev - 3.25;
        } else if (scoreRef.current > 350 && scoreRef.current < 450) {
          return prev - 3.75;
        } else if (scoreRef.current > 450 && scoreRef.current < 600) {
          return prev - 4;
        } else if (scoreRef.current > 600 && scoreRef.current < 800) {
          return prev - 4.25;
        } else if (scoreRef.current > 800) {
          return prev - 4.5;
        }
        return prev;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    timeRef.current = barTime;
    if (Status === "gameOver") return;
    if (barTime * 2 <= 0) {
      gameOverSound.play().catch((err) => console.log(err));
      SetStatus("gameOver");
    }
  }, [barTime]);

  useEffect(() => {
    sessionStorage.setItem("score", score.toString());
    scoreRef.current = score;
  }, [score]);

  return (
    <>
      {score < 1 && (
        <div className="absolute left-0 top-0 z-[45] flex h-screen w-screen flex-col items-center justify-center gap-5">
          <div className="relative top-[5%] flex gap-8">
            <Image
              priority={true}
              width="120"
              height="100"
              alt="left arrow die"
              src="/left.png"
            />

            <Image
              priority={true}
              width="120"
              height="100"
              alt="right arrow die"
              src="/right.png"
            />
          </div>
          <Image
            priority={true}
            width="50"
            height="100"
            alt="or"
            src="/or.png"
            className="relative top-[10%]"
          />
          <Image
            priority={true}
            width="200"
            height="100"
            alt="click"
            src="/clic.png"
            className="relative top-[15%]"
          />
        </div>
      )}
      <div className="absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center">
        <ScreenBtn callback={handleLeftClick} />
        <ScreenBtn callback={handleRightClick} />
      </div>
      <div className={`${Status === "gameOver" ? "hidden" : ""}`}>
        <TimeBar isFull={isFull} time={barTime} />
      </div>
      <div className={`${Status === "gameOver" ? "hidden" : ""}`}>
        <Counter score={score} />
      </div>
      <PlayerMovement
        playerPosition={playerPosition}
        lastPosition={lastPostion}
        animationStage={animationStage}
        isShifting={isShifting}
      />
      <div className="z-10">
        <Tree treeBlocks={treeBlocks} />
      </div>
    </>
  );
};

export default Game;
