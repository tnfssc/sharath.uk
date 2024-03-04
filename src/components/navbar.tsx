import { Link, type LinkProps } from '@tanstack/react-router';
import { HomeIcon, User2Icon } from 'lucide-react';

import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const NavMenuItem = ({
  children,
  tooltip,
  linkTo,
}: React.PropsWithChildren<{ tooltip: React.ReactNode; linkTo: LinkProps['to'] }>) => {
  return (
    <NavigationMenuItem>
      <Tooltip>
        <TooltipTrigger>
          <Button asChild variant="ghost" className="transition-transform hover:scale-120 hover:bg-transparent">
            <Link to={linkTo}>{children}</Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    </NavigationMenuItem>
  );
};

export default function NavBar() {
  return (
    <div className="absolute z-10 m-2 mt-[calc(100vh-74px)] h-fit w-fit border border-foreground rounded-full bg-background">
      <NavigationMenu className="m-2 mx-5">
        <NavigationMenuList>
          <NavMenuItem tooltip="Home" linkTo="/">
            <HomeIcon size={20} />
          </NavMenuItem>
          <NavMenuItem tooltip="Profile" linkTo="/about">
            <User2Icon size={20} />
          </NavMenuItem>
          <NavigationMenuItem>
            <ModeToggle className="transition-transform hover:scale-120 hover:bg-transparent" />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
