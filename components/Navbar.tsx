import React from 'react'
import Link from 'next/link'

const Navbar: React.FC = function Navbar() {
  return (
    <nav className="bg-blue-500 p-4 shadow-lg">
      <div className="flex justify-between items-center">
        <div className="text-white font-bold text-xl">My Project</div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/">
              <div className="text-white hover:text-blue-200">Home</div>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <div className="text-white hover:text-blue-200">About</div>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <div className="text-white hover:text-blue-200">Contact</div>
            </Link>
          </li>
          <li>
            <Link href="/login">
              <div className="text-white hover:text-blue-200">Login</div>
            </Link>
          </li>
          <li>
            <Link href="/signup">
              <div className="text-white hover:text-blue-200">Signup</div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
