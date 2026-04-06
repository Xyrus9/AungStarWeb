import { Alert } from 'react-bootstrap';
import '../AdminDashboard.css';

const Message = ({ variant, children }) => {
  return <Alert variant={variant} className='admin-message'>{children}</Alert>;
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;