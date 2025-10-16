import Slider from 'react-slick';
import { findInArrByUid } from 'utils/utils';
import { checkMaxPlayersMatch } from 'utils/matchUtils';
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
    slidesToShow: 3, // quante card visibili
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Slider {...settings}>
      {/* CARD INIZIALE PER CREARE UNA PARTITA */}
      <div key="create-match" className="p-2">
        <button
          type="button"
          className="card match-card h-100 d-flex align-items-center justify-content-center position-relative border border-2 border-primary bg-transparent w-100"
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

      {/* LE ALTRE PARTITE */}
      {matches.map(m => {
        const playerExists = findInArrByUid(m.players, user.userLogin.uid);
        const isMaxPlayers = checkMaxPlayersMatch({ match: m });
        return (
          <div key={m.id} className="p-2">
            <div className="card match-card h-100">
              <div className="card-body d-flex flex-column">
                <h6 className="card-title">{m.campo}</h6>
                <p className="card-text small">
                  {new Date(m.data).toLocaleString()} – Calcio a {m.tipo}
                </p>
                <p className="card-text">
                  <strong>{m.players.length} iscritti</strong>
                </p>
                {playerExists && (
                  <p className="card-text">
                    <strong>Sei già iscritto</strong>
                  </p>
                )}
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
                <div className="mt-auto">
                  <div className="d-flex gap-2 flex-wrap">
                    {!playerExists && (
                      <button
                        className="btn btn-primary btn-sm flex-grow-1"
                        onClick={() => handleJoin(m.id)}
                      >
                        Iscriviti ➕
                      </button>
                    )}
                    {playerExists && (
                      <button
                        className="btn btn-danger btn-sm flex-grow-1"
                        onClick={() => handleRemove(m.id)}
                      >
                        Cancellati ❌
                      </button>
                    )}
                  </div>
                  {isMaxPlayers ? (
                    <button
                      className="btn btn-secondary btn-sm w-100 mb-2"
                      onClick={() =>
                        openModal('addGuest', 'Aggiungi Guest', m.id, handleModalAddGuest)
                      }
                    >
                      Aggiungi Guest
                    </button>
                  ) : (
                    <button
                      className="btn btn-secondary btn-sm w-100 mb-2"
                      onClick={() =>
                        openModal('removeGuest', 'Rimuovi Guest', m.id, handleModalRemoveGuest)
                      }
                    >
                      Rimuovi Guest
                    </button>
                  )}
                  <button
                    className="btn btn-info btn-sm w-100 mb-2"
                    onClick={() => openDetailOverlay(m, closeDetailOverlay)}
                  >
                    Guarda Formazione
                  </button>
                  <button
                    className="btn btn-danger btn-sm mt-2 w-100"
                    onClick={() => handleDeleteMatch(m.id)}
                  >
                    Elimina Partita ❌
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </Slider>
  );
};

export default MatchSlider;
