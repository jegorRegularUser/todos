import TodosInput from "./components/todos/todosInput";
import TodosList from "./components/todos/todosList";
import React, { useState } from "react";
import "./index.css";
function App() {
  // const [isCompleted, setCompleted] = useState(false);
  const [todosList, setTodosList] = useState([
    {
      text: "learn react",
      id: 1,
      isCompleted: false,
    },
  ]);
  // console.log(todosList);
  const createNewElementHandler = (text) => {
    setTodosList((prevList) => [
      { text: text, id: prevList.slice(0)[0]?.id + 1 || 1, isCompleted: false }, //Math.random(1).toString()
      ...prevList,
    ]);
  };

  const deleteTodosElementHandler = (todosId) => {
    setTodosList((prevList) => {
      return prevList.filter((todos) => todos.id !== +todosId);
    });
  };
  const deleteAllTodosElementHandler = () => {
    setTodosList([]);
  };

  const checkCompletedHandler = (state, id) => {
    
    setTodosList((prevList) => {
      const obj = prevList.find((obj) => obj.id === +id);
      prevList.splice(
        prevList.findIndex((obj) => obj.id === +id),
        1
      );
      obj.isCompleted = state;

      return [obj, ...prevList].sort(function compareNumbers(a, b) {
        return b.id - a.id;
      });
    });
  };
  const commentAboutEmptyTodos =
    todosList.length ? "" : "There aren't any todos yet!";

  return (
    <>
      <div className="title">todos</div>
      <TodosInput onEnter={createNewElementHandler} listData={todosList} />
<TodosList onCheckCompleted={checkCompletedHandler}
        onDeleteAll={deleteAllTodosElementHandler}
        onDelete={deleteTodosElementHandler}
        // isCompleted={isCompleted} //need to change
        listData={todosList}> <div className="sub-title">
        {commentAboutEmptyTodos}
      </div></TodosList>
     
    </>
  );
}

export default App;
