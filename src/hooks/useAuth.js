import { useNavigate } from 'react-router-dom';
import create from 'zustand';
import { useLocalStorage } from './useLocalStorage';
import { supabase } from '../services/utils/supabaseClient';
import { triggerToast } from '../utils/triggerToast';

export const useAuth = () => {
  const navigate = useNavigate();
  const [userStorage, setUserStorage] = useLocalStorage('user', null);
  const createUserStore = create((set) => ({ user: userStorage }));
  const userStore = createUserStore();
  const login = async (data) => {
    try {
      const { user, session, error } = await supabase.auth.signIn({
        email: data.email,
        password: data.password,
      });
      if (error) throw error;
      setUserStorage(user);
      navigate('../dashboard');
      return user;
    } catch (err) {
      triggerToast('error', 'Email ou senha inválidos!');
      return err.message;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUserStorage(null);
    navigate('/', { replace: true });
  };

  return {
    login,
    logout,
    user: userStorage,
    userStore,
  };
};
