import React from 'react';
import PropTypes from 'prop-types';
import './TeamFormation.css';

const formations = {
  5: [
    { top: '80%', left: '50%' }, // portiere
    { top: '60%', left: '25%' },
    { top: '60%', left: '75%' },
    { top: '40%', left: '35%' },
    { top: '40%', left: '65%' },
  ],
  8: [
    { top: '85%', left: '50%' },
    { top: '70%', left: '20%' },
    { top: '70%', left: '50%' },
    { top: '70%', left: '80%' },
    { top: '50%', left: '25%' },
    { top: '50%', left: '75%' },
    { top: '35%', left: '40%' },
    { top: '35%', left: '60%' },
  ],
};

const TeamFormation = ({ teamA, teamB, tipo }) => {
  const layout = formations[tipo] || formations[5];

  return (
    <div className="formation-container mt-4">
      <div className="field">
        {/* Squadra A */}
        {teamA.map((player, i) => (
          <div
            key={player.id}
            className="player player-a"
            style={{
              top: layout[i % layout.length].top,
              left: layout[i % layout.length].left,
            }}
          >
            <span className="name">{player.name}</span>
            <span className="overall">{player.overall}</span>
          </div>
        ))}

        {/* Squadra B (speculare) */}
        {teamB.map((player, i) => (
          <div
            key={player.id}
            className="player player-b"
            style={{
              top: `calc(100% - ${layout[i % layout.length].top})`,
              left: layout[i % layout.length].left,
            }}
          >
            <span className="name">{player.name}</span>
            <span className="overall">{player.overall}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

TeamFormation.propTypes = {
  teamA: PropTypes.array.isRequired,
  teamB: PropTypes.array.isRequired,
  tipo: PropTypes.oneOf(['5', '8']).isRequired,
};

export default TeamFormation;
