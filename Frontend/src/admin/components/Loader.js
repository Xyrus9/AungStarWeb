import { Spinner } from 'react-bootstrap';
import '../AdminDashboard.css';

const Loader = () => {
  return (
    <div className='admin-loader-wrap'>
      <Spinner animation='border' role='status' className='admin-loader'></Spinner>
    </div>
  );
};

export default Loader;