import PlayerMovement from "./playerMovement";
import Tree from "./tree";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { ClickContext } from "~/contexts/clickContext";
import { GameStatusContext } from "~/contexts/gameStatusContext";
import useDetectKeyPress from "~/hooks/useDetectKeyPress";

const Game = () => {
  const [playerPosition, setPlayerPosition] = useState(0); // 0 = standing, 1 =  left, 2  = right
  const [lastPostion, setLastPostion] = useState("justify-start");
  const [animationStage, setAnimationStage] = useState(0);
  const [treeBlocks, setTreeBlocks] = useState<string[]>([]);
  const { Status, SetStatus } = useContext(GameStatusContext);
  const { IsClicked, SetIsClicked } = useContext(ClickContext);

  const cutSound = new Audio("/cut.mp3");

  const playCutSound = () => {
    cutSound.currentTime = 0;
    cutSound.play();
  };

  useEffect(() => {
    if (
      (treeBlocks[treeBlocks.length - 1] === "/branch1.png" &&
        playerPosition === 1) ||
      (treeBlocks[treeBlocks.length - 1] === "/branch2.png" &&
        playerPosition === 2)
    ) {
      const gameOverSound = new Audio("/death.mp3");
      gameOverSound.play();
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
      let lastLog = arr[0];
      arr.unshift(newLog(lastLog as string));
      arr.pop();
      return arr;
    });
  };

  useDetectKeyPress("ArrowLeft", async () => {
    playCutSound();
    setPlayerPosition(1);
    setLastPostion("justify-start");
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
  });
  useDetectKeyPress("ArrowRight", async () => {
    playCutSound();
    setPlayerPosition(2);
    setLastPostion("justify-end");
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
  });

  useEffect(() => {
    const arr = [];
    let lastLog = "/trunk1.png";
    for (let i = 0; i < 8; i++) {
      const log = newLog(lastLog);
      console.log(log);
      arr.push(log);
      lastLog = log;
    }
    arr.push('/trunk1.png')

    setTreeBlocks(arr);
  }, []);

  return (
    <>
      <PlayerMovement
        playerPosition={playerPosition}
        lastPosition={lastPostion}
        animationStage={animationStage}
      />
      <Tree treeBlocks={treeBlocks} />
    </>
  );
};

export default Game;
