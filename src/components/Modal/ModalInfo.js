import React from 'react';
import PropTypes from 'prop-types';

const ModalInfo = ({ title, message, type = 'info', closeModal }) => {
  const getModalStyle = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-success bg-opacity-25',
          text: 'text-success',
          icon: 'bi-check2',
        };
      case 'error':
        return {
          bg: 'bg-danger bg-opacity-25',
          text: 'text-danger',
          icon: 'bi-x-lg',
        };
      default:
        return {
          bg: 'bg-primary bg-opacity-25',
          text: 'text-primary',
          icon: 'bi-info-circle',
        };
    }
  };
  const { bg, text, icon } = getModalStyle();
  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog" data-testid="modal-open">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              data-testid="modal-btn-close"
              className="btn-close btn-close-white"
              onClick={closeModal}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body text-center py-4">
            <div className="d-flex flex-column align-items-center gap-3">
              <div
                className={`rounded-circle ${bg} ${text} d-flex align-items-center justify-content-center`}
                style={{ width: 60, height: 60 }}
              >
                <i className={`bi ${icon} fs-3`}></i>
              </div>
              <p className="mb-0 fs-6">{message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
ModalInfo.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'info']),
  closeModal: PropTypes.func.isRequired,
};
export default ModalInfo;
