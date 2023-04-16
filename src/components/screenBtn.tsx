import { FC } from "react";

interface Props {
  callback: () => void;
}

const ScreenBtn: FC<Props> = ({ callback }) => {
  return <div onClick={callback} className="h-full w-1/2"></div>;
};

export default ScreenBtn;
