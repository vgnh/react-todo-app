import React from "react"

const TodoItem = ({ todoObj, destroyItem, toggleCompletion }) => {
  const handleDestroyItem = () => {
    destroyItem(todoObj.id)
  }

  const handleToggleCompletion = () => {
    toggleCompletion(todoObj.id)
  }

  return (
    <div id={todoObj.id} className={`todo-item${todoObj.completed === true ? " completed" : ""}`}>
      <input
        id="toggle-box"
        className="toggle-box"
        type="checkbox"
        onChange={handleToggleCompletion}
        checked={todoObj.completed} />
      <label htmlFor="toggle-box">{todoObj.description}</label>
      <button onClick={handleDestroyItem} className="destroy"></button>
    </div>
  )
}

export default TodoItem