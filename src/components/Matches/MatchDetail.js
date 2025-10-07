import React, { useState } from 'react';
import { balanceTeams } from 'utils/teamBalancer';

const MatchDetail = ({ match }) => {
  const [teams, setTeams] = useState(null);

  const handleBalance = () => {
    const { teamA, teamB } = balanceTeams(match.players);
    setTeams({ teamA, teamB });
  };

  return (
    <div className="mt-2">
      <button className="btn btn-secondary btn-sm" onClick={handleBalance}>
        Genera squadre equilibrate
      </button>
      {teams && (
        <div className="mt-3 row">
          <div className="col-md-6">
            <h6>⚫ Squadra A</h6>
            <ul className="list-group">
              {teams.teamA.map(p => (
                <li key={p.id} className="list-group-item d-flex justify-content-between">
                  <span>{p.name}</span>
                  <span>{p.overall}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-6">
            <h6>⚪ Squadra B</h6>
            <ul className="list-group">
              {teams.teamB.map(p => (
                <li key={p.id} className="list-group-item d-flex justify-content-between">
                  <span>{p.name}</span>
                  <span>{p.overall}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchDetail;
