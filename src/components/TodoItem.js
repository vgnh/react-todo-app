const TodoItem = ({ todoObj, destroyItem }) => {
  const handleDestroyItem = () => {
    destroyItem(todoObj.id)
  }
  return (
    <div className="todo-item">
      {/*<input id={todoObj.id} type="checkbox" />*/}
      <label htmlFor={todoObj.id}>{todoObj.description}</label>
      <button onClick={handleDestroyItem} className="destroy"></button>
    </div>
  )
}

export default TodoItem