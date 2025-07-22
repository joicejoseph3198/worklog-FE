// components/ProtectedRoute.tsx
import { useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router';


export const ProtectedRoute = ({ children }) => {
    const { isSignedIn, isLoaded } = useUser();

    if (!isLoaded) return null; 

    return isSignedIn ? <>{children}</> : <Navigate to="/" replace />;
};