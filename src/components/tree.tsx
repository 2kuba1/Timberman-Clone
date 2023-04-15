import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import useDetectKeyPress from "~/hooks/useDetectKeyPress";

const tree = () => {
  const [treeBlocks, setTreeBlocks] = useState<string[]>([]);
  
  const newLog = (lastLog: string) => {
    let src = "";
    if(lastLog === '/branch1.png' || lastLog === '/branch2.png') {
      return  '/trunk1.png';
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

  useEffect(() => {
    const arr = ['/trunk1.png'];
    let lastLog = '/trunk1.png';
    for (let i = 0; i < 8; i++) {
        const log = newLog(lastLog);
        console.log(log);
        arr.push(log);
        lastLog = log;
      }

    setTreeBlocks(arr);
  }, []);

  useDetectKeyPress('ArrowLeft', () => {
    setTreeBlocks((prev) => {
      const arr = [...prev];
      let lastLog = arr[0];
      arr.unshift(newLog(lastLog as string));
      arr.pop();
      return arr;
    });
  });

  useDetectKeyPress('ArrowRight', () => {
    setTreeBlocks((prev) => {
      const arr = [...prev];
      let lastLog = arr[0];
      arr.unshift(newLog(lastLog as string));
      arr.pop();
      return arr;
    });
  });

  return (
    <div className="absolute left-1/2 top-[45%] flex h-screen w-screen -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-end">
      {treeBlocks.map((block, index) => (
        <div className="flex">
          <Image
            src={block as string}
            key={index}
            alt="tree trunk"
            width="350"
            height="200"
            className="m-0"
          />
        </div>
      ))}
      <Image
        className="relative left-[2px] m-0"
        src="/stump.png"
        alt="tree trunk"
        width="135"
        height="200"
      />
    </div>
  );
};

export default tree;
