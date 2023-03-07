import Modal from 'react-bootstrap/Modal';
import type { ModalProps } from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

type Props = ModalProps & { onConfirm: () => void };

const ConnectWallet = ({ onConfirm, ...props }: Props) => {
  return (
    <Modal
      {...props}
      size='sm'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Body className='text-danger'>
        <h4 className='text-center'>Connect to MetaMask</h4>
        <p className='text-center'>Are you sure you want to connect ?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onConfirm}>Connect</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConnectWallet;
