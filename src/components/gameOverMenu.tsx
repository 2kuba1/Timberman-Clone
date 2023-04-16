import Image from "next/image";
import { useContext } from "react";
import { GameStatusContext } from "~/contexts/gameStatusContext";

const GameOverMenu = () => {
  const { SetStatus } = useContext(GameStatusContext);

  return (
    <div className="absolute z-[60] items-center justify-between flex h-full w-full flex-col backdrop-blur-sm">
      <div className='absolute flex justify-center top-[38vh] text-2xl'>
        <h2>{sessionStorage.getItem('score')}</h2>
      </div>
      <Image 
      src='/gameover.png'
      width={300}
      height={300}
      alt='gameover scoreboard'
      />

      <Image
      src='/play.png'
      width={150}
      height={150}
      alt='play button'
      onClick={() => SetStatus('playing')}
      />

      <Image
      src='/rip.png'
      width={150}
      height={150}
      alt='rip'
      className='relative bottom-5'
      />
      
    </div>
  );
};

export default GameOverMenu;
