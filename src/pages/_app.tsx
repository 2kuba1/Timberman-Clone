import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import GameStatusProvider from "~/contexts/gameStatusContext";
import ClickProvider from "~/contexts/clickContext";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClickProvider>
      <GameStatusProvider>
        <Component {...pageProps} />
      </GameStatusProvider>
    </ClickProvider>
  );
};

export default api.withTRPC(MyApp);
