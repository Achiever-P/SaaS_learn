"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import NavItems from "./NavItems";
import { Menu, X } from "lucide-react"; // Hamburger and close icons

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="navbar flex items-center justify-between p-4 md:pl-8 md:pr-8 bg-white shadow-md relative">
            {/* Logo with desktop left padding */}
            <Link href="/">
                <div className="flex items-center gap-2.5 cursor-pointer md:pl-14">
                    <Image
                        src="/images/logo.png"
                        alt="logo"
                        width={112}
                        height={95}
                        className="object-contain"
                    />
                </div>
            </Link>

            {/* Desktop Nav with desktop right padding */}
            <div className="hidden md:flex items-center gap-8 md:pr-14">
                <NavItems />
                <SignedOut>
                    <SignInButton>
                        <button className="btn-signin">Sign In</button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center">
                <button
                    onClick={() => setMobileMenuOpen(true)}
                    className="text-gray-700 focus:outline-none"
                >
                    <Menu size={28} />
                </button>
            </div>

            {/* Mobile Side Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-1/2 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out
                ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* Close Button */}
                <div className="flex justify-end p-4">
                    <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-gray-700 focus:outline-none"
                    >
                        <X size={28} />
                    </button>
                </div>

                {/* NavItems in Mobile */}
                <div className="flex flex-col gap-4 px-6">
                    <NavItems
                        mobile
                        onClick={() => setMobileMenuOpen(false)} // close drawer on item click
                    />
                </div>

                {/* Sign In/User button at bottom */}
                <div className="p-6 mt-auto">
                    <SignedOut>
                        <SignInButton>
                            <button className="btn-signin w-full mt-4">
                                Sign In
                            </button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
