
import { LandingPage } from "../pages/LandingPage";
import { DailyWorkLogSpread } from "../pages/DailyWorkLogSpread";
import { CalenderSpread } from "../pages/CalenderSpread";
import { ProtectedRoute } from "./ProtectedRoute";
import { createBrowserRouter } from "react-router";
import { Transition } from "./Transition";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "/:dateParam?",
        element: (
            <Transition>
            <ProtectedRoute>
                <DailyWorkLogSpread />
            </ProtectedRoute>
            </Transition>
        ),
    },
    {
        path: "/calender",
        element: (
            <ProtectedRoute>
                <CalenderSpread />
            </ProtectedRoute>
        ),
    },
]);