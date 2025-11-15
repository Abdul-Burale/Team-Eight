import React from 'react';

interface NavButtonProps {
    id: string;
    label: string;
    icon?: React.ElementType;
    active?: boolean;
    onClick?: (id: string) => void;
}

export const NavButton : React.FC<NavButtonProps> = ({
    id,
    label,
    icon: Icon,
    active,
    onClick,
}) => {
    return (
        <button onClick={() => onClick?.(id)}
        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors
            ${active ? "bg-gray-950 text-white" : "text-gray-700 hover:bg-gray-100"}`}>
            {Icon && <Icon className="w-4 h-4" />}
            <span>{label}</span>
            </button>
    );
};