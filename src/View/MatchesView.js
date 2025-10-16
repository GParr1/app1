import React, { useEffect } from 'react';
import MatchList from 'components/Matches/MatchList';
import { useSelector } from 'react-redux';
import { getMatches } from 'state/support/selectors';
import { getAllMatches, getMatchesByPlayerId } from 'utils/firestoreUtils';

const MatchesView = ({ user }) => {
  useEffect(() => {
    const fetchMatches = async () => {
      await getAllMatches();
    };
    fetchMatches();
  }, []);
  const matches = useSelector(getMatches);
  const uid = user.userLogin.uid;
  const matchesByPlayerId = getMatchesByPlayerId(matches, uid);
  return (
    <div className="container py-3">
      <MatchList
        user={user}
        matches={matches}
        title={`Partite Disponibili (${matches.length})`}
        showAddMatch={true}
      />
      <MatchList user={user} matches={matchesByPlayerId} title={'Le tue partite'} />
    </div>
  );
};

export default MatchesView;
