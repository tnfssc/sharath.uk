import { useAuthStore } from '@/store/auth';

const ALLOWED_USER_EMAILS = ['tnfssc@gmail.com'];

export const isPrivateUser = (user = useAuthStore.getState().user): boolean => {
  if (user === undefined) return false;
  if (user === null) return false;
  return ALLOWED_USER_EMAILS.includes(user.email);
};
