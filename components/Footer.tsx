import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-3">About Yope</h2>
          <p className="text-base leading-6">
  Yope is your AI-powered learning buddy 🎓✨. Dive into personalized, interactive lessons and chat in real-time like you’re talking to a human tutor. Learning has never been this fun!
</p>
          <p className="text-base leading-6 mt-2">
  Unlock premium features with flexible plans 🎁—making smart, dynamic learning accessible for everyone!
</p>

        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-3">Quick Links</h2>
          <ul className="space-y-2 text-base">
            <li>
              <Link href="/about" className="hover:text-orange-400 transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-orange-400 transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-orange-400 transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-orange-400 transition-colors">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-3">Connect</h2>
          <div className="flex space-x-4 text-base">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition-colors"
            >
              Twitter
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Yope. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
