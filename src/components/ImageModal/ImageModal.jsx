import Modal from "react-modal";

Modal.setAppElement(document.getElementById("root"));

export default function ImageModal({modalIsOpen,afterOpenModal,closeModal,currentImg}) {
    const customStyles = {
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "black",
        },
      };
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal} className="modal-close-btn">
          close
        </button>
        <img src={currentImg.urls.regular} alt={currentImg.alt_description} />
      </Modal>
    </div>
  );
}
