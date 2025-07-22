import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import "./App.css";
import { AxiosProvider } from "./util/useAxios";
import { router } from "./util/router";
import { RouterProvider } from "react-router";
import { AnimatePresence } from "motion/react";

function App() {
  return (
    <>
      {/* App should be accessible regardless of sign-in */}
      <AnimatePresence mode="wait">
        <AxiosProvider>
          <RouterProvider router={router} />
        </AxiosProvider>
      </AnimatePresence>
    </>
  );
}

export default App;
