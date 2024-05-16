import { Link, type LinkProps } from '@tanstack/react-router';
import {
  CircleEllipsisIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  PenToolIcon,
  RotateCcwIcon,
  ShoppingCartIcon,
  User2Icon,
  YoutubeIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth';

const NavMenuItem = ({
  children,
  tooltip,
  linkTo,
}: React.PropsWithChildren<{ tooltip: React.ReactNode; linkTo: LinkProps['to'] }>) => {
  return (
    <NavigationMenuItem>
      <Tooltip>
        <TooltipTrigger>
          <Button
            asChild
            variant="ghost"
            className={cn('transition-transform hover:scale-120 hover:bg-transparent', {})}
          >
            <Link to={linkTo}>{children}</Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    </NavigationMenuItem>
  );
};

const SignInItem = () => {
  const { login, logout, user } = useAuthStore();
  return (
    <NavigationMenuItem>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className={cn('transition-transform hover:scale-120 hover:bg-transparent', {})}
            disabled={user === undefined}
            onClick={user === null ? login : logout}
          >
            {user === undefined && <CircleEllipsisIcon size={20} className="animate-bounce" />}
            {user === null && <LogInIcon size={20} />}
            {user && <LogOutIcon size={20} />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {user === undefined && 'Loading...'}
          {user === null && 'Sign in'}
          {user && 'Sign out'}
        </TooltipContent>
      </Tooltip>
    </NavigationMenuItem>
  );
};

const ToolsMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <NavigationMenuItem>
          <Tooltip>
            <TooltipTrigger>
              <Button
                asChild
                variant="ghost"
                className={cn('transition-transform hover:scale-120 hover:bg-transparent text-foreground', {})}
              >
                <Link>
                  <PenToolIcon size={20} />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Tools</TooltipContent>
          </Tooltip>
        </NavigationMenuItem>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="z-1000 w-56">
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link to="/youtube-summarizer">
            <YoutubeIcon size={20} />
            &nbsp;&nbsp;Youtube summarizer
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link to="/shortener">
            <ShoppingCartIcon size={20} />
            &nbsp;&nbsp;URL shortener
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default function NavBar() {
  return (
    <div className="absolute z-1000 m-2 mt-[calc(100vh-74px)] h-fit w-fit border border-foreground rounded-full bg-background">
      <NavigationMenu className="m-2 mx-5">
        <NavigationMenuList>
          <NavMenuItem tooltip="Home" linkTo="/">
            <HomeIcon size={20} />
          </NavMenuItem>
          <NavMenuItem tooltip="Profile" linkTo="/about">
            <User2Icon size={20} />
          </NavMenuItem>
          <ToolsMenu />
          <NavMenuItem tooltip="Previous versions" linkTo="/prev-sites">
            <RotateCcwIcon size={20} />
          </NavMenuItem>
          <SignInItem />
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
