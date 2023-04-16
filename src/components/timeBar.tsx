import Image from "next/image";
import { FC } from "react";

interface Props {
    time: number;
}

const timeBar: FC<Props> = ({time}) => {
  return (
    <div className=" absolute top-[5vh] flex h-[15vh] w-screen items-center justify-center">
      <Image
        className="z-40 bg-cover"
        src="/time-container.png"
        alt="time bar container"
        width="225"
        height="40"
      />
      <div className='z-50 object-left absolute flex jusitfy-start w-[200px]'>
      <img
        className="object-cover object-left min-h-[35px]"
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
