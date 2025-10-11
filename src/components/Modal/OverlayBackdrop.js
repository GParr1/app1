import React from 'react';
import MatchDetail from 'components/Matches/MatchDetail';

const OverlayBackdrop = ({ closeOverlay, match }) => {
  return (
    <div
      className="overlay-backdrop"
      role="button"
      tabIndex={0}
      onClick={closeOverlay}
      onKeyDown={e => {
        if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
          closeOverlay();
        }
      }}
    >
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <div
        className="overlay-content"
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        onClick={e => e.stopPropagation()}
        onKeyDown={e => {
          if (e.key === 'Escape') {
            closeOverlay();
          }
        }}
      >
        <button
          type="button"
          className="btn-close float-end"
          onClick={closeOverlay}
          aria-label="Close"
        ></button>
        <MatchDetail match={match} />
      </div>
    </div>
  );
};
export default OverlayBackdrop;
