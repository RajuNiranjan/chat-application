import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { CiHeart, CiSearch } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { IoBagOutline, IoBagSharp } from "react-icons/io5";

const NavBar = () => {
  const pathName = usePathname();

  return (
    <nav className="h-20 w-full shadow-lg flex items-center justify-between sticky top-0 z-50 bg-white">
      <div className="flex items-center gap-4">
        <div>
          <Link href="/" className="font-bold text-xl tracking-wider">
            <span>
              T<span className="text-red-500">RE</span>ND
            </span>
            <span className="text-red-500">SET</span>
          </Link>
        </div>
        <ul className="flex items-center gap-4">
          <li>Men</li>
          <li>Shoes</li>
        </ul>
      </div>

      <div className="flex gap-4 items-center">
        <form className="flex gap-2 items-center border bg-gray-100 p-2 rounded-lg">
          <input
            type="text"
            name="navSearchInput"
            id="navSearchInput"
            className="focus:outline-none bg-transparent"
          />
          <CiSearch className="text-xl cursor-pointer" />
        </form>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className={
              pathName === "/login" ? "text-red-500 font-medium" : "font-medium"
            }>
            Log In
          </Link>
          <Link href="/wishlist">
            {pathName === "/wishlist" ? (
              <FaHeart className="text-red-500 cursor-pointer text-md" />
            ) : (
              <CiHeart className="text-md" />
            )}
          </Link>
          <Link href="/cart">
            {pathName === "/cart" ? (
              <IoBagSharp className="text-md" />
            ) : (
              <IoBagOutline className="text-md" />
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
