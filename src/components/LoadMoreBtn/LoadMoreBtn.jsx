import css from './LoadMoreBtn.module.css';

export default function LoadMoreBtn({forClick}) {
  return <button className={css.button} onClick={() => {
    forClick(clicsNow => clicsNow + 1)
  }}>Load more</button>;
}
