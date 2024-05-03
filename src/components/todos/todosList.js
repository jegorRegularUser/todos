import { useState } from "react";
import styles from "./todosList.module.css";
const TodosList = (props) => {

  const deleteTodosHandler = (e) => {
    props.onDelete(e.target.id);
  };
  const checkBoxChangeHandler = (e) => {
    props.onCheckCompleted(e.target.checked, e.target.id);
  };
  const listData = props.currentList === 'AllTodos' ? props.listData.map((elementList) => {
    return (
      <div key={elementList.id} className={elementList.isCompleted ? styles['todo-wrapper']+' ' +styles.completed : styles['todo-wrapper']}>
        <input
          id={elementList.id}
          onChange={checkBoxChangeHandler}
          type='checkbox'
          checked={elementList.isCompleted}
        ></input>
        <label htmlFor={elementList.id} className={styles['custom-cb']}></label>
        <span className={elementList.isCompleted ? styles.completed : ''}> {elementList.text}</span>

        <button onClick={deleteTodosHandler} id={elementList.id}>
          delete
        </button>
      </div>
    );
  }) : props.currentList === 'CompletedTodos' ?
    props.listData.filter((todos) => todos.isCompleted === true).map((elementList) => {
      return (
          <div key={elementList.id} className={elementList.isCompleted ? styles['todo-wrapper']+' ' +styles.completed : styles['todo-wrapper']}>
            <input
              id={elementList.id}
              onChange={checkBoxChangeHandler}
              type='checkbox'
              checked={elementList.isCompleted}
            ></input>
            <label htmlFor={elementList.id} className={styles['custom-cb']}></label>
            <span className={elementList.isCompleted ? styles.completed : ''}> {elementList.text}</span>

            <button onClick={deleteTodosHandler} id={elementList.id}>
              delete
            </button>
          </div>
      );
    }) : props.listData.filter((todos) => todos.isCompleted === false).map((elementList) => {
      return (
          <div key={elementList.id} className={ styles['todo-wrapper']}>
            <input
              id={elementList.id}
              onChange={checkBoxChangeHandler}
              type='checkbox'
              checked={elementList.isCompleted}
            ></input>
            <label htmlFor={elementList.id} className={styles['custom-cb']}></label>
            <span className={elementList.isCompleted ? styles.completed : ''}> {elementList.text}</span>

            <button onClick={deleteTodosHandler} id={elementList.id}>
              delete
            </button>
          </div>
      );
    })

  const changeList = (e) => {
    props.onChangeList(e.target.id)
  }
  return (
    <>
      <div className={styles['categories-btns']}>
        <button className={props.currentList === 'AllTodos' ? '' : styles.unactive} id='AllTodos' onClick={changeList}>AllTodos</button>
        <button className={props.currentList === 'CompletedTodos' ? '' : styles.unactive} id='CompletedTodos' onClick={changeList} >CompletedTodos</button>
        <button className={props.currentList == 'UncompletedTodos' ? '' : styles.unactive} id='UncompletedTodos' onClick={changeList}>UncompletedTodos</button>
      </div>
      <div className={styles.wrapper}>

        <div className={props.currentList === 'AllTodos' ? styles['todos-wrapper'] : styles.nodisplay}>
          {listData}
          {props.children}
        </div>
        <div className={props.currentList === 'CompletedTodos' ? styles['todos-wrapper'] : styles.nodisplay}>
          {listData}
          {props.children}
        </div>
        <div className={props.currentList === 'UncompletedTodos' ? styles['todos-wrapper'] : styles.nodisplay}>
          {listData}
          {props.children}
        </div>
        <div className={styles['btn-wrapper']}>
          <button onClick={props.onDeleteAll}>Delete all</button>
          <button onClick={props.onDeleteAllCompletedTodos} >Delete all completed</button>
          <button onClick={props.onMakeAllTodosCompleted}>{props.isATC ? 'Make all uncompleted' : 'Make all completed'}</button>
        </div>
      </div>
    </>
  );
};
export default TodosList;
