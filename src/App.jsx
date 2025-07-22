import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import "./App.css";
import { AxiosProvider } from "./util/useAxios";
import { router } from "./util/router";
import { RouterProvider } from "react-router";
import { AnimatePresence } from "motion/react";
import PopupBanner from "./components/PopUpBanner";
import { useEffect, useState } from "react";

function App() {

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsSmallScreen(window.innerWidth < 1200); // Tailwind's 'md'
    };

    checkSize();
    window.addEventListener('resize', checkSize);

    return () => window.removeEventListener('resize', checkSize);
  }, []);
  if (isSmallScreen) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-[#ff6400] text-white text-center p-4 z-50 shadow-md">
        <p className="text-3xl sm:text-4xl font-[NeueBit] p-2">
          We're working on bringing the best experience to smaller screens. Till then, please use a bigger screen. Thank you for trusting worklog(s).
        </p>
      </div>
    )
  }
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
