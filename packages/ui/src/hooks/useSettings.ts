import { atom, useAtom } from 'jotai';

const meteorsAtom = atom(true);
const gradientAtom = atom(true);

export const useSettings = () => {
  const [meteors, setMeteors] = useAtom(meteorsAtom);
  const [gradient, setGradient] = useAtom(gradientAtom);

  return {
    meteors,
    setMeteors: (value: boolean) => {
      setMeteors(value);
    },
    gradient,
    setGradient: (value: boolean) => {
      setGradient(value);
    },
  };
};
