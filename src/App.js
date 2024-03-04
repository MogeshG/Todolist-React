import React, { useState, useEffect } from "react";
import "./App.css";

function TodoList() {
    const [isScreen, setScreen] = useState(false);
    const [allTodo, setTodo] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [completeTodo, setCompleteTodo] = useState([]);

    useEffect(() => {
        const todoListData = JSON.parse(localStorage.getItem("todoList")) || [];
        setTodo(todoListData);
    }, []);

    useEffect(() => {
        const todoListData =
            JSON.parse(localStorage.getItem("completedList")) || [];
        setCompleteTodo(todoListData);
    }, []);

    const addTodo = () => {
        let newTodo = {
            title: newTitle,
            description: newDescription,
        };
        let updatedTodo = [...allTodo];
        updatedTodo.push(newTodo);
        setTodo(updatedTodo);

        localStorage.setItem("todoList", JSON.stringify(updatedTodo));
    };

    const deleteTodo = (index, val) => {
        if (val === 0) {
            let deleteItem = [...allTodo];
            deleteItem.splice(index, 1);
            localStorage.setItem("todoList", JSON.stringify(deleteItem));
            setTodo(deleteItem);
        }
        if (val === 1) {
            let deleteItem = [...completeTodo];
            deleteItem.splice(index, 1);
            localStorage.setItem("completedList", JSON.stringify(deleteItem));
            setCompleteTodo(deleteItem);
        }
    };

    const tickTodo = (index) => {
        let completedItem = [...completeTodo];
        completedItem.push(allTodo[index]);
        deleteTodo(index, 0);
        localStorage.setItem("completedList", JSON.stringify(completedItem));
        setCompleteTodo(completedItem);
    };

    return (
        <div className="todoList">
            <h2>TODO LIST</h2>
            <div className="container">
                <div className="inputContainer">
                    <div className="inputItems">
                        <p>Title</p>
                        <input
                            className="title"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            placeholder="Enter the title"
                        ></input>
                    </div>
                    <div className="inputItems">
                        <p>Description</p>
                        <input
                            className="description"
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            placeholder="Enter the description"
                        ></input>
                    </div>
                    <button className="addButton" onClick={addTodo}>
                        Add
                    </button>
                </div>
                <div className="categoryContainer">
                    <button
                        className={`todoButton ${
                            isScreen === false && "active"
                        }`}
                        onClick={() => {
                            setScreen(false);
                        }}
                    >
                        Todo
                    </button>
                    <button
                        className={`completedButton ${
                            isScreen === true && "active"
                        }`}
                        onClick={() => {
                            setScreen(true);
                        }}
                    >
                        Completed
                    </button>
                </div>
                <div className="todoItemsContainer">
                    {isScreen === false &&
                        allTodo.map((item, index) => {
                            return (
                                <div className="todoItem" key={index}>
                                    <div className="dataContainer">
                                        <span className="itemTitle">
                                            {item.title}
                                        </span>
                                        <span className="itemDescription">
                                            {item.description}
                                        </span>
                                    </div>
                                    <button
                                        className="deleteButton"
                                        onClick={() => {
                                            deleteTodo(index, 0);
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                        >
                                            <path
                                                fill="#ffffff"
                                                d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                                            />
                                        </svg>
                                    </button>
                                    <button
                                        className="tickButton"
                                        onClick={() => {
                                            tickTodo(index);
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                        >
                                            <path
                                                fill="rgb(24, 204, 24)"
                                                d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            );
                        })}
                    {isScreen === true &&
                        completeTodo.map((item, index) => {
                            return (
                                <div className="todoItem" key={index}>
                                    <div className="dataContainer">
                                        <span className="itemTitle">
                                            <strike>{item.title}</strike>
                                            <space> </space>
                                            <i>Completed</i>
                                        </span>
                                        <span className="itemDescription">
                                            {item.description}
                                        </span>
                                    </div>
                                    <button
                                        className="deleteButton"
                                        onClick={() => {
                                            deleteTodo(index, 1);
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                        >
                                            <path
                                                fill="#ffffff"
                                                d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

export default TodoList;
