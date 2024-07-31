import { SiYoutube } from '@icons-pack/react-simple-icons';
import { Link, type LinkProps } from '@tanstack/react-router';
import {
  ChevronsUpIcon,
  CircleEllipsisIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  MessageCircleIcon,
  MessageSquareIcon,
  MoreHorizontalIcon,
  RotateCcwIcon,
  ShoppingCartIcon,
  UploadIcon,
  User2Icon,
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
import { isPrivateUser } from '@/lib/private';
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
            <Link to={linkTo} aria-label="linkTo">
              {children}
            </Link>
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
            aria-label={user ? 'Logout' : 'Login'}
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

const MoreMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <NavigationMenuItem>
          <Tooltip>
            <TooltipTrigger>
              <Button
                aria-label="Tools"
                asChild
                variant="ghost"
                className={cn('transition-transform hover:scale-120 hover:bg-transparent text-foreground', {})}
              >
                <Link aria-label="Tools">
                  <MenuIcon size={20} />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>More</TooltipContent>
          </Tooltip>
        </NavigationMenuItem>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="z-1000 w-56">
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link to="/youtube-summarizer" className="flex items-center">
            <SiYoutube size={20} />
            &nbsp;&nbsp;Youtube summarizer
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link to="/shortener" className="flex items-center">
            <ShoppingCartIcon size={20} />
            &nbsp;&nbsp;URL shortener
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link to="/ask" className="flex items-center">
            <MessageSquareIcon size={20} />
            &nbsp;&nbsp;Ask
          </Link>
        </DropdownMenuItem>
        {isPrivateUser() && (
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link to="/upload-cdn" className="flex items-center">
              <UploadIcon size={20} />
              &nbsp;&nbsp;Upload thing
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem asChild className="cursor-pointer">
          <Link to="/dxup" className="flex items-center">
            <ChevronsUpIcon size={20} />
            &nbsp;&nbsp;dxup
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link to="/self-hosted" className="flex items-center">
            <MoreHorizontalIcon size={20} />
            &nbsp;&nbsp;Self hosted
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link to="/prev-sites" className="flex items-center">
            <RotateCcwIcon size={20} />
            &nbsp;&nbsp;Previous sites
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
          <MoreMenu />
          <NavigationMenuItem>
            <Tooltip>
              <TooltipTrigger>
                <Button asChild variant="ghost" className="transition-transform hover:scale-120 hover:bg-transparent">
                  <a href="https://blog.sharath.uk" aria-label="linkTo">
                    <MessageCircleIcon size={20} />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Blog</TooltipContent>
            </Tooltip>
          </NavigationMenuItem>
          <SignInItem />
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
