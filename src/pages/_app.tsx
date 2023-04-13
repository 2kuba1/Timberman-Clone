import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import PlayerProvider from "~/contexts/playerContext";
import GameStatusProvider from "~/contexts/gameStatusContext";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <GameStatusProvider>
      <PlayerProvider>
        <Component {...pageProps} />
      </PlayerProvider>
    </GameStatusProvider>
  );
};

export default api.withTRPC(MyApp);
