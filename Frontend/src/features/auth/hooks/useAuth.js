import { login, register, getMe, logout } from "../services/auth.api";
import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { useEffect } from "react";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  async function handleRegister(name, email, password) {
    setLoading(true);
    try {
      const data = await register(name, email, password);
      setUser(data.user);
      return data;
    } catch (err) {
      console.error("Register failed:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(email, password) {
    setLoading(true);
    try {
      const data = await login(email, password);
      setUser(data.user);
      return data;
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function handleGetMe() {
    setLoading(true);
    try {
      const data = await getMe();
      setUser(data.user);
      return data;
    } catch (err) {
      console.error("Get user failed:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    setLoading(true);
    try {
      await logout();
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    handleGetMe();
  }, []);

  return { user, loading, handleRegister, handleLogin, handleGetMe, handleLogout };
};