import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export interface PlayerContextInterface {
  Player: Player;
  SetPlayer: Dispatch<SetStateAction<Player>>;
}

const defaultState = {
  Player: {
    id: "",
    username: "",
    score: 0,
  },
  SetPlayer: (setPlayer: Player) => {},
} as PlayerContextInterface;

export const PlayerContext = createContext(defaultState);

type PlayerProviderProps = {
  children: ReactNode;
};

function UserProvider({ children }: PlayerProviderProps) {
  const [player, setPlayer] = useState<Player>(defaultState.Player);

  return (
    <PlayerContext.Provider
      value={{
        Player: player,
        SetPlayer: setPlayer,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export default UserProvider;
