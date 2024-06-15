import { type User as FirebaseUser, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { toast } from 'sonner';
import { create } from 'zustand';

import { auth } from '@/lib/firebase';
import type { User } from '@/lib/types';

export interface AuthStore {
  user: User | null | undefined;
  login: () => void;
  logout: () => void;
}

const validateUser = (user: FirebaseUser | null): AuthStore['user'] => {
  if (!user?.email || !user.emailVerified) return null;
  return user as User & { email: string };
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: undefined as AuthStore['user'],
  login: () => {
    set({ user: undefined });
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(({ user }) => {
        const validatedUser = validateUser(user);
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
  const validatedUser = validateUser(user);
  useAuthStore.setState({ user: validatedUser });
});
