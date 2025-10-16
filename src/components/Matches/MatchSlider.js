import Slider from 'react-slick';
import { findInArrByUid } from 'utils/utils';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MatchActions from 'components/Matches/MatchActions';
import React from 'react';

const MatchSlider = ({
  matches,
  user,
  handleJoin,
  handleRemove,
  openModal,
  handleModalAddGuest,
  handleModalRemoveGuest,
  openDetailOverlay,
  closeDetailOverlay,
  handleDeleteMatch,
}) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="d-flex align-items-start gap-3">
      {/* 🔹 CARD FISSA PER CREARE UNA PARTITA */}
      <div className="p-2" style={{ flex: '0 0 280px' }}>
        <button
          type="button"
          className="card match-card h-100 d-flex align-items-center justify-content-start position-relative border border-2 border-primary bg-transparent w-100"
          style={{
            minHeight: '250px',
            cursor: 'pointer',
            outline: 'none',
          }}
          onClick={() => openModal('createMatch')}
        >
          <div className="position-absolute top-50 start-50 translate-middle">
            <div
              className="d-flex align-items-center justify-content-center rounded-circle bg-primary text-white"
              style={{
                width: '80px',
                height: '80px',
                fontSize: '2rem',
                boxShadow: '0 0 10px rgba(0,0,0,0.3)',
              }}
            >
              +
            </div>
          </div>
          <div className="text-center mt-5 text-muted fw-semibold">Crea una nuova partita</div>
        </button>
      </div>

      {/* 🔹 SLIDER CON LE PARTITE */}
      <div style={{ flex: '1 1 auto' }}>
        <Slider {...settings}>
          {matches.map(m => {
            const playerExists = findInArrByUid(m.players, user.userLogin.uid);
            return (
              <div key={m.id} className="p-2">
                <div className="card match-card h-100">
                  <div className="card-body d-flex flex-column">
                    <h6 className="card-title">{m.campo}</h6>
                    <p className="card-text small">
                      {new Date(m.data).toLocaleString()} – Calcio a {m.tipo}
                    </p>
                    <p className="card-text">
                      <strong>{m.players.length} iscritti </strong>
                      {playerExists && <strong>– Sei già iscritto</strong>}
                    </p>

                    <h6 className="mt-3">Aggiungi giocatori / ospiti</h6>
                    <MatchActions
                      match={m}
                      user={user}
                      handleJoin={handleJoin}
                      handleRemove={handleRemove}
                      handleModalAddGuest={handleModalAddGuest}
                      handleModalRemoveGuest={handleModalRemoveGuest}
                      handleDeleteMatch={handleDeleteMatch}
                      openDetailOverlay={openDetailOverlay}
                      closeDetailOverlay={closeDetailOverlay}
                      openModal={openModal}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default MatchSlider;
