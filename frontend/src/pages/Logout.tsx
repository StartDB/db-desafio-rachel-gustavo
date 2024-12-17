import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useUser from '../contexts/hook/useUser';

export default function Logout() {
  const navigate = useNavigate();
  const { setUser } = useUser();

  useEffect(() => {
    localStorage.removeItem('user_token');
    setUser(null);
    
    
    navigate('/');
  }, [navigate]);

  return (
    <div>
      <h2>Você foi desconectado. Redirecionando...</h2>
    </div>
  );
};
