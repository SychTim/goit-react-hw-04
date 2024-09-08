import { CiSearch } from "react-icons/ci";
import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";

export default function SearchBar({ onSubmit }) {
  const notify = () => toast.error("Search request can not be empty!");

  function handleSubmit(evt) {
    evt.preventDefault();

    const serchText = evt.target.elements.textField.value;

    if (serchText === "") {
      notify()
      return;
    }

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
        <Toaster
          position="bottom-center"
          toastOptions={{
            // Define default options
            className: "",
            duration: 5000,
          }}
        />
      </form>
    </header>
  );
}
