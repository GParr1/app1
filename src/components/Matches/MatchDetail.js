import React, { useEffect, useState } from 'react';
import { balanceTeams, predictMatchResult } from 'utils/utils';
import CardBronze from 'components/FifaCard/CardBronze';

const MatchDetail = ({ match, mode = '5' }) => {
  // mode = "5" (calcetto) oppure "8" (calcio a 8)
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

  // 🔹 Coordinate di formazione per calcio a 5 e calcio a 8
  const formations = {
    5: [
      { role: 'GK', top: '80%', left: '50%' },
      { role: 'DF', top: '60%', left: '20%' },
      { role: 'DF', top: '60%', left: '80%' },
      { role: 'MF', top: '20%', left: '35%' },
      { role: 'MF', top: '20%', left: '65%' },
    ],
    8: [
      { role: 'GK', top: '85%', left: '50%' },
      { role: 'DF', top: '70%', left: '20%' },
      { role: 'DF', top: '70%', left: '50%' },
      { role: 'DF', top: '70%', left: '80%' },
      { role: 'MF', top: '50%', left: '30%' },
      { role: 'MF', top: '50%', left: '70%' },
      { role: 'FW', top: '25%', left: '40%' },
      { role: 'FW', top: '25%', left: '60%' },
    ],
  };

  // 🔹 Render del campo
  const renderField = team => {
    const field = formations[mode];
    const players = [...team].sort((a, b) => b.overall - a.overall);

    return (
      <div
        className="soccer-field position-relative mx-auto mb-3"
        style={{ backgroundImage: "url('/app1/assets/1137.jpg')" }}
      >
        {field.map((pos, index) => {
          const player = players[index];
          if (!player) return null;

          return (
            <div
              key={player.id}
              className="position-absolute"
              style={{
                top: pos.top,
                left: pos.left,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <CardBronze dynamicValue={{ customerInfo: player }} className="card-mini" />
            </div>
          );
        })}
        <div className="field-outline" />
      </div>
    );
  };

  return (
    <div className="mt-3 container-fluid">
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

      <h5 className="text-center my-3">
        ⚽ Formazioni tattiche ({mode} vs {mode})
      </h5>

      <div className="row g-3">
        {/* 🟦 Squadra A */}
        <div className="col-12 col-md-6">
          <div className="card shadow-sm card-mini-wrapper h-100">
            <div className="card-header bg-primary text-white fw-bold">Squadra A</div>
            <div className="">{renderField(teams.teamA, 'blue')}</div>
          </div>
        </div>

        {/* 🟥 Squadra B */}
        <div className="col-12 col-md-6">
          <div className="card shadow-sm card-mini-wrapper h-100">
            <div className="card-header bg-danger text-white fw-bold">Squadra B</div>
            <div className="">{renderField(teams.teamB, 'red')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetail;
