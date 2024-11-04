import { useCallback, useEffect, useState } from 'react';
import { toastEventManager } from '../../../utils/toast';
import { ToastMessage } from '../ToastMessage';
import { Container } from './styles';

export function ToastContainer() {
    const [messages, setMessages] = useState([]);
    function addToast({ type, text, duration }) {
        setMessages((prevState) => [
            ...prevState,
            {
                id: Math.random(),
                type,
                text,
                duration,
            },
        ]);
    }

    useEffect(() => {
        function handleAddToast({ type, text, duration }) {
            addToast({ type, text, duration });
        }
        toastEventManager.on('addtoast', handleAddToast);

        return () => {
            toastEventManager.removeListener('addtoast', handleAddToast);
        };
    }, []);
    const handleRemoveToast = useCallback((id) => {
        setMessages((prevState) => prevState.filter((message) => message.id !== id));
    }, []);

    return (
      <Container>
        {messages.map((message) => (
          <ToastMessage
            key={message.id}
            message={message}
            onRemoveMessage={handleRemoveToast}
          />
        ))}
      </Container>
    );
}
