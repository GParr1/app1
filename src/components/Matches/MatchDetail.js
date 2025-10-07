import React, { useState } from 'react';
import { balanceTeams } from 'utils/utils';
import { CAMPO_CALCIO_BG } from 'utils/Constant';

const MatchDetail = ({ match }) => {
  const [teams, setTeams] = useState(null);

  const handleBalance = () => {
    const { teamA, teamB } = balanceTeams(match.players);
    setTeams({ teamA, teamB });
  };

  const renderTeamOnField = (team, color, positions) => {
    return team.map((p, i) => (
      <div
        key={p.id}
        className="player-dot"
        style={{
          top: positions[i]?.top || '50%',
          left: positions[i]?.left || '50%',
          backgroundColor: color,
        }}
        title={`${p.name} (${p.overall})`}
      >
        <span>{p.name.split(' ')[0]}</span>
        <small>{p.overall}</small>
      </div>
    ));
  };

  const getPositions = teamType =>
    match.tipo === '5'
      ? [
          { top: '50%', left: '10%' }, // portiere
          { top: '50%', left: '25%' },
          { top: '20%', left: '30%' },
          { top: '80%', left: '30%' },
          { top: '50%', left: '40%' },
        ]
      : [
          { top: '85%', left: '45%' }, // portiere
          { top: '70%', left: '30%' },
          { top: '70%', left: '60%' },
          { top: '55%', left: '25%' },
          { top: '55%', left: '45%' },
          { top: '55%', left: '65%' },
          { top: '35%', left: '35%' },
          { top: '35%', left: '55%' },
        ];

  return (
    <div className="mt-3">
      <button className="btn btn-secondary btn-sm" onClick={handleBalance}>
        ⚽ Genera squadre equilibrate
      </button>

      {teams && (
        <div className="mt-4 d-flex gap-4">
          {/* Lista squadre */}
          <div className="team-lists" style={{ minWidth: '150px' }}>
            <div className="team-list mb-3">
              <h6 className="text-primary">Squadra A</h6>
              <ul className="list-group">
                {teams.teamA.map(p => (
                  <li key={p.id} className="list-group-item d-flex justify-content-between">
                    <span>{p.name}</span>
                    <span>{p.overall}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="team-list">
              <h6 className="text-danger">Squadra B</h6>
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

          {/* Campo */}
          <div
            className="campo-wrapper position-relative"
            style={{
              width: '500px',
              height: '300px',
              backgroundImage: `url('${CAMPO_CALCIO_BG}')`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {renderTeamOnField(teams.teamA, '#007bff', getPositions('A'))}
            {renderTeamOnField(teams.teamB, '#dc3545', getPositions('B'))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchDetail;
