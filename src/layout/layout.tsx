// Layout.js

import AuthChecker from '@/components/AuthChecker';

const Layout = ({ children }: any) => {
  return (
    <div>
      <AuthChecker /> {/* Componente para verificar a autenticação */}
      {children}
    </div>
  );
};

export default Layout;
