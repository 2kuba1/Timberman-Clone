import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import GameStatusProvider from "~/contexts/gameStatusContext";
import ClickProvider from "~/contexts/clickContext";
import { CookiesProvider } from "react-cookie";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <CookiesProvider>
      <ClickProvider>
        <GameStatusProvider>
          <Component {...pageProps} />
        </GameStatusProvider>
      </ClickProvider>
    </CookiesProvider>
  );
};

export default api.withTRPC(MyApp);
