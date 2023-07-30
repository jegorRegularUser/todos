import { useState } from "react";
import styles from "./todosList.module.css";
const TodosList = (props) => {
  const [isAllCompleted, setIsAllCompleted] = useState(false);
  const deleteTodosHandler = (e) => {
    props.onDelete(e.target.id);
    if (props.listData.length === 1) {
      setIsAllCompleted(false);
    }
  };
  const checkBoxChangeAllHandler = () => {
    if (isAllCompleted === false) {
      setIsAllCompleted(true);
    } else {
      setIsAllCompleted(false);
    }
  };
  const checkBoxChangeHandler = (e) => {
    props.onCheckCompleted(e.target.checked, e.target.id);
  };
  const listData = props.listData.map((elementList) => {
    return (
      <div
        className={
          isAllCompleted ? styles.completed : styles.nav
        } /*сейчас стоит просто на все элементы, не знаю как нормально сделать */
        key={elementList.id}
      >
        <div className={styles.inline}>
          <input
            id={elementList.id}
            onChange={checkBoxChangeHandler}
            type='checkbox'
          ></input>

          <li id={elementList.id}> {elementList.text}</li>

          <button id={elementList.id} onClick={deleteTodosHandler}>
            delete
          </button>
        </div>
      </div>
    );
  });

  const deleteAllElements = () => {
    props.onDeleteAll();
    setIsAllCompleted(false);
  };

  return (
    <>
      {" "}
      <div className={styles.nav}>
        <div className={styles.inline}>
          <button onClick={deleteAllElements}>delete all</button>
          <button style={{ color: "#FF0000" }}>delete all completed</button>
          <button onClick={checkBoxChangeAllHandler}>make all completed</button>
        </div>
      </div>
      <ul className={styles.list}>{listData}</ul>
    </>
  );
};
export default TodosList;
