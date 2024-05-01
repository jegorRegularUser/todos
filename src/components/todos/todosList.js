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
        className={ styles['todos-wrapper']} // isAllCompleted ? styles.completed : need to change!!!!!!!!!!!!!!!!!
        key={elementList.id}
      >
        <div className={styles['todo-wrapper']}>
          <input
          id={elementList.id}
            onChange={checkBoxChangeHandler}
            type='checkbox'
          ></input>
          <label htmlFor={elementList.id} className={styles['custom-cb']}></label>
          <span > {elementList.text}</span>

          <button onClick={deleteTodosHandler} id={elementList.id}>
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
      
      <div className={styles.wrapper}>
        {listData}
        {props.children}
      <div className={ styles['btn-wrapper'] }>
          <button onClick={deleteAllElements}>Delete all</button>
          <button style={{ color: "var(--invalid-red)" }}>Delete all completed</button>
          <button onClick={checkBoxChangeAllHandler}>Make all completed</button>
        </div>
      </div>
    </>
  );
};
export default TodosList;
