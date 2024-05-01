import { useRef, useState } from "react";
import Card from "../UI/Card";
import styles from "./todosInput.module.css";
const TodosInput = (props) => {
  const [messageInInput, setMessageInInput] = useState(
    "What needs to be done?"
  );
  const [invalid, setInvalid] = useState(false);
  const inputValue = useRef();

  const setInvalidMessageAndView = () => {
    setMessageInInput("Todos should includes at least 1 letter");
    setInvalid(true);
  };

  const sendTodosAndSetValidMessage = (value = "") => {
    if (value.length > 0) {
      props.onEnter(value);
      setInvalid(false);
      return "";
    } else {
      setInvalidMessageAndView();
      return "";
    }
  };
  const createNewElementHandler = (e) => {
    if (e.key === "Enter") {
      inputValue.current.value = sendTodosAndSetValidMessage(e.target.value);
    }
  };
  const createNewElementFromButtonHandler = () => {
    inputValue.current.value = sendTodosAndSetValidMessage(
      inputValue.current.value
    );
  };
  // const createNewElementHandler = (e) => {
  //   if (e.key === "Enter") {
  //     if (e.target.value.length > 0) {
  //       props.onEnter(e.target.value);
  //       inputValue.current.value = "";
  //       setInvalid(false);
  //     } else {
  //       setInvalidMessage();
  //     }
  //   }
  // };
  // const createNewElementFromButtonHandler = () => {
  //   if (inputValue.current.value.length > 0) {
  //     props.onEnter(inputValue.current.value);
  //     inputValue.current.value = "";
  //     setInvalid(false);
  //   } else {
  //     setInvalidMessage();
  //   }
  // };
  const checkInvalidHandler = () => {
    if (inputValue.current.value.length === 0) {
      setInvalidMessageAndView();
    } else {
      setInvalid(false);
      setMessageInInput("What needs to be done?");
    }
  };

  return (
      <div className={styles['input-wrapper']}>
        <input
          ref={inputValue}
          placeholder={messageInInput}
          onKeyDown={createNewElementHandler}
          onChange={checkInvalidHandler}
          className={invalid ? styles["invalid-input"] : ''}
        />
        <button className={invalid ? styles["invalid-button"] : ''} onClick={createNewElementFromButtonHandler}>add</button>
      </div>
  );
};

export default TodosInput;
