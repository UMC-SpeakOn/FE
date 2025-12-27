import { ClipLoader } from 'react-spinners';

const Spinner = ({ size = 40, color = 'black' }) => {
  return <ClipLoader color={color} size={size} />;
};

export default Spinner;
