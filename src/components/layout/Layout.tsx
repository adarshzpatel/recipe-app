import React from 'react'
import Navbar from './Navbar'

interface Props {
  children: React.ReactNode
  className?: string
}

const Layout = ({ children,className }: Props) => {
  return (
    <div>
      <Navbar />
      <main className={`container mx-auto min-h-[calc(100vh-8rem)] ${className} px-4`}>
        {children}
      </main>
    </div>
  )
}

export default Layout
