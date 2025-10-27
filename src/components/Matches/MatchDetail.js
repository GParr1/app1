import React, { useEffect, useState } from 'react';
import { balanceTeams, predictMatchResult } from 'utils/utils';
import CardBronze from 'components/FifaCard/CardBronze';

const MatchDetail = ({ match }) => {
  const [teams, setTeams] = useState({ teamA: [], teamB: [] });
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    if (match?.players?.length) {
      const { teamA, teamB } = balanceTeams(match.players);
      setTeams({ teamA, teamB });

      const pred = predictMatchResult(teamA, teamB);
      setPrediction(pred);
    }
  }, [match.players]);

  return (
    <div className="mt-3 container-fluid">
      {/* 📊 Risultato previsto */}
      {prediction && (
        <div className="text-center mt-4">
          <h6>🔮 Previsione risultato</h6>
          <p className="fs-5 mb-1">
            <strong>Squadra A {prediction.goalsA}</strong> -{' '}
            <strong>{prediction.goalsB} Squadra B</strong>
          </p>
          <p className="text-muted mb-1">
            xG: ({prediction.expectedGoalsA} vs {prediction.expectedGoalsB})
          </p>
          <p className="fw-bold text-success">🏆 Probabile vincitore: {prediction.winner}</p>
        </div>
      )}

      <h5 className="text-center my-3">⚽ Formazioni automatiche</h5>

      <div className="row g-3">
        {/* 🟦 Squadra A */}
        <div className="col-12 col-md-6">
          <div className="card shadow-sm mb-3 card-mini-wrapper h-100">
            <div className="card-header bg-primary text-white text-center fw-bold">Squadra A</div>
            <div className="p-3 d-flex flex-wrap justify-content-center gap-2">
              {teams.teamA.length > 0 ? (
                teams.teamA.map(p => (
                  <CardBronze key={p.id} dynamicValue={{ customerInfo: p }} className="card-mini" />
                ))
              ) : (
                <div className="text-center text-muted">Nessun giocatore ancora assegnato</div>
              )}
            </div>
          </div>
        </div>

        {/* 🟥 Squadra B */}
        <div className="col-12 col-md-6">
          <div className="card shadow-sm mb-3 card-mini-wrapper h-100">
            <div className="card-header bg-danger text-white text-center fw-bold">Squadra B</div>
            <div className="p-3 d-flex flex-wrap justify-content-center gap-2">
              {teams.teamB.length > 0 ? (
                teams.teamB.map(p => (
                  <CardBronze key={p.id} dynamicValue={{ customerInfo: p }} className="card-mini" />
                ))
              ) : (
                <div className="text-center text-muted">Nessun giocatore ancora assegnato</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetail;
