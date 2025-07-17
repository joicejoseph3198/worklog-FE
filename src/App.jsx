import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import "./App.css";
import { DailyWorkLogSpread } from "./pages/DailyWorkLogSpread";
import { AxiosProvider } from "./util/useAxios";
import { CalenderSpread } from "./pages/CalenderSpread";
import { Header } from "./components/Header";

function App() {
  return (
    <>
      <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <AxiosProvider>
            <Header/>
            <DailyWorkLogSpread />
          </AxiosProvider>
        </SignedIn>
      </header>
    </>
  );
}

export default App;
