import React from 'react';
import GeneralForm from 'components/Form/GeneralForm';

const ModalForm = ({ modalInfo, objSubmit = {}, closeModal }) => {
  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{modalInfo.modalTitle}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={closeModal}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <GeneralForm
              formId={modalInfo.mode}
              handleSubmit={modalInfo.handleSubmit}
              obj={objSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalForm;
