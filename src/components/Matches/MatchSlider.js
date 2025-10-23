import { Swiper, SwiperSlide } from 'swiper/react';
import { findInArrByUid } from 'utils/utils';
import 'swiper/css';
import MatchActions from 'components/Matches/MatchActions';
import React from 'react';
import { CAMPO_CALCIO_BG } from 'utils/Constant';

const MatchSlider = ({
  matches,
  title,
  showAddMatch,
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
  return (
    <div className="match-slider-container">
      {/* Card fissa */}
      {showAddMatch && (
        <div className="mb-3">
          <button
            type="button"
            className="card rounded-4 match-card h-100 d-flex align-items-center justify-content-start position-relative border border-2 border-primary bg-transparent w-100"
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
      )}
      <h5 className="text-center mb-3">{title}</h5>
      {/* Slider partite */}
      <div className="slider-container">
        <Swiper
          spaceBetween={16}
          slidesPerView={1} // default mobile
          breakpoints={{
            576: { slidesPerView: 1 },
            992: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
          }}
        >
          {matches.map(m => {
            const playerExists = findInArrByUid(m.players, user.userLogin.uid);
            return (
              <SwiperSlide key={m.id}>
                <div key={m.id} className="p-2">
                  <div className="card rounded-4 match-card h-100">
                    <img
                      src={CAMPO_CALCIO_BG}
                      alt="Campo da calcio"
                      className="rounded-4"
                      style={{ objectFit: 'cover', height: '180px' }}
                    />
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
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default MatchSlider;
