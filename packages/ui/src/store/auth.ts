import { GoogleAuthProvider, type User, signInWithPopup } from 'firebase/auth';
import { toast } from 'sonner';
import { create } from 'zustand';

import { auth } from '@/lib/firebase';

export interface AuthStore {
  user: User | null | undefined;
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: undefined as User | null | undefined,
  login: () => {
    set({ user: undefined });
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(({ user }) => {
        set({ user });
        toast.success(`Welcome, ${user.displayName ?? user.email ?? 'User'}`);
      })
      .catch(() => {
        set({ user: null });
        toast.error('Failed to sign in');
      });
  },
  logout: () => {
    set({ user: undefined });
    auth
      .signOut()
      .then(() => {
        set({ user: null });
        toast.success('Signed out');
      })
      .catch(() => {
        toast.error('Failed to sign out');
      });
  },
}));

auth.onAuthStateChanged((user) => {
  useAuthStore.setState({ user });
});
