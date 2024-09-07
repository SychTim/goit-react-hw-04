import { useEffect, useState } from "react";
import { Grid } from "react-loader-spinner";
import { searchRequest } from "../../request";
import SearchBar from "../SearchBar/SearchBar";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Modal from "react-modal";
import "./App.css";

function App() {
  const [collection, setCollection] = useState([]);
  const [error, setError] = useState(false);
  const [louding, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [topic, setTopic] = useState("");
  const [loadMore, setLoadMore] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState({ urls: {regular: ""}});
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  Modal.setAppElement(document.getElementById("root"));

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    async function searching() {
      if (topic === "") {
        return;
      }

      try {
        setError(false);
        setLoading(true);
        const response = await searchRequest(topic, page);
        setCollection((nowCollection) => {
          return [...nowCollection, ...response.data.results];
        });
        setLoadMore(() => {
          if (response.data.total_pages > page) {
            return true;
          }

          return false;
        });
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    searching();
  }, [topic, page]);

  return (
    <div id="yourAppElement">
      <SearchBar
        onSubmit={setTopic}
        pageDefault={setPage}
        preventColection={setCollection}
      />
      {collection.length > 0 && (
        <ImageGallery
          collection={collection}
          modalState={openModal}
          setCurrentImg={setCurrentImg}
        />
      )}
      {louding && (
        <Grid
          visible={true}
          height="80"
          width="80"
          color="white"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass="grid-wrapper"
        />
      )}
      {error && <ErrorMessage />}
      {loadMore && <LoadMoreBtn forClick={setPage} />}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal} className="modal-close-btn">close</button>
        <img
          src={currentImg.urls.regular}
          alt={currentImg.alt_description}
        />
      </Modal>
    </div>
  );
}

export default App;
