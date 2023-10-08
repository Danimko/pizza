import styles from "./NotFoundBlock.module.scss";

export const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>☹</span> <br />
        Ничего не найдено
      </h1>
    </div>
  );
};
