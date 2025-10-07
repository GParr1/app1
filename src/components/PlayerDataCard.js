import React from 'react';
import PropTypes from 'prop-types';

/**
 * Componente riutilizzabile per mostrare:
 * - Statistiche stagionali del giocatore
 * - Coppe vinte
 *
 * Usa il prop "mode" per distinguere il tipo di contenuto:
 * mode="stats" | mode="coppe"
 */
const PlayerDataCard = ({ title, data, mode }) => {
  const isStats = mode === 'stats';
  const hasData = data && Object.keys(data).length > 0;

  return (
    <div className="card mb-4 shadow-sm">
      <h5 className="card-title m-4 text-center">{title}</h5>

      <div className="card-body row">
        {!hasData ? (
          <p className="text-center text-muted">Nessun dato disponibile</p>
        ) : isStats ? (
          // 🎯 SEZIONE STATISTICHE
          Object.entries(data).map(([anno, stats]) => (
            <div
              key={anno}
              className="text-center border col-12 col-md-6 col-lg-4 mb-3 p-2 rounded"
            >
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
          ))
        ) : // 🏆 SEZIONE COPPE
        Array.isArray(data) && data.length > 0 ? (
          <ul className="list-group list-group-flush w-100">
            {data.map((coppa, idx) => (
              <li key={idx} className="list-group-item">
                <div className="text-center border col-12 col-md-6 col-lg-4 mx-auto p-2 rounded">
                  <h6 className="text-primary">{coppa.anno}</h6>
                  <div className="d-flex justify-content-between">
                    <span>🏆</span>
                    <span>{coppa.nome}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-muted">Nessuna coppa vinta... ancora!</p>
        )}
      </div>
    </div>
  );
};

PlayerDataCard.propTypes = {
  /** Titolo mostrato sopra la card */
  title: PropTypes.string.isRequired,

  /** Dati da visualizzare */
  data: PropTypes.oneOfType([
    PropTypes.objectOf(
      PropTypes.shape({
        partite: PropTypes.number,
        gol: PropTypes.number,
        assist: PropTypes.number,
      }),
    ),
    PropTypes.arrayOf(
      PropTypes.shape({
        anno: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        nome: PropTypes.string,
      }),
    ),
  ]),

  /** Tipo di card: 'stats' o 'coppe' */
  mode: PropTypes.oneOf(['stats', 'coppe']).isRequired,
};

export default PlayerDataCard;
