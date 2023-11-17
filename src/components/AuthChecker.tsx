// AuthChecker.js

import { useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthChecker = () => {
  const router = useRouter();

  useEffect(() => {
    const tokenExpiration = localStorage.getItem('tokenExpiration')
    const isTokenExpired = () => {
      const currentTime = Math.floor(Date.now() / 1000);
      return tokenExpiration && currentTime > parseInt(tokenExpiration);
    };

    if (isTokenExpired()) {
      localStorage.removeItem('tokenExpiration');
      router.push('/login'); 
  }});

  

  return null;
};

export default AuthChecker;
