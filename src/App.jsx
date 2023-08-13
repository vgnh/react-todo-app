import React, { useState, useEffect } from "react"
import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"
import TodoApp from "./components/TodoApp.jsx"
import { v4 as uuidv4 } from "uuid"

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
    const newTodo = {
      ...todoObj,
      id: uuidv4()
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

  const toggleCompletedAllFrom = (list) => {
    const atleastOneNotCompleted = list.find(todo => todo.completed === false)
    const newList = todoList
    if (atleastOneNotCompleted) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].completed === false) {
          newList.find(todo => todo.id === list[i].id).completed = true
        }
      }
    }
    else {
      // If everything is already completed, then toggle to !completed
      for (let i = 0; i < list.length; i++) {
        newList.find(todo => todo.id === list[i].id).completed = false
      }
    }
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
        updateDescriptionOf={updateDescriptionOf}
        toggleCompletedAllFrom={toggleCompletedAllFrom} />
      <Footer />
    </div>
  )
}

export default App
