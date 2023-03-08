import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import type { ModalProps } from 'react-bootstrap/Modal';

type Props = ModalProps & { onConfirm: () => void };

const ConnectWallet = ({ onConfirm, ...props }: Props) => {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="text-dark">
        <h4 className="text-center m-auto">Connect to MetaMask</h4>
      </Modal.Header>
      <Modal.Body className="text-dark">
        <p className="text-center">
          Are you sure you want to connect to MetaMask ?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onConfirm}>Connect</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConnectWallet;
