import React, { useState } from 'react';
import { balanceTeams } from 'utils/utils';
import { CAMPO_CALCIO_BG } from 'utils/Constant';

const MatchDetail = ({ match }) => {
  const [teams, setTeams] = useState(null);

  const handleBalance = () => {
    const { teamA, teamB } = balanceTeams(match.players);
    setTeams({ teamA, teamB });
  };

  const renderTeam = (team, color, side) => {
    const positions =
      match.tipo === '5'
        ? [
            { top: '50%', left: '10%' }, // portiere
            { top: '70%', left: '25%' },
            { top: '30%', left: '25%' },
            { top: '40%', left: '55%' },
            { top: '65%', left: '70%' },
          ]
        : [
            { top: '85%', left: '45%' },
            { top: '70%', left: '30%' },
            { top: '70%', left: '60%' },
            { top: '55%', left: '25%' },
            { top: '55%', left: '45%' },
            { top: '55%', left: '65%' },
            { top: '35%', left: '35%' },
            { top: '35%', left: '55%' },
          ];

    return (
      <div className={`campo-half ${side}`}>
        {team.map((p, i) => (
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
        ))}
      </div>
    );
  };

  return (
    <div className="mt-3">
      <button className="btn btn-secondary btn-sm" onClick={handleBalance}>
        ⚽ Genera squadre equilibrate
      </button>

      {teams && (
        <div
          className="mt-4 campo-wrapper"
          style={{
            backgroundImage: `url('${CAMPO_CALCIO_BG}')`,
          }}
        >
          {renderTeam(teams.teamA, '#007bff', 'left')}
          {renderTeam(teams.teamB, '#dc3545', 'right')}
        </div>
      )}
    </div>
  );
};

export default MatchDetail;
