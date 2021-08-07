import React, { useState, useEffect } from "react"
import Header from "./components/Header.js"
import Footer from "./components/Footer.js"
import TodoApp from "./components/TodoApp.js"

const App = () => {
  const LIST_KEY = "self.todoList"

  const [todoList, setTodoList] = useState([])
  const [completedNum, setCompletedNum] = useState(todoList.filter(todo => todo.completed === true).length)
  const todoWrapperVisibility = () => todoList.length !== 0 ? true : false
  const updateTodoList = (list) => {
    setTodoList(list)
    window.localStorage.setItem(LIST_KEY, JSON.stringify(list))
    setCompletedNum(list.filter(todo => todo.completed === true).length)
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

    const newTodo = {
      ...todoObj,
      id: randomId()
    }
    const newList = todoList.concat(newTodo)
    updateTodoList(newList)
  }

  const removeTodoById = (id) => {
    const newList = todoList.filter(todo => todo.id !== id)
    updateTodoList(newList)
  }

  const updateDescriptionOf = (id, editedText) => {
    const newList = todoList
    const indexOfId = newList.indexOf(newList.find(todo => todo.id === id))
    newList[indexOfId].description = editedText
    updateTodoList(newList)
  }

  const toggleCompletionById = (id) => {
    const newList = todoList
    const indexOfId = newList.indexOf(newList.find(todo => todo.id === id))
    newList[indexOfId].completed = !newList[indexOfId].completed
    updateTodoList(newList)
  }

  const clearCompletedTodos = () => {
    const newList = todoList.filter(todo => todo.completed === false)
    updateTodoList(newList)
  }

  // App execution starts here
  useEffect(() => {
    const selfTodoListJSON = window.localStorage.getItem(LIST_KEY)
    if (selfTodoListJSON) {
      const parsedList = JSON.parse(selfTodoListJSON)
      setTodoList(parsedList)
      setCompletedNum(parsedList.filter(todo => todo.completed === true).length)
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
        clearCompletedTodos={clearCompletedTodos}
        toggleCompletionById={toggleCompletionById}
        completedNum={completedNum}
        updateDescriptionOf={updateDescriptionOf} />
      <Footer />
    </div>
  )
}

export default App