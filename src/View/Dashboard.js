import { useSession } from 'next-auth/react';

const Dashboard = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') return <p>Caricamento...</p>;
  if (!session) return <p>Non sei loggato</p>;

  return (
    <div>
      <h1>Benvenuto {session.user.name}</h1>
      <p>Email: {session.user.email}</p>
      <p>ID utente (dal DB): {session.user.id}</p>
    </div>
  );
};
export default Dashboard;
