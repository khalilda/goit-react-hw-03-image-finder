import { Component } from 'react';
import PropTypes from 'prop-types';
import ModalStyle from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyModalClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyModalClose);
  }

  handleKeyModalClose = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className={ModalStyle.overlay} onClick={this.handleBackdropClick}>
        <div className={ModalStyle.modal}>
          <img
            className={ModalStyle.modalImage}
            src={this.props.currentImage}
            alt="lalala"
          />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  currentImage: PropTypes.string.isRequired,
};
