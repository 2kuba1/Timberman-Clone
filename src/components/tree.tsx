import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import useDetectKeyPress from "~/hooks/useDetectKeyPress";
import { FC } from "react";

interface Props {
  treeBlocks: string[];
}

const Tree: FC<Props> = ({treeBlocks}) => {

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

export default Tree;