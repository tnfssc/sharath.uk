import { Link } from '@tanstack/react-router';

import { ModeToggle } from '@/components/mode-toggle';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

export default function NavBar() {
  return (
    <div className="absolute z-10 m-2 h-fit w-fit border border-foreground rounded-full bg-background">
      <NavigationMenu className="m-2 mx-5">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/" className={navigationMenuTriggerStyle()}>
              Home
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/about" className={navigationMenuTriggerStyle()}>
              About
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <ModeToggle />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
