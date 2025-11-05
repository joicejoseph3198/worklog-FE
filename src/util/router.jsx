
import { LandingPage } from "../pages/LandingPage";
import { DailyWorkLogSpread } from "../pages/DailyWorkLogSpread";
import { CalenderSpread } from "../pages/CalenderSpread";
import { BragDocumentSpread } from "../pages/BragDocumentSpread";
import { GuidelinesPage } from "../pages/brag-document/GuidelinesPage";
import { SummaryPage } from "../pages/brag-document/SummaryPage";
import { FormPage } from "../pages/brag-document/FormPage";
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
    {
        path: "/brag-document",
        element: (
            <ProtectedRoute>
                <BragDocumentSpread />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <FormPage />
            },
            {
                path: "guidelines",
                element: <GuidelinesPage />
            },
            {
                path: "summary",
                element: <SummaryPage />
            },
            {
                path: "form",
                element: <FormPage />
            },
            {
            	path: "form/:year?/:month?",
            	element: <FormPage />
            }
        ]
    },
]);