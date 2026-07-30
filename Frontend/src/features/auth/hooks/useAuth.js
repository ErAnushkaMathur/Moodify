import {login, register, getMe  , logout} from "../services/auth.api";
import { useContext } from "react";
import { AuthContext } from "../auth.context";


export const useAuth = () => {
    const context = useContext(AuthContext);
    const {user, setUser , loading, setLoading} =  context

    async function handleRegister(name, email, username, password) {
        setLoading(true);
        const data = await  register(email, username, password);
        setUser(data.user);
        setLoading(false);
    }

    async function handleLogin(email, username, password) {
        setLoading(true);
        const data = await login(email, username, password);
        setUser(data.user);
        setLoading(false);
    }

    async function handleGetMe() {
        setLoading(true);
        const data = await login();
        setUser(data.user);
        setLoading(false);
    }

    async function handleLogout() {
        setLoading(true);
        await logout();
        setUser(null);
        setLoading(false);
    }
    return { user, loading, handleRegister, handleLogin, handleGetMe, handleLogout }}