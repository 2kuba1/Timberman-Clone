import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export interface ClickContextInterface {
  IsClicked: boolean;
  SetIsClicked: Dispatch<SetStateAction<boolean>>;
}

const defaultState = {
  IsClicked: false,
  SetIsClicked: (setIsClicked: boolean) => {},
} as ClickContextInterface;

export const ClickContext = createContext(defaultState);

type ClickProviderProps = {
  children: ReactNode;
};

function ClickProvider({ children }: ClickProviderProps) {
  const [clicked, isClicked] = useState(defaultState.IsClicked);

  return (
    <ClickContext.Provider
      value={{
        IsClicked: clicked,
        SetIsClicked: isClicked,
      }}
    >
      {children}
    </ClickContext.Provider>
  );
}

export default ClickProvider;
