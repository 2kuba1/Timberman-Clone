import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export interface GameStatusContextInterface {
  Status: string;
  SetStatus: Dispatch<SetStateAction<string>>;
}

const defaultState = {
  Status: "idle",
  SetStatus: (setStatus: string) => {},
} as GameStatusContextInterface;

export const GameStatusContext = createContext(defaultState);

type GameStatusProviderProps = {
  children: ReactNode;
};

function GameStatusProvider({ children }: GameStatusProviderProps) {
  const [status, setStatus] = useState<string>(defaultState.Status);

  return (
    <GameStatusContext.Provider
      value={{
        Status: status,
        SetStatus: setStatus,
      }}
    >
      {children}
    </GameStatusContext.Provider>
  );
}

export default GameStatusProvider;
