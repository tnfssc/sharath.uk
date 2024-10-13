import { Toaster as Sonner } from "sonner";
import { useTheme } from "@/lib/hooks/theme";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps): React.JSX.Element => {
  const theme = useTheme();

  return (
    <Sonner
      richColors
      theme={theme.value}
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className="toaster group"
      toastOptions={{
        classNames: {
          description: "group-[.toast]:text-muted-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
