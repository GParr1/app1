import React, { useEffect } from 'react';
import { getAllMatches } from 'utils/firestoreUtils';
import { useSelector } from 'react-redux';
import { getMatches } from 'state/support/selectors';
import { getUser } from 'state/auth/selectors';
import Leaderboard from 'components/Leaderboard/Leaderboard';

const Dashboard = () => {
  const matches = useSelector(getMatches);
  const user = useSelector(getUser);
  useEffect(() => {
    const fetchMatches = async () => {
      await getAllMatches();
    };
    fetchMatches();
  }, []);
  return (
    <>
      <div className="container mt-5">
        <Leaderboard />
        {/* tutte le partite */}
        <div className="row">
          {matches.map(m => (
            <div key={m.id} className="card mb-3 shadow-sm">
              <div className="card-body">
                <h6>{m.campo}</h6>
                <p>
                  {new Date(m.data).toLocaleString()} – Calcio a {m.tipo}
                </p>
                <p>{m.players.length} iscritti</p>
                {m.players.map((p, i) => (
                  <p key={`players-${i}`}>{JSON.stringify(p)}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {Object.keys(user).map(key => (
        <p key={key}>
          {key}: {typeof user[key] === 'object' ? JSON.stringify(user[key]) : user[key]}
        </p>
      ))}
    </>
  );
};
export default Dashboard;
