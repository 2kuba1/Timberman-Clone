import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import PlayerProvider from "~/contexts/playerContext";
import GameStatusProvider from "~/contexts/gameStatusContext";
import ClickProvider from "~/contexts/clickContext";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClickProvider>
      <GameStatusProvider>
        <PlayerProvider>
          <Component {...pageProps} />
        </PlayerProvider>
      </GameStatusProvider>
    </ClickProvider>
  );
};

export default api.withTRPC(MyApp);
