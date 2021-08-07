import React from "react"

const TodoItem = ({ todoObj, destroyItem, toggleCompletion }) => {
  const handleDestroyItem = () => {
    destroyItem(todoObj.id)
  }

  const handleToggleCompletion = () => {
    toggleCompletion(todoObj.id)
  }

  return (
    <div className={`todo-item${todoObj.completed === true ? " completed" : ""}`}>
      <input
        className="toggle-box"
        type="checkbox"
        onChange={handleToggleCompletion}
        checked={todoObj.completed} />
      <label id={`${todoObj.id}label`}>{todoObj.description}</label>
      <button onClick={handleDestroyItem} className="destroy"></button>
    </div>
  )
}

export default TodoItem