import React from "react";
import { Link } from "react-router";
import Logo from "../Logo/Logo";

const Footer = () => (
  <footer className="mt-16 border-t-4 border-primary/70 bg-base-200 text-base-content">
    <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-16">
      <div className="space-y-4">
        <Logo />
        <p className="max-w-sm text-sm leading-6 text-base-content/70">
          Find your next favorite read and have it delivered with Book Nest.
        </p>
      </div>

      <nav aria-label="Explore Book Nest" className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Explore</h2>
        <Link to="/" className="block w-fit text-sm hover:text-primary">Home</Link>
        <Link to="/all-books" className="block w-fit text-sm hover:text-primary">Browse all books</Link>
      </nav>

      <nav aria-label="Your account" className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Your account</h2>
        <Link to="/auth/login" className="block w-fit text-sm hover:text-primary">Sign in</Link>
        <Link to="/auth/register" className="block w-fit text-sm hover:text-primary">Create an account</Link>
      </nav>
    </div>
    <div className="border-t border-base-content/10">
      <p className="mx-auto max-w-7xl px-5 py-4 text-center text-xs text-base-content/60 sm:px-8 sm:text-left">
        © {new Date().getFullYear()} Book Nest. Happy reading.
      </p>
    </div>
  </footer>
);

export default Footer;
