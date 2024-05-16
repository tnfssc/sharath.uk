export const useCopy = (window = globalThis) => {
  return (text: string) => void window.navigator.clipboard.writeText(text);
};
