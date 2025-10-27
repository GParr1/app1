import React from 'react';
import { RedirectOnLogin } from 'utils/RedirectOnLogin';
import CardBronze from 'components/FifaCard/CardBronze';
import PlayerDataCard from 'components/PlayerDataCard';

// Mock dati di esempio
const mockStats = {
  2022: { partite: 25, gol: 10, assist: 8 },
  2023: { partite: 30, gol: 15, assist: 12 },
  2024: { partite: 28, gol: 9, assist: 10 },
};

const mockCoppe = [
  { anno: 2023, nome: 'Coppa Primavera' },
  { anno: 2024, nome: 'Torneo Estivo' },
];

export const MyAccountView = ({ user }) => {
  if (!user) {
    return <RedirectOnLogin />;
  }
  return (
    <div className=" mt-5">
      <div className="row justify-content-between">
        {/* Figurina FIFA */}
        <div className="col-md-3 mb-3 d-flex flex-column align-items-center">
          <CardBronze enableEdit={true} />
        </div>
        {/* Statistiche e Coppe */}
        <div className="col-md-8">
          {/* 📊 Statistiche */}
          <PlayerDataCard title="Statistiche Personali" data={mockStats} mode="stats" />
          {/* 🏆 Coppe */}
          <PlayerDataCard title="Coppe Vinte" data={mockCoppe} mode="coppe" />
        </div>
      </div>
    </div>
  );
};
