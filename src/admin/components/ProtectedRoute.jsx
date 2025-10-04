import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setIsAllowed(false);
        setLoading(false);
        return;
      }
      try {
        const tokenResult = await user.getIdTokenResult(true);
        const isAdmin = !!tokenResult?.claims?.admin;
        setIsAllowed(isAdmin);
      } catch (_e) {
        setIsAllowed(false);
      } finally {
        setLoading(false);
      }
    });
    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="flex items-center text-gray-600">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Beveiligde pagina laden...
        </div>
      </div>
    );
  }

  if (!isAllowed) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;