import React, { useState } from 'react';
import MatchCreator from 'components/Matches/MatchCreator';
import MatchList from 'components/Matches/MatchList';

const MatchesView = ({ user }) => {
  const [refresh, setRefresh] = useState(false);
  return (
    <div className="container py-3">
      <MatchCreator onCreated={() => setRefresh(!refresh)} />
      <MatchList user={user} key={refresh} />
    </div>
  );
};

export default MatchesView;
