import TodosInput from "./components/todos/todosInput";
import TodosList from "./components/todos/todosList";
import React, { useEffect, useState } from "react";
import "./index.css";
function App() {
  const [currentList, setCurrentList] = useState('AllTodos')
  const [todosList, setTodosList] = useState([
    {
      text: "learn react",
      id: 1,
      isCompleted: false,
    },
  ]);
  const createNewElementHandler = (text) => {
    setTodosList((prevList) => [
      { text: text, id: prevList.slice(0)[0]?.id + 1 || 1, isCompleted: false }, //.toString()
      ...prevList,
    ]);
    setIsAllTodosCompleted(false);
  };

  const deleteTodosElementHandler = (todosId) => {
    setTodosList((prevList) => {
      if (prevList.some((todos) => todos.isCompleted === false && todos.id !== +todosId)
    ) {
      setIsAllTodosCompleted(false)
    } else {
      setIsAllTodosCompleted(true)
    }
      return prevList.filter((todos) => todos.id !== +todosId);
    });
  };
  const deleteAllTodosHandler = () => {
    setTodosList([]);
    setIsAllTodosCompleted(false);
  };

  const checkCompletedHandler = (state, id) => {
    setTodosList((prevList) => {
      
      const obj = prevList.find((obj) => obj.id === +id);
      prevList.splice(
        prevList.findIndex((obj) => obj.id === +id),
        1
      );
      obj.isCompleted = state;

      if ([obj, ...prevList].some((todos) => todos.isCompleted === false)
    ) {
      setIsAllTodosCompleted(false)
    } else {
      setIsAllTodosCompleted(true)
    }
      return [obj, ...prevList].sort(function compareNumbers(a, b) {
        return b.id - a.id;
      });
    });
    
  };

  const [isAllTodosCompleted, setIsAllTodosCompleted] = useState(false);
  const makeAllTodosCompletedHandler = () => {
    setTodosList((prevList) => {
      if (prevList.every((todos) => todos.isCompleted === true)
      ) {
        setIsAllTodosCompleted(false);
        return prevList.map((todos) => { todos.isCompleted = false; return todos });
      }
      setIsAllTodosCompleted(true)
      return prevList.map((todos) => { todos.isCompleted = true; return todos });
      // return prevList.every((todos) => todos.isCompleted === true ) ?  prevList.map((todos) => { todos.isCompleted = false; return todos }) :
      //  prevList.map((todos) => { todos.isCompleted = true; return todos });
    });
  }
  const deleteAllCompletedTodosHandler = () => {
    setTodosList((prevList) => {
      return prevList.filter((todos) => todos.isCompleted === false);
    });
    setIsAllTodosCompleted(false);
  };

  const changeListHandler=(id)=>{
    setCurrentList(id)
  }
  return (
    <>
      <div className="title">todos</div>
      <TodosInput onEnter={createNewElementHandler} listData={todosList} />
      <TodosList onCheckCompleted={checkCompletedHandler}
        onDeleteAll={deleteAllTodosHandler}
        onDelete={deleteTodosElementHandler}
        onMakeAllTodosCompleted={makeAllTodosCompletedHandler}
        onDeleteAllCompletedTodos={deleteAllCompletedTodosHandler}
        onChangeList={changeListHandler}
        currentList={currentList}
        listData={todosList}
        isATC={isAllTodosCompleted}>
        <div className="sub-title">
          {todosList.length ? "" : "There aren't any todos yet!"}
        </div>
      </TodosList>

    </>
  );
}

export default App;
