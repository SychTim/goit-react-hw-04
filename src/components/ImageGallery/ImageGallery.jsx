import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

export default function ImageGallery({
  collection,
  modalState,
  setCurrentImg,
}) {
  return (
    <ul className={css.list}>
      {collection.map((card) => {
        return (
          <li
            key={card.id}
            className={css.card}
            onClick={() => {
              modalState(true);
              setCurrentImg(card);
            }}
          >
            <ImageCard card={card} />
          </li>
        );
      })}
    </ul>
  );
}
