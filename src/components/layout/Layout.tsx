import React from 'react'
import Navbar from './Navbar'

interface Props {
  children: React.ReactNode
  className?: string
}

const Layout = ({ children, className }: Props) => {
  return (
    <div>
      <Navbar />
      <main className={`container max-w-screen-lg mx-auto min-h-[calc(100vh-8rem)]  p-4 ${className}`}>
        {children}
      </main>
    </div>
  )
}

export default Layout
