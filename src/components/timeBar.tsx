import Image from "next/image";
import { FC } from "react";

interface Props {
  time: number;
}

const timeBar: FC<Props> = ({ time }) => {
  return (
    <div className=" absolute top-[5vh] flex h-[15vh] w-screen items-center justify-center">
      <Image
        className="z-40 bg-cover"
        src="/time-container.png"
        alt="time bar container"
        width="225"
        height="40"
      />
      <div className="jusitfy-start absolute z-50 flex w-[200px] object-left">
        <img
          className="min-h-[35px] object-cover object-left"
          src="/time-bar.png"
          alt="time bar container"
          width={time * 2}
          height="0"
        />
      </div>
    </div>
  );
};

export default timeBar;
