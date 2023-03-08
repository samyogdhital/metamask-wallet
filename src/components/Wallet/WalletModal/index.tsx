import React from 'react';
import { Button, ModalProps } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import WalletDetails from '../WalletDetails';
import { metaMask } from '@/utils/metamask';

const WalletModal = (props: ModalProps) => {
  return (
    <>
      <Modal
        className=" fadeIn"
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        {...props}
      >
        <Modal.Header closeButton>
          <Modal.Title
            className="text-dark"
            id="example-custom-modal-styling-title"
            as="h5"
          >
            Wallet Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-dark">
          <WalletDetails accounts={props.accounts} provider={props.provider} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              metaMask.resetState();
            }}
          >
            Disconnect
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default WalletModal;
