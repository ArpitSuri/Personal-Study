import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LoadingState from "./LoadingState";
import Dashboard from "../pages/dashboard/Dashboard";
import Landing from "../pages/landing/Landing";

export default function HomeRoute() {
    const { user, loading } = useContext(AuthContext);
    if (loading) return <LoadingState />;
    return user ? <Dashboard /> : <Landing />;
}