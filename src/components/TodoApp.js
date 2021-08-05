import React, { useState } from 'react'
import TodoItem from './TodoItem'

const TodoApp = ({ todoList, todoWrapperVisibility, createNewTodo, removeTodoById, clearCompletedTodos }) => {
  const [newTodo, setNewTodo] = useState('')
  const [filter, setFilter] = useState('all')

  const todoWrapperStyle = {
    display: todoWrapperVisibility() ? '' : 'none'
  }

  const filteredList = (using) => {
    switch(using) {
      case "all": return todoList
      case "completed": return todoList.filter(todoObj => todoObj.completed === true)
      case "active": return todoList.filter(todoObj => todoObj.completed !== true)
      default: break
    }
  }

  const switchFilterTo = (newFilter) => {
    document.getElementById(filter).classList.remove("selected")
    document.getElementById(newFilter).classList.add("selected")
    setFilter(newFilter)
  }

  const handleCreateNewTodo = (event) => {
    if (event.key === "Enter" && newTodo !== '') {
      createNewTodo({
        description: newTodo,
        completed: false,
        editing: false
      })
      setNewTodo('')
    }
  }

  const handleDestroyItem = (id) => {
    removeTodoById(id)
  }

  const handleClearCompleted = () => {
    clearCompletedTodos()
  }

  return (
    <main className="todo-app">
      <input
        className="todo-input"
        type="text"
        value={newTodo}
        name="newTodo"
        id="newTodo"
        onChange={(event) => { setNewTodo(event.target.value) }}
        placeholder="What needs to be done?"
        onKeyPress={handleCreateNewTodo} />
      <div style={todoWrapperStyle} className="todo-wrapper">
        <input id="toggle-all" type="checkbox" className="toggle-all" />
        <label htmlFor="toggle-all"></label>
        <ul className="todo-list">
          {
            filteredList(filter).map((todoObj, index) =>
              <li key={index}>
                <TodoItem
                  todoObj={todoObj}
                  destroyItem={handleDestroyItem} />
              </li>
            )
          }
        </ul>
        <div className="todo-footer">
          <span className="todo-count">
            <strong>{todoList.length}</strong> item(s) left
          </span>
          <ul className="todo-filters">
            <li id="all" className="selected" onClick={() => switchFilterTo("all")}>All</li>
            <li id="active" className="" onClick={() => switchFilterTo("active")}>Active</li>
            <li id="completed" className="" onClick={() => switchFilterTo("completed")}>Completed</li>
          </ul>
          <button className="clear-completed-button" onClick={handleClearCompleted}>
            Clear completed ({todoList.filter(todo => todo.completed === true).length})
          </button>
        </div>
      </div>
    </main>
  )
}

export default TodoApp