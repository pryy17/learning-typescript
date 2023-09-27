import { AppProps } from "next/app";
import "../styles/globals.css";
import { DataProvider } from "./restaurant/template/menuContext";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <DataProvider>
        <Component {...pageProps} />
      </DataProvider>
    </>
  );
};

export default App;
