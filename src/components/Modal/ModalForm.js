import React from 'react';
import GeneralForm from 'components/Form/GeneralForm';

const ModalForm = ({ modalInfo, objSubmit = {}, closeModal }) => {
  return (
    <>
      <div className="modal show d-block p-4" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-center ">
              <h5 className="modal-title m-0">{modalInfo.modalTitle}</h5>
              <button
                type="button"
                className="btn-close btn-close-white position-absolute end-0 me-3"
                onClick={closeModal}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body m-4">
              <div className="row justify-content-center ">
                <div className="col-12 col-lg-8">
                  <GeneralForm
                    formId={modalInfo.mode}
                    handleSubmit={modalInfo.handleSubmit}
                    obj={objSubmit}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};
export default ModalForm;
