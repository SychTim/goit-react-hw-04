import { useEffect, useState } from "react";
import { Grid } from "react-loader-spinner";
import { searchRequest } from "../../request";
import SearchBar from "../SearchBar/SearchBar";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import "./App.css";
import ImageModal from "../ImageModal/ImageModal";

function App() {
  const [collection, setCollection] = useState([]);
  const [error, setError] = useState(false);
  const [louding, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [topic, setTopic] = useState("");
  const [loadMore, setLoadMore] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState({ urls: { regular: "" } });

  function handleForm(serchText) {
    setCollection([]);
    setPage(1);
    setTopic(serchText);
  }

  function handleClickLoadMore() {
    setPage((currentPage) => currentPage + 1);
  }

  function handleClickCard(card) {
    setCurrentImg(card);
    setIsOpen(true);
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
      <SearchBar onSubmit={handleForm} />
      {collection.length > 0 && (
        <ImageGallery
          collection={collection}
          handleClickCard={handleClickCard}
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
      {loadMore && <LoadMoreBtn forClick={handleClickLoadMore} />}
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        currentImg={currentImg}
      />
    </div>
  );
}

export default App;
