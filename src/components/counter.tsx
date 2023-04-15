import { FC } from "react";

interface Props {
  score: number;
}

const Counter: FC<Props> = ({ score }) => {
  return (
    <div className="absolute z-10 flex h-screen w-screen items-center justify-center text-xl text-white">
      <span>{score}</span>
    </div>
  );
};

export default Counter;
