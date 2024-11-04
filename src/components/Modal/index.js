import PropTypes from 'prop-types';
import Button from '../Button';
import { ReactPortal } from '../ReactPortal';
import { Container, Footer, Overlay } from './styles';

export function Modal({
    title,
    children,
    danger,
    cancelLabel,
    confirmLabel,
    onCancel,
    onConfirm,
    visible,
    isLoading,
    }) {
    if (!visible) {
        return null;
    }

    return (
      <ReactPortal containerId="modal-root">
        <Overlay>
          <Container danger={danger}>
            <h1>{title}</h1>
            <div className="modal-body">
              {children}
            </div>
            <Footer>
              <button
                type="button"
                className="cancel-button"
                onClick={onCancel}
                disabled={isLoading}
              >
                {cancelLabel}
              </button>
              <Button
                danger
                type="button"
                onClick={onConfirm}
                isLoading={isLoading}
              >
                {confirmLabel}
              </Button>
            </Footer>
          </Container>
        </Overlay>
      </ReactPortal>
    );
}

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    danger: PropTypes.bool,
    children: PropTypes.node.isRequired,
    cancelLabel: PropTypes.string,
    confirmLabel: PropTypes.string,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool,
};

Modal.defaultProps = {
    danger: false,
    cancelLabel: 'Cancelar',
    confirmLabel: 'Confirmar',
    isLoading: false,
};
