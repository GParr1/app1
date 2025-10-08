import React, { useEffect, useState } from 'react';
import { balanceTeams } from 'utils/utils';

const MatchDetail = ({ match }) => {
  const [teams, setTeams] = useState({ teamA: [], teamB: [] });

  // 🔄 Rigenera automaticamente le squadre quando cambia la lista dei giocatori
  useEffect(() => {
    if (match?.players?.length) {
      const { teamA, teamB } = balanceTeams(match.players);
      setTeams({ teamA, teamB });
    }
  }, [match.players]);

  return (
    <div className="mt-3">
      <h5 className="text-center mb-3">⚽ Formazioni automatiche</h5>

      <div className="row">
        {/* Squadra A */}
        <div className="col-md-6">
          <div className="card shadow-sm mb-3">
            <div className="card-header bg-primary text-white text-center fw-bold">Squadra A</div>
            <ul className="list-group list-group-flush">
              {teams.teamA.length > 0 ? (
                teams.teamA.map(p => (
                  <li
                    key={p.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span>{p.name}</span>
                    <span className="badge bg-primary rounded-pill">{p.overall}</span>
                  </li>
                ))
              ) : (
                <li className="list-group-item text-center text-muted">
                  Nessun giocatore ancora assegnato
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Squadra B */}
        <div className="col-md-6">
          <div className="card shadow-sm mb-3">
            <div className="card-header bg-danger text-white text-center fw-bold">Squadra B</div>
            <ul className="list-group list-group-flush">
              {teams.teamB.length > 0 ? (
                teams.teamB.map(p => (
                  <li
                    key={p.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span>{p.name}</span>
                    <span className="badge bg-danger rounded-pill">{p.overall}</span>
                  </li>
                ))
              ) : (
                <li className="list-group-item text-center text-muted">
                  Nessun giocatore ancora assegnato
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetail;
