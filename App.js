import React, { useState, useEffect } from 'react';
import './App.css';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPriority, setNewPriority] = useState('medium');
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState('');
  const [currentEditedItem, setCurrentEditedItem] = useState('');

  useEffect(() => {
    const savedTodo = JSON.parse(localStorage.getItem('todolist')) || [];
    const savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos')) || [];

    setTodos(savedTodo);
    setCompletedTodos(savedCompletedTodo);
  }, []);

  useEffect(() => {
    localStorage.setItem('todolist', JSON.stringify(allTodos));
    localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
  }, [allTodos, completedTodos]);

  const handleAddTodo = () => {
    const newTodoItem = {
      title: newTitle,
      description: newDescription,
      priority: newPriority,
      completed: false,
    };

    setTodos(prevTodos => [...prevTodos, newTodoItem]);
    setNewTitle('');
    setNewDescription('');
    setNewPriority('medium');
  };

  const handleDeleteTodo = index => {
    const updatedTodos = [...allTodos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const handleComplete = index => {
    const now = new Date();
    const completedOn = now.toLocaleString();

    const completedItem = {
      ...allTodos[index],
      completedOn: completedOn,
      completed: true,
    };

    setCompletedTodos(prevCompletedTodos => [...prevCompletedTodos, completedItem]);
    handleDeleteTodo(index);
  };

  const handleDeleteCompletedTodo = index => {
    const updatedCompletedTodos = [...completedTodos];
    updatedCompletedTodos.splice(index, 1);
    setCompletedTodos(updatedCompletedTodos);
  };

  const handleEdit = (ind, item) => {
    setCurrentEdit(ind);
    setCurrentEditedItem(item);
  };

  const handleUpdateTitle = value => {
    setCurrentEditedItem(prevItem => ({ ...prevItem, title: value }));
  };

  const handleUpdateDescription = value => {
    setCurrentEditedItem(prevItem => ({ ...prevItem, description: value }));
  };

  const handleUpdatePriority = value => {
    setCurrentEditedItem(prevItem => ({ ...prevItem, priority: value }));
  };

  const handleUpdateToDo = () => {
    const updatedTodos = [...allTodos];
    updatedTodos[currentEdit] = currentEditedItem;
    setTodos(updatedTodos);
    setCurrentEdit('');
  };

  const handleClearCompleted = () => {
    setCompletedTodos([]);
  };

  return (
    <div className="App">
      <h1>ishal-apps</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              placeholder="What's the task title?"
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={e => setNewDescription(e.target.value)}
              placeholder="What's the task description?"
            />
          </div>
          <div className="todo-input-item">
            <label>Priority</label>
            <select value={newPriority} onChange={e => setNewPriority(e.target.value)}>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="todo-input-item">
            <button type="button" onClick={handleAddTodo} className="primaryBtn">
              Add
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button
            className={`secondaryBtn ${!isCompleteScreen && 'active'}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen && 'active'}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>

        <div className="todo-list">
          {isCompleteScreen
            ? completedTodos.map((item, index) => (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>
                      <small>Completed on: {item.completedOn}</small>
                    </p>
                  </div>

                  <div>
                    <AiOutlineDelete
                      className="icon"
                      onClick={() => handleDeleteCompletedTodo(index)}
                      title="Delete?"
                    />
                  </div>
                </div>
              ))
            : allTodos.map((item, index) => (
                <div className={`todo-list-item ${item.priority}`} key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p className="priority-label">{item.priority}</p>
                  </div>

                  <div>
                    <AiOutlineDelete
                      className="icon"
                      onClick={() => handleDeleteTodo(index)}
                      title="Delete?"
                    />
                    <BsCheckLg
                      className="check-icon"
                      onClick={() => handleComplete(index)}
                      title="Complete?"
                    />
                    <AiOutlineEdit
                      className="icon"
                      onClick={() => handleEdit(index, item)}
                      title="Edit?"
                    />
                  </div>
                </div>
              ))}
          {isCompleteScreen && completedTodos.length > 0 && (
            <button className="clearBtn" onClick={handleClearCompleted}>
              Clear Completed
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
