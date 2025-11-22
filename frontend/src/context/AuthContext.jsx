import { createContext, useState, useEffect } from "react";
import { fetchMe } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadUser = async () => {
        try {
            const { data } = await fetchMe();
            setUser(data.user);
            applyTheme(data.user.theme);
        } catch {
            setUser(null);
            applyTheme("light");
        } finally {
            setLoading(false);
        }
    };

    const applyTheme = (theme) => {
        const root = document.documentElement;
        if (theme === "dark") root.classList.add("dark");
        else root.classList.remove("dark");
    };

    useEffect(() => {
        if (localStorage.getItem("token")) loadUser();
        else {
            setLoading(false);
            applyTheme("light");
        }
    }, []);

    const login = (token, userData) => {
        localStorage.setItem("token", token);
        setUser(userData);
        applyTheme(userData.theme);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        applyTheme("light");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
