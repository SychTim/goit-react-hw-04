import css from "./ImageCard.module.css";

export default function ImageCard({ card }) {
  return (
    <div className={css.card}>
      <img src={card.urls.small} alt="" width="350" />
    </div>
  );
}
