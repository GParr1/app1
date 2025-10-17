import React, { useEffect, useState } from 'react';
import CardBronze from 'components/FifaCard/CardBronze';
import { fetchAllUsers } from 'utils/authUtils'; // il tuo componente personalizzato

export default function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await fetchAllUsers(50);
      setUsers(data || []);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  if (!users.length) {
    return <div className="alert alert-info text-center mt-4">Nessun giocatore trovato.</div>;
  }

  const [first, second, third, ...others] = users;

  return (
    <div className="container my-4">
      {/* --- PODIO --- */}
      <h2 className="text-center mb-4 fw-bold text-uppercase">🏆 Classifica Calcetto 🏆</h2>

      <div className="row justify-content-center align-items-end mb-5">
        {/* Secondo posto */}
        {second && (
          <div className="col-4 col-md-3 text-center">
            <CardBronze dynamicValue={{ customerInfo: second }} className={'card-mini zoom02'} />
          </div>
        )}

        {/* Primo posto */}
        {first && (
          <div className="col-4 col-md-3 text-center">
            <CardBronze dynamicValue={{ customerInfo: first }} className={'card-mini zoom02'} />
          </div>
        )}

        {/* Terzo posto */}
        {third && (
          <div className="col-4 col-md-3 text-center">
            <CardBronze dynamicValue={{ customerInfo: third }} className={'card-mini zoom02'} />
          </div>
        )}
      </div>

      {/* --- TABELLA GIOCATORI --- */}
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white fw-semibold">Classifica completa</div>
        <div className="card-body p-0">
          <table className="table table-striped mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Giocatore</th>
                <th scope="col">Ruolo</th>
                <th scope="col">Overall</th>
                <th scope="col" className="text-center">
                  Card
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td className="fw-semibold">{index + 4}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={user.photoURL}
                        alt={user.firstName}
                        className="rounded-circle me-2"
                        style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                      />
                      <div>
                        <div className="fw-semibold">
                          {user.firstName} {user.lastName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{user.position || '-'}</td>
                  <td>{user.overall}</td>
                  <td className="text-center">
                    <CardBronze
                      dynamicValue={{ customerInfo: user }}
                      className={'card-mini zoom02'}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
