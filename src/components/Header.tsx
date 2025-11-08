import { Home, Search, Bell, User, TrendingUp, Phone, Info, LogOut, LogIn } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from './auth/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Badge } from './ui/badge';
import logo from 'figma:asset/55884272967fe3cb59d3128fbabfcbcc8816396e.png';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const { user, signOut } = useAuth();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'alerts', label: 'Alerts', icon: Bell, protected: true },
    { id: 'market', label: 'Market Intelligence', icon: TrendingUp },
    { id: 'contact', label: 'Contact', icon: Phone },
    { id: 'about', label: 'About', icon: Info },
  ];

  const handleSignOut = async () => {
    await signOut();
    onNavigate('home');
  };

  const getUserTypeLabel = (userType?: string) => {
    switch (userType) {
      case 'tenant':
        return 'Tenant';
      case 'landlord':
        return 'Landlord';
      case 'buyer':
        return 'Buyer';
      default:
        return 'User';
    }
  };

  return (
    <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="cursor-pointer" onClick={() => onNavigate('home')}>
            <img src={logo} alt="Logo" className="h-12 w-auto" />
          </div>
          
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? 'default' : 'ghost'}
                  onClick={() => onNavigate(item.id)}
                  className="gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">{user.name || user.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col gap-1">
                      <span>{user.name || 'My Account'}</span>
                      <span className="text-xs text-gray-500">{user.email}</span>
                      {user.userType && (
                        <Badge className="w-fit mt-1" variant="outline">
                          {getUserTypeLabel(user.userType)}
                        </Badge>
                      )}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onNavigate('profile')}>
                    <User className="h-4 w-4 mr-2" />
                    Profile & Preferences
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onNavigate('alerts')}>
                    <Bell className="h-4 w-4 mr-2" />
                    Smart Alerts
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" onClick={() => onNavigate('login')} className="gap-2">
                  <LogIn className="h-4 w-4" />
                  <span className="hidden sm:inline">Sign In</span>
                </Button>
                <Button onClick={() => onNavigate('signup')} className="gap-2">
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
