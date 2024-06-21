import { type User as FirebaseUser, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { toast } from 'sonner';
import { create } from 'zustand';

import { auth } from '@/lib/firebase';
import type { User } from '@/lib/types';

export interface AuthStore {
  user: maybe<User>;
  login: () => void;
  logout: () => void;
}

const validateUser = (user: FirebaseUser | null): AuthStore['user'] => {
  if (!user?.email || !user.emailVerified) return null;
  return user as User & { email: string };
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: maybe,
  login: () => {
    set({ user: maybe });
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(({ user }) => {
        const validatedUser = validateUser(user);
        if (isMaybe(validatedUser)) return;
        set({ user: validatedUser });
        if (validatedUser) toast.success(`Welcome, ${validatedUser.displayName ?? validatedUser.email}`);
        else toast.error('Cannot log in with this account');
      })
      .catch(() => {
        set({ user: null });
        toast.error('Failed to sign in');
      });
  },
  logout: () => {
    set({ user: maybe });
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
  const validatedUser = validateUser(user);
  useAuthStore.setState({ user: validatedUser });
});
