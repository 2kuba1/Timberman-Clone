import { FC } from "react";

interface Props {
    score: number;
}

const Counter: FC<Props> = ({score}) => {
    return (
        <div className='flex h-screen w-screen items-center justify-center text-xl absolute text-white z-10'>
            <span>{score}</span>
        </div>
    )
}

export default Counter;