import React from 'react';
import { ModalProps } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import WalletDetails from '../WalletDetails';

const WalletModal = (props: ModalProps) => {
  return (
    <>
      <Modal
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        {...props}
      >
        <Modal.Header closeButton>
          <Modal.Title
            className="text-danger"
            id="example-custom-modal-styling-title"
          >
            Wallet Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-danger">
          <WalletDetails accounts={props.accounts} provider={props.provider} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default WalletModal;
