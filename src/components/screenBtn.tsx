import { FC } from "react";

interface Props {
    callback: () => void;
}

const ScreenBtn: FC<Props> = ({callback}) => {

    return (
        <div onClick={callback} className='w-1/2 h-full'></div>
    )
}

export default ScreenBtn