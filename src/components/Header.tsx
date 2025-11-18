import { Bell, Home, Info, LogIn, LogOut, Phone, Search, TrendingUp } from 'lucide-react';
import logo from '../assets/logo.png'
import { NavButton } from './NavButton';
import React from "react";

export function Header() {
    const [currentPage, setCurrentPage] = React.useState("home");

    const navItems = [
        {id: 'home', label: 'Home', icon: Home},
        {id: 'search', label: 'Search', icon: Search},
        {id: 'alerts', label: 'Alerts', icon: Bell, protected: true},
        {id: 'market', label: 'Market Intelligence', icon: TrendingUp},
        {id: 'contact', label: 'Contact', icon: Phone},
    ];

    const SignInItem =  {id: 'login',  label: 'Login', icon: LogIn}
    const AboutItem = {id: 'about', label: 'About', icon: Info}

    const handleNavigate = (page: string) => {
        setCurrentPage(page);
        console.log("Navigate to: ", page);
    };

    return (
        <div className="flex flex-col bg-grey">
            <header className="sticky top-0 z-50 h-[80px] bg-white shadow-sm">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                        <img src={logo} alt="Logo" className="h-12 w-auto" />
                        </div>

                        <nav className="hidden md:flex items-center gap-2">
                            {navItems.map((item) => (
                                <NavButton
                                    key={item.id}
                                    id={item.id}
                                    label={item.label}
                                    icon={item.icon}
                                    active={currentPage == item.id}
                                    onClick={handleNavigate}
                                    />
                                )
                            )}
                        </nav>
                
                
                <div className="flex flex-row mt-1">
                <NavButton key={AboutItem.id} id={AboutItem.id} label={AboutItem.label}/>
                <div className="m-2"></div>
                <NavButton key={SignInItem.id} id={SignInItem.id} label={SignInItem.label} icon={SignInItem.icon} active={true}/>
                </div>
            </div>
    
            </div>

        </header>
        </div>
    )
} 

export default Header;