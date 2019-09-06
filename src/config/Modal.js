import React from "react";
import ReactModal from "react-modal";
// import { LEADS_API } from "../../config/coms";

const customStyles = {
  content: { 
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

// Modal.setAppElement("#root");

class CustomModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
    };

    this.afterOpenModal = this.afterOpenModal.bind(this);
  }

  toggleModal = () => {
    this.setState({ modalIsOpen: !this.state.modalIsOpen });
  };


  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "#f00";
  }

  render() {
      const children = React.Children.map(this.props.children, child => {
        return React.cloneElement(child, {
          closeModal: () => {
              this.setState({ modalIsOpen: false })
          }
        });
      });
    return (
      <div>
        <button onClick={this.toggleModal}>{this.props.btnText}</button>
        <ReactModal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.toggleModal}
          style={customStyles}
          contentLabel={this.props.title}
        >
          <div className="flexbox">
            <h2 ref={subtitle => (this.subtitle = subtitle)}>
              {this.props.title}
            </h2>

            {children}

            <button onClick={this.toggleModal}>Close</button>
          </div>
        </ReactModal>
      </div>
    );
  }
}

export default CustomModal;