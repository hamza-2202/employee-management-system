import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LogoutButton = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Get logout from context

  const handleLogout = () => {
    const confirm = window.confirm('Are you sure? You want to logout?');
    if (confirm) {
      logout(); // Call context logout to clear localStorage and state
      console.log('Navigating to /login');
      navigate('/login', { replace: true }); // Redirect to login
    }
  };

  return (
    <button onClick={handleLogout} className="delete-button py-0 w-auto h-[35px] h">
      Logout
    </button>
  );
};

export default LogoutButton;