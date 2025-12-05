"use client"

import { signOut } from "next-auth/react"

export default function LogoutButton() {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" })
  }

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
    >
      登出
    </button>
  )
}
