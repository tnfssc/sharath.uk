import { atom, useAtom } from 'jotai';

const meteorsAtom = atom(localStorage.getItem('meteors') !== 'false');
const gradientAtom = atom(localStorage.getItem('gradient') !== 'false');

export const useSettings = () => {
  const [meteors, setMeteors] = useAtom(meteorsAtom);
  const [gradient, setGradient] = useAtom(gradientAtom);

  return {
    meteors,
    setMeteors: (value: boolean) => {
      localStorage.setItem('meteors', value.toString());
      setMeteors(value);
    },
    gradient,
    setGradient: (value: boolean) => {
      localStorage.setItem('gradient', value.toString());
      setGradient(value);
    },
  };
};
