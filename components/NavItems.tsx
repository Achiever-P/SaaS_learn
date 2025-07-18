"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Companions', href: '/companions' },
    { label: 'My Journey', href: '/my-journey' }, // Fixed missing slash
];

interface NavItemsProps {
    mobile?: boolean; // optional prop to switch layout
    onClick?: () => void; // close drawer on click (for mobile)
}

const NavItems = ({ mobile = false, onClick }: NavItemsProps) => {
    const pathname = usePathname();

    return (
        <>
            {mobile ? (
                // MOBILE: Vertical List
                <ul className="flex flex-col gap-2 text-lg">
                    {navItems.map(({ label, href }) => (
                        <li key={label}>
                            <Link
                                href={href}
                                onClick={onClick} // close mobile drawer on click
                                className={cn(
                                    "block py-2 rounded hover:bg-gray-100 transition-colors",
                                    pathname === href && "text-primary font-semibold"
                                )}
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                // DESKTOP: Inline Horizontal
                <nav className="flex items-center gap-4">
                    {navItems.map(({ label, href }) => (
                        <Link
                            href={href}
                            key={label}
                            className={cn(
                                "hover:text-primary transition-colors",
                                pathname === href && "text-primary font-semibold"
                            )}
                        >
                            {label}
                        </Link>
                    ))}
                </nav>
            )}
        </>
    );
};

export default NavItems;
