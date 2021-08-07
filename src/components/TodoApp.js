import React, { useState } from 'react'
import TodoItem from './TodoItem.js'

const TodoApp = ({ todoList, todoWrapperVisibility, createNewTodo, removeTodoById, clearCompletedTodos, toggleCompletionById, completedNum, updateDescriptionOf, toggleCompletedAllFrom }) => {
  const [newTodo, setNewTodo] = useState('')
  const [filter, setFilter] = useState('all')

  const todoWrapperStyle = {
    display: todoWrapperVisibility() ? '' : 'none'
  }

  const filteredList = (using) => {
    switch (using) {
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

  const handleToggleCompletion = (id) => {
    toggleCompletionById(id)
  }

  const handleClearCompleted = () => {
    clearCompletedTodos()
  }

  const handleToggleAll = () => {
    toggleCompletedAllFrom(filteredList(filter))
  }

  const toggleAllChecked = () => {
    const list = filteredList(filter)
    return list.some(todo => todo.completed === false) || list.length === 0 ? false : true
  }

  const handleDoubleClickOnLi = (todoObj) => {
    // Add "editing" to <li>
    document.getElementById(todoObj.id).classList.add("editing")
    // Add style changes to the hidden input
    const liInput = document.getElementById(`${todoObj.id}hidden`)
    liInput.classList.add("edit")
    liInput.type = "text"
    liInput.value = todoObj.description
    liInput.focus()
  }

  const handleHiddenEnter = (event, id) => {
    if (event.key === "Enter") {
      const editedText = event.target.value
      if (editedText !== '') {
        // If text is present, update todo
        updateDescriptionOf(id, editedText)

        // Update label as well because it doesn't update until refresh
        document.getElementById(`${id}label`).textContent = editedText
      }
      else {
        // If text has been erased completely, remove todo
        removeTodoById(id)
      }

      // Reverse style changes
      // Remove "editing" from the <li>
      document.getElementById(id).classList.remove("editing")
      // Remove changes from the hidden input
      const liInput = document.getElementById(`${id}hidden`)
      liInput.classList.remove("edit")
      liInput.type = "hidden"
      liInput.value = ""
    }
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
        <input id="toggle-all" type="checkbox" className="toggle-all" onChange={handleToggleAll} checked={toggleAllChecked()} />
        <label htmlFor="toggle-all"></label>
        <ul className="todo-list">
          {
            filteredList(filter).map((todoObj, index) =>
              <li id={todoObj.id} key={index} onDoubleClick={() => handleDoubleClickOnLi(todoObj)} className="">
                <TodoItem todoObj={todoObj} destroyItem={handleDestroyItem} toggleCompletion={handleToggleCompletion} />
                <input
                  id={`${todoObj.id}hidden`}
                  type="hidden"
                  className="hidden-input"
                  onKeyPress={(event) => handleHiddenEnter(event, todoObj.id)} />
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
            Clear completed ({completedNum})
          </button>
        </div>
      </div>
    </main>
  )
}

export default TodoApp