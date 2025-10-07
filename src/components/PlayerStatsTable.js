import React from 'react';
import PropTypes from 'prop-types';

/**
 * Mostra le statistiche stagionali di un giocatore
 * in un layout responsive con card Bootstrap.
 */
const PlayerStatsTable = ({ statsData }) => {
  if (!statsData || Object.keys(statsData).length === 0) {
    return (
      <div className="card mb-4 shadow-sm text-center p-4">
        <h5 className="text-muted">Nessuna statistica disponibile</h5>
      </div>
    );
  }

  return (
    <div className="card mb-4 shadow-sm">
      <h5 className="card-title m-4 text-center">Statistiche Personali</h5>
      <div className="card-body row">
        {Object.entries(statsData).map(([anno, stats]) => (
          <div key={anno} className="text-center border col-12 col-md-6 col-lg-4 mb-3 p-2 rounded">
            <h6 className="text-primary mb-2">Stagione {anno}</h6>
            <ul className="list-group list-group-flush">
              <li className="d-flex list-group-item justify-content-between">
                <span>Partite giocate:</span>
                <strong>{stats.partite}</strong>
              </li>
              <li className="d-flex list-group-item justify-content-between">
                <span>Gol:</span>
                <strong>{stats.gol}</strong>
              </li>
              <li className="d-flex list-group-item justify-content-between">
                <span>Assist:</span>
                <strong>{stats.assist}</strong>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

PlayerStatsTable.propTypes = {
  statsData: PropTypes.objectOf(
    PropTypes.shape({
      partite: PropTypes.number.isRequired,
      gol: PropTypes.number.isRequired,
      assist: PropTypes.number.isRequired,
    }),
  ),
};

export default PlayerStatsTable;
