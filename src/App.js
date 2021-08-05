import React, { useState, useEffect } from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import TodoApp from "./components/TodoApp"

const App = () => {
  const LIST_KEY = "self.todoList"

  const [todoList, setTodoList] = useState([])
  const todoWrapperVisibility = () => todoList.length !== 0 ? true : false
  const updateTodoList = (list) => {
    setTodoList(list)
    window.localStorage.setItem(LIST_KEY, JSON.stringify(list))
  }

  const createNewTodo = (todoObj) => {
    const randomId = () => {
      const randCharCode = () => Math.floor(Math.random() * (123 - 97) + 97)
      const randAlphabet = () => String.fromCharCode(randCharCode())
      const randStr = (len) => {
        let s = ''
        for (let i = 0; i < len; i++)
          s = s.concat(randAlphabet())
        return s
      }
      return randStr(5) + window.crypto.getRandomValues(new Uint32Array(1)).toString(16)
    }

    const newTodoObj = {
      ...todoObj,
      id: randomId()
    }
    const newList = todoList.concat(newTodoObj)
    updateTodoList(newList)
  }

  const removeTodoById = (id) => {
    const newList = todoList.filter(todoObj => todoObj.id !== id)
    updateTodoList(newList)
  }

  const clearCompletedTodos = () => {
    const newList = todoList.filter(todoObj => todoObj.completed === false)
    updateTodoList(newList)
  }

  // App execution starts here
  useEffect(() => {
    const selfTodoListJSON = window.localStorage.getItem(LIST_KEY)
    if (selfTodoListJSON) {
      const parsedList = JSON.parse(selfTodoListJSON)
      setTodoList(parsedList)
    }
    else {
      window.localStorage.setItem(LIST_KEY, JSON.stringify([]))
    }
  }, [])

  return (
    <div className="main-wrapper">
      <Header />
      <TodoApp
        todoList={todoList}
        todoWrapperVisibility={todoWrapperVisibility}
        createNewTodo={createNewTodo}
        removeTodoById={removeTodoById}
        clearCompletedTodos={clearCompletedTodos} />
      <Footer />
    </div>
  )
}

export default App