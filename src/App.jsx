import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import "./App.css";
import { AxiosProvider } from "./util/useAxios";
import { router } from "./util/router";
import { RouterProvider } from "react-router";
import { AnimatePresence } from "motion/react";
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
      <div className="flex items-center justify-center h-screen w-screen bg-[var(--worklog-dark-bg)] text-center p-4 z-50">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-[NeueBit] text-[var(--worklog-brand-green)] mb-6">
            worklog(s).
          </h1>
          <p className="text-lg sm:text-xl text-[var(--worklog-text-light)] font-semibold leading-relaxed">
            We're working on bringing the best experience to smaller screens. Till then, please use a bigger screen. Thank you for trusting worklog(s).
          </p>
        </div>
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
