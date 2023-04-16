import PlayerMovement from "./playerMovement";
import Tree from "./tree";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { ClickContext } from "~/contexts/clickContext";
import { GameStatusContext } from "~/contexts/gameStatusContext";
import useDetectKeyPress from "~/hooks/useDetectKeyPress";
import Counter from "./counter";
import TimeBar from "./timeBar";
import GameOverMenu from "./gameOverMenu";
import { check } from "prettier";

const Game = () => {
  const [playerPosition, setPlayerPosition] = useState(0); // 0 = standing, 1 =  left, 2  = right
  const [lastPostion, setLastPostion] = useState("justify-start");
  const [animationStage, setAnimationStage] = useState(0);
  const [treeBlocks, setTreeBlocks] = useState<string[]>([]);
  const [isShifting, setIsShifting] = useState(false);
  const [barTime, setBarTime] = useState(100);
  const [score, setScore] = useState(0);

  const { Status, SetStatus } = useContext(GameStatusContext);
  const { IsClicked, SetIsClicked } = useContext(ClickContext);

  const gameOverSound = new Audio("/death.mp3");
  const cutSound = new Audio("/cut.mp3");

  const playCutSound = async () => {
    cutSound.currentTime = 0;
    await cutSound.play();
  };

  useEffect(() => {
    console.log(Status);
  }, [Status]);

  useEffect(() => {
    if (
      (treeBlocks[treeBlocks.length - 1] === "/branch1.png" &&
        playerPosition === 1) ||
      (treeBlocks[treeBlocks.length - 1] === "/branch2.png" &&
        playerPosition === 2)
    ) {
      setScore((prev) => prev - 1);
      //await gameOverSound.play();
      SetStatus("gameOver");
    }
  }, [IsClicked]);

  const newLog = (lastLog: string) => {
    let src = "";
    if (lastLog === "/branch1.png" || lastLog === "/branch2.png") {
      return "/trunk1.png";
    }
    if (Math.random() * 4 <= 1) {
      src = Math.random() > 0.5 ? "/trunk1.png" : "/trunk2.png";
    } else {
      if (Math.random() > 0.5) {
        src = "/branch1.png";
      } else {
        src = "/branch2.png";
      }
    }
    return src;
  };

  const addLog = () => {
    SetIsClicked(true);
    setTreeBlocks((prev) => {
      const arr = [...prev];
      const lastLog = arr[0];
      arr.unshift(newLog(lastLog as string));
      arr.pop();
      return arr;
    });
  };

  useDetectKeyPress("ArrowLeft", () => {
    setScore((prev) => prev + 1);
    //playCutSound();
    setPlayerPosition(1);
    setLastPostion("justify-start");
    setTimeout(() => {
      if (barTime < 200) {
        setBarTime((prev) => prev + 1);
      }
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
  });

  useDetectKeyPress("ArrowRight", () => {
    setScore((prev) => prev + 1);
    //playCutSound();
    setPlayerPosition(2);
    setLastPostion("justify-end");
    setTimeout(() => {
      if (barTime < 200) {
        setBarTime((prev) => prev + 2);
      }
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
  });

  useEffect(() => {
    const arr = [];
    let prevLog = "/trunk1.png";
    for (let i = 0; i < 8; i++) {
      const log = newLog(prevLog);
      arr.push(log);
      prevLog = log;
    }

    setTreeBlocks([...arr, "/trunk1.png"]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsShifting((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBarTime((prev) => prev - 0.8);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (Status === "gameOver") return;
    if (barTime * 2 <= 0) {
      //gameOverSound.play();
      SetStatus("gameOver");
    }
  }, [barTime]);

  return (
    <>
      {Status === "gameOver" && <GameOverMenu />}
      <div className={`${Status === "gameOver" ? "hidden" : ""}`}>
        <TimeBar time={barTime} />
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
