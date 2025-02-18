"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function NavLinks() {
  const pathname = usePathname()

  return (
    <nav>
      <ul className="flex items-center space-x-6">
        <li>
          <Link
            href="/infos"
            className={`text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors ${
              pathname === "/infos" ? "text-gray-900 dark:text-gray-100" : ""
            }`}
          >
            Infos
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className={`text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors ${
              pathname === "/contact" ? "text-gray-900 dark:text-gray-100" : ""
            }`}
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  )
} 