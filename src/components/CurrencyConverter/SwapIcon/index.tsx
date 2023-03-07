import { HTMLMotionProps, motion } from 'framer-motion';
import { AiOutlineSwap } from 'react-icons/ai';

const SwapIcon = ({
  setSwap,
  ...motionProps
}: HTMLMotionProps<'div'> & {
  setSwap: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <motion.div
      className='d-flex justify-content-center align-items-center pointer'
      onClick={() => setSwap((pre) => !pre)}
      {...motionProps}
    >
      <AiOutlineSwap />
    </motion.div>
  );
};

export default SwapIcon;
