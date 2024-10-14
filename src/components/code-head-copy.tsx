import { useState, useEffect, useCallback } from "react";

export const CodeHeadCopy: React.FC<{ copiedIcon?: React.ReactNode } & React.HTMLAttributes<HTMLButtonElement>> = ({
  children,
  copiedIcon = children,
  ...props
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (copied) {
        setCopied(false);
      }
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [copied]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const codeBlock = e.currentTarget.parentElement?.parentElement?.nextElementSibling?.querySelector("code");
    if (codeBlock?.textContent) {
      const text = codeBlock.textContent;
      void navigator.clipboard.writeText(text);
      setCopied(true);
    }
  }, []);

  return (
    <button onMouseDown={handleClick} {...props} title="Copy to clipboard">
      {copied ? copiedIcon : children}
    </button>
  );
};
