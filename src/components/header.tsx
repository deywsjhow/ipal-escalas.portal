import Link from 'next/link';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';



export default function Header() {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  const [loginType, setloginType] = useState<number>(); 

  useEffect(() => {
    const user = JSON.parse(atob(window.sessionStorage.getItem('auth') || '{}'))
    setloginType(user.loginType)
  });

  return (
    <header className="bg-blue-900 bg-opacity-75 text-white">     
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center justify-center h-24 ">
          <a href="/home">
            <img
              src="/assets/logo_branco.png"
              alt="Logo Ipal"
              className="w-20 h-20 object-contain"
            />
          </a>
        </div>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <Link href="/profile">
                <span className="text-white cursor-pointer">Perfil</span>
              </Link>
            </li>
            <li>
              <Link href="/change-password">
                <span className="text-white cursor-pointer">Trocar Senha</span>
              </Link>
            </li>
            <li>
              <Link href="/my-scale">
                <span className="text-white cursor-pointer">Minhas Escalas</span>
              </Link>
            </li>
            {loginType === 1 && (
              <li>
                <Link href="/build-scale">
                  <span className="text-white cursor-pointer">Add Escalas</span>
                </Link>
              </li>
            )}
            <li> 
              <Link href="/login">
                <span className="flex items-center text-white bg-transparent border-none px-2 py-2 rounded">
                  Sair
                </span>
              </Link>         
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
