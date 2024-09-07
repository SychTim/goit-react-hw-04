import { CiSearch } from "react-icons/ci";
import css from "./SearchBar.module.css";

export default function SearchBar({ onSubmit, pageDefault, preventColection }) {
  function handleSubmit(evt) {
    evt.preventDefault();
    preventColection([]);

    const serchText = evt.target.elements.textField.value;

    if (serchText === "") {
      return;
    }

    pageDefault(1);
    onSubmit(serchText);
  }

  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit} className={css.form}>
        <button type="submit" className={css.button}>
          <CiSearch size={20} color="black" />
        </button>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          name="textField"
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
