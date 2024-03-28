"use client";
import { getCurrentUser } from "@/lib/session";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <header className="bg-white h-20">
      <nav className="h-full flex justify-between container items-center">
        <div>
          
          <Link href="/" className="text-ct-dark-600 text-2xl font-semibold">
            Aventure Alpines
          </Link>
        </div>
        <h1 className="text-ct-dark-600 text-2xl font-semibold">Bonjour {user?.name}   </h1>
        <ul className="flex items-center gap-4">
          <li>
            <Link href="/" className="text-ct-dark-600">
              Home
            </Link>
          </li>
          {!user && (
            <>
              <li>
                <Link href="/login" className="text-ct-dark-600">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-ct-dark-600">
                  Register
                </Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <Link href="/blog" className="text-ct-dark-600">
                  Blog
                </Link>
                
              </li>
              <li>
                <Link href="/profile" className="text-ct-dark-600">
                  Profile
                </Link>
              </li>
              <li className="cursor-pointer" onClick={() => signOut()}>
                <div>Logout</div>
                
              </li>
              
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
