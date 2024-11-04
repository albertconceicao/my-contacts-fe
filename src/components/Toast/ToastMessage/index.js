import PropTypes from 'prop-types';

import { useEffect } from 'react';
import { Container } from './styles';

import dangerIcon from '../../../assets/images/icons/danger.svg';
import successIcon from '../../../assets/images/icons/success.svg';

export function ToastMessage({
 message, onRemoveMessage,
}) {
    useEffect(() => {
       const timeOutID = setTimeout(() => onRemoveMessage(message.id), message.duration || 7000);

       return () => {
        clearTimeout(timeOutID);
       };
    }, [message, onRemoveMessage]);
    function handleRemoveToast() {
        onRemoveMessage(message.id);
    }
    return (
      <Container
        type={message.type}
        onClick={handleRemoveToast}
        tabIndex={0}
        role="button"
      >
        {message.type === 'danger' && <img src={dangerIcon} alt="danger icon" />}
        {message.type === 'success' && <img src={successIcon} alt="success icon" />}
        <strong>
          {message.text}
        </strong>
      </Container>
    );
}

ToastMessage.propTypes = {
    message: PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['success', 'danger', 'default']),
        duration: PropTypes.number,
    }).isRequired,
    onRemoveMessage: PropTypes.func.isRequired,
};
