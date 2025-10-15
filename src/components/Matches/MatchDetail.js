import React, { useEffect, useState } from 'react';
import { balanceTeams } from 'utils/utils';
import CardBronze from 'components/FifaCard/CardBronze';

const MatchDetail = ({ match }) => {
  const [teams, setTeams] = useState({ teamA: [], teamB: [] });

  // Genera squadre automaticamente al cambiamento dei giocatori
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
        {/* 🟦 Squadra A */}
        <div className="col-md-6">
          <div className="card shadow-sm mb-3 card-mini-wrapper">
            <div className="card-header bg-primary text-white text-center fw-bold">Squadra A</div>
            <div className="p-3 d-flex flex-wrap justify-content-center gap-0">
              {teams.teamA.length > 0 ? (
                teams.teamA.map(p => (
                  <CardBronze
                    key={p.id}
                    dynamicValue={{ customerInfo: p }}
                    className={'card-mini'}
                  />
                ))
              ) : (
                <div className="text-center text-muted">Nessun giocatore ancora assegnato</div>
              )}
            </div>
          </div>
        </div>

        {/* 🟥 Squadra B */}
        <div className="col-md-6">
          <div className="card shadow-sm mb-3 card-mini-wrapper">
            <div className="card-header bg-danger text-white text-center fw-bold">Squadra B</div>
            <div className="p-3 d-flex flex-wrap justify-content-center gap-3 card-mini">
              {teams.teamB.length > 0 ? (
                teams.teamB.map(p => <CardBronze key={p.id} dynamicValue={{ customerInfo: p }} />)
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
