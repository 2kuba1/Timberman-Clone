import { FC } from "react";

interface Props {
  score: number;
}

const Counter: FC<Props> = ({ score }) => {
  return (
    <div className="drop-shadow-[0_3.2px_1px_rgba(0,0,0,0.8)] shadow-black absolute z-10 flex h-screen w-screen items-center justify-center text-xl text-white">
      <span>{score}</span>
    </div>
  );
};

export default Counter;
