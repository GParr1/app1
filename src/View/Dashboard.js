import { getAccountInformation } from 'state/auth/selectors';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const user = useSelector(getAccountInformation);

  return (
    <div>
      <h1>Benvenuto {user.name}</h1>
      <h1>Benvenuto {user.firstName}</h1>
      <p>Email: {user.email}</p>
      <p>ID utente (dal DB): {user.id}</p>
    </div>
  );
};
export default Dashboard;
