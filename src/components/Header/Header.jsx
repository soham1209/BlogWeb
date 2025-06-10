import React, { useState,useEffect } from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Home, Menu } from "lucide-react";


function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  //for the menue 
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  return (
    <header className='py-2 w-full h-14 bg-clr1 shadow-[5px_4px_4px_0_rgba(0,0,0,0.25)] mb-1 z-10 '>

        <nav className='flex justify-between sm:justify-between sm:w-full sm:'>
          <div className="w-1/3 ml-4 sm:hidden sm:w-auto">
            <Menu className="w-8 h-10 text-clr4 hover:text-primary cursor-pointer"
              onClick={() => setIsOpen(!isOpen)} />
          </div>
          <div className=' w-2/3 flex justify-between  sm:w-auto '>
            <Link to='/'>
              <Logo width='120px'  />
            </Link>
            <Link to='/'>
              <Home className="w-8 h-10 mr-2 ml-5 text-clr4 mt-1 " />
            </Link>
          </div>
          <div className=' hidden sm:flex mr-5'>
            <ul className='flex gap-10'>
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className='bg-clr2 mt-2 px-6 py-1 rounded-full shadow-[2px_3px_6px_0_rgba(0,0,0,0.6)] hover:shadow-none transition-shadow duration-300'
                    >{item.name}</button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>

          {isOpen && (
            <ul className='sm:hidden absolute top-14 left-4 bg-white shadow-md rounded-lg p-4 flex flex-col gap-2 z-10'>
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => {
                        navigate(item.slug)
                        setMenuOpen(false) // close menu after click
                      }}
                      className='bg-clr2 mr-4 ml-4 mt-2 px-6 py-1 rounded-full shadow-[2px_3px_6px_0_rgba(0,0,0,0.6)] hover:shadow-none transition-shadow duration-300 '
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          )}

        </nav>

    </header>
  )
}

export default Header