'use client';

import Link from 'next/link';
import React, { useState } from 'react';

import { IoCloseOutline } from 'react-icons/io5';
import clsx from 'clsx';
import { IoTriangleSharp } from 'react-icons/io5';
import { MdRectangle } from 'react-icons/md';
import { HiMiniRectangleGroup } from "react-icons/hi2";

const Navbar = () => {
  const [isSideMenuOpen, setMenu] = useState(false);

  const menuItems = [
    {
      label: 'Techo rectangular',
      link: '/dashboard/rectangular',
      icon: <MdRectangle />,
    },
    {
      label: 'Techo triangular',
      link: '/dashboard/triangular',
      icon: <IoTriangleSharp />,
    },
    {
      label: 'Techo superpuestos',
      link: '/dashboard/overlapping',
      icon: <HiMiniRectangleGroup />,
    },
  ];

  return (
    <div>
      <nav className='flex justify-center px-8 items-center py-6'>
        <div className='flex items-center gap-8'>
          {menuItems.map((menu, i) => (
            <Link
              key={i}
              className='hidden lg:block  text-gray-400 hover:text-black'
              href={menu.link}
            >
              {menu.icon} {menu.label}
            </Link>
          ))}
        </div>
        <div
          className={clsx(
            ' fixed h-full w-screen lg:hidden bg-black/50  backdrop-blur-sm top-0 right-0  -translate-x-full  transition-all ',
            isSideMenuOpen && 'translate-x-0'
          )}
        >
          <section className='text-black bg-white flex-col absolute left-0 top-0 h-screen p-8 gap-8 z-50 w-56 flex  '>
            <IoCloseOutline
              onClick={() => setMenu(false)}
              className='mt-0 mb-8 text-3xl cursor-pointer'
            />

            {menuItems.map((menu, i) => (
              <Link key={i} className='font-bold' href={menu.link}>
                {menu.label}
              </Link>
            ))}
          </section>
        </div>
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
