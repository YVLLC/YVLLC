import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Track Order", href: "/track-order" },
    { name: "FAQ", href: "/faq" },
    { name: "Login", href: "/login" },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-[#CFE4FF]">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-[#007BFF]">
          YesViral
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`hover:text-[#005FCC] ${
                router.pathname === link.href ? "text-[#005FCC]" : "text-[#111]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-[#007BFF] focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`block text-sm font-medium ${
                router.pathname === link.href ? "text-[#005FCC]" : "text-[#111]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
