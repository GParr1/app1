import React, { useState } from 'react';
import { teamInfo } from 'utils/infoTeam';
import { authUpdateProfile, doSignOut } from 'utils/authUtils';
import UploadProfilePicture from 'components/UploadProfilePicture';
import { RedirectOnLogin } from 'utils/RedirectOnLogin';
import FormUser from 'components/FormUser';
import CardBronze from 'components/FifaCard/CardBronze';

// Mock dati di esempio
const mockStats = {
  2022: { partite: 18, gol: 12, assist: 5 },
  2023: { partite: 21, gol: 15, assist: 7 },
};

const mockCoppe = [
  { anno: 2022, nome: 'Torneo Estivo' },
  { anno: 2023, nome: 'Coppa Invernale' },
];

export const MyAccountView = ({ user }) => {
  const [selectedTeam, setSelectedTeam] = useState('Juventus');
  const [showModal, setShowModal] = useState(false);
  const [showModalUpdateImage, setShowModalUpdateImage] = useState(false);

  if (!user) {
    return <RedirectOnLogin />;
  }
  const openModal = type => {
    if (type === 'updateProfile') setShowModal(true);
    if (type === 'updateImage') setShowModalUpdateImage(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setShowModalUpdateImage(false);
  };

  const handleSave = async e => {
    e.preventDefault();
    const form = e.target;
    // Converti in oggetto semplice
    const formObject = {
      firstName: form.querySelector('[name="firstName"]').value,
      lastName: form.querySelector('[name="lastName"]').value,
      birthDate: form.querySelector('[name="birthDate"]').value,
      height: form.querySelector('[name="height"]').value,
      jerseyNumber: form.querySelector('[name="jerseyNumber"]').value,
    };
    console.log(formObject);
    await authUpdateProfile(formObject);
    setShowModal(false);
  };
  return (
    <div className="container mt-5">
      <div className="row">
        {/* Figurina Panini */}
        <div className="col-md-4 mb-4 d-flex flex-column align-items-center">
          <CardBronze />
          <select
            className="mb-3 col-12"
            value={selectedTeam}
            onChange={e => setSelectedTeam(e.target.value)}
          >
            {Object.keys(teamInfo).map(team => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
        </div>

        {/* Statistiche e Coppe */}
        <div className="col-md-8">
          <div className="d-flex justify-content-between mb-3">
            <h1 className="text-center mb-5">{user.displayName || user.email}</h1>
            {/* Bottone per aprire il modale */}
            <div className="d-flex justify-content-end">
              <button className="btn" onClick={() => openModal('updateProfile')}>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-hidden="false"
                >
                  <title>Completa il tuo profilo</title>
                  <circle cx="12" cy="8" r="4" fill="#4F46E5"></circle>
                  <path d="M4 20c0-4 4-6 8-6s8 2 8 6v1H4v-1z" fill="#4F46E5"></path>
                </svg>
              </button>
              <button className="btn" onClick={() => openModal('updateImage')}>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-hidden="false"
                >
                  <title>Cambia immagine del profilo</title>
                  <path
                    d="M5 20h14a2 2 0 0 0 2-2v-7l-3-3h-4l-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"
                    stroke="#2563EB"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <circle cx="12" cy="13" r="3" stroke="#2563EB" strokeWidth="2"></circle>
                </svg>
              </button>
              <button className="btn" onClick={doSignOut}>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-hidden="false"
                >
                  <title>Esci dal profilo</title>
                  <path
                    d="M16 17L21 12L16 7"
                    stroke="#DC2626"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M21 12H9"
                    stroke="#DC2626"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M12 19C7.58172 19 4 15.4183 4 11C4 6.58172 7.58172 3 12 3"
                    stroke="#DC2626"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="card mb-4 shadow-sm">
            <h5 className="card-title m-4 text-center">Statistiche Personali</h5>
            <div className="card-body row">
              {Object.entries(mockStats).map(([anno, stats]) => (
                <div key={anno} className="text-center border  col-6 col-md-4">
                  <h6 className="text-primary">Stagione {anno}</h6>
                  <ul className="list-group list-group-flush">
                    <li className="d-flex list-group-item justify-content-between">
                      <span>Partite giocate: </span>
                      <span>{stats.partite}</span>
                    </li>
                    <li className="d-flex list-group-item justify-content-between">
                      <span>Gol: </span>
                      <span>{stats.gol}</span>
                    </li>
                    <li className="d-flex list-group-item justify-content-between">
                      <span>Assist: </span>
                      <span>{stats.assist}</span>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
          {/* Coppe */}
          <div className="card shadow-sm">
            <h5 className="card-title m-4 text-center">Coppe Vinte</h5>
            <div className="card-body row">
              {mockCoppe.length > 0 ? (
                <ul className="list-group list-group-flush">
                  {mockCoppe.map((coppa, idx) => (
                    <li key={idx} className="list-group-item">
                      <div key={idx} className="text-center border  col-6 col-md-4">
                        <h6 className="text-primary">{coppa.anno}</h6>
                        <div className="d-flex list-group-item justify-content-between">
                          <span>🏆</span>
                          <span>{coppa.nome}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Nessuna coppa vinta... ancora!</p>
              )}
            </div>
          </div>

          {/* Modale personalizzato */}
          {showModal && (
            <div
              className="modal fade show d-block"
              tabIndex="-1"
              style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Completa il tuo profilo</h5>
                    <button type="button" className="btn-close" onClick={closeModal}></button>
                  </div>
                  <div className="modal-body">
                    <FormUser id={'updateProfile'} onSubmit={handleSave} />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={closeModal}>
                      Chiudi
                    </button>
                    <button type="button" className="btn btn-primary" onClick={handleSave}>
                      Salva
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Modale personalizzato */}
          {showModalUpdateImage && (
            <div
              className="modal fade show d-block"
              tabIndex="-1"
              style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Carica la tua immagine</h5>
                    <button type="button" className="btn-close" onClick={closeModal}></button>
                  </div>
                  <div className="modal-body">
                    <UploadProfilePicture />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
