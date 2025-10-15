import React, { useEffect, useState } from 'react';
import { getAllMatches } from 'utils/firestoreUtils';
import {useSelector} from "react-redux";
import {getMatches} from "state/support/selectors";

const Dashboard = () => {
  const matches = useSelector(getMatches);
  useEffect(() => {
    const fetchMatches = async () => {
      await getAllMatches();
    };
    fetchMatches();
  }, []);
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          {matches.map(m => (
            <div key={m.id} className="card mb-3 shadow-sm">
              <div className="card-body">
                <h6>{m.campo}</h6>
                <p>
                  {new Date(m.data).toLocaleString()} – Calcio a {m.tipo}
                </p>
                <p>{m.players.length} iscritti</p>
                {m.players.map((p, i) => (
                  <p key={`players-${i}`}>{JSON.stringify(p)}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {Object.keys(matches).map(key => (
        <p key={key}>
          {key}: {typeof matches[key] === 'object' ? JSON.stringify(matches[key]) : matches[key]}
        </p>
      ))}
    </>
  );
};
export default Dashboard;
