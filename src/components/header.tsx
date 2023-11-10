import Link from 'next/link';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { useState } from 'react';

export default function Header() {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  return (
    <header className="bg-blue-900 bg-opacity-75 text-white">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <a href="/home">
            <img
              src="/assets/logo_branco.png"
              alt="Logo Ipal"
              className="w-20 h-20 object-contain mx-auto"
            />
          </a>
        </div>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <div className="relative right-8">
                <button
                  onClick={toggleOptions}
                  className="flex items-center text-white bg-transparent border-none px-2 py-2 rounded right-[-70%]"
                >
                   <HiOutlineUserCircle className="w-10 h-20 mr-2" />
                </button>
                {isOptionsOpen && (
                  <ul className="absolute right-0 mt-2 bg-blue-900/75 text-white border-none px-4 py-2 rounded w-36 left-[-35px]">
                    <li>
                      <Link href="/perfil">Perfil</Link>
                    </li>
                    <li>
                      <Link href="/trocar-senha">Trocar Senha</Link>
                    </li>
                    <li>
                      <Link href="/minha-escala">Minhas Escalas</Link>
                    </li>
                    <li>
                      <Link href="/login">Sair</Link>
                    </li>
                  </ul>
                )}
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
