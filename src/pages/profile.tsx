import React, { useState, useEffect } from 'react';
import { HiOutlineUserCircle } from 'react-icons/hi';
import Link from 'next/link';


import Header from '@/components/header'
import  UserSession  from '@/Models/UserSession';




export default function Profile(){
    const [user, setUser] = useState<UserSession | null>(null)

    useEffect(() => {
        const user = JSON.parse(atob(window.sessionStorage.getItem('auth') || '{}'))
        setUser(user)       
    }, []);    

    return (
        <>
      <Header />
      <div className="max-w-sm mx-auto my-32 p-4 border-2 rounded-lg shadow-lg bg-white">
          <div className="flex items-center justify-center">
            <HiOutlineUserCircle size={150} className="mr-4 left-3" />
          </div>
          <div className="text-center"> 
            <h1 className="text-3xl font-bold mb-4">{user?.user}</h1>
            <p className="mb-2">Email: {user?.email}</p>
            <p className="mb-2">Atribuição: {user?.attribuation}</p>
          </div>
          <div className="text-right">
              <Link href="/change-password">
                <span className="text-blue-900/75 cursor-pointer">Trocar Senha</span>
              </Link>
          </div>
      </div>
    </>
    )
}