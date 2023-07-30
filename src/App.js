import TodosInput from "./components/todos/todosInput";
import TodosList from "./components/todos/todosList";
import React, { useState } from "react";
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
      return prevList.filter((todos) => todos.id !== Number(todosId));
    });
  };
  const deleteAllTodosElementHandler = () => {
    setTodosList([]);
  };

  const checkCompletedHandler = (state, id) => {
    setTodosList((prevList) => {
      const object = prevList.find((obj) => obj.id === Number(id));
      prevList.splice(
        prevList.findIndex((obj) => obj.id === Number(id)),
        1
      );
      // setCompleted(state);
      object.isCompleted = state;
      return [object, ...prevList].sort(function compareNumbers(a, b) {
        return b.id - a.id;
      });
    });
  };
  const commentAboutEmptyTodos =
    todosList.length > 0 ? "" : "Todos not here now";

  return (
    <React.Fragment>
      <TodosInput onEnter={createNewElementHandler} listData={todosList} />
      <TodosList
        onCheckCompleted={checkCompletedHandler}
        onDeleteAll={deleteAllTodosElementHandler}
        onDelete={deleteTodosElementHandler}
        // isCompleted={isCompleted} //need to change
        listData={todosList}
      />

      <h3 style={{ color: "#86bae8", textAlign: "center" }}>
        {commentAboutEmptyTodos}
      </h3>
    </React.Fragment>
  );
}

export default App;
