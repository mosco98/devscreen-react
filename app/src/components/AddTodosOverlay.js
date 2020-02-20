import '../assets/main.css'

import React, { Component } from 'react'
import { X } from 'react-feather'
import uuid from 'uuid'

export default class AddTodosOverlay extends Component {
  constructor() {
    super()
    this.state = {
      todoTitle: '',
      todos: [],
      ready: false,
      error: '',
      addedTodos: false
    }
  }

  checkReady = () => {
    const { todos } = this.state

    if (todos.length === 1) {
      this.setState({ ready: false })
    } else {
      this.setState({ ready: true })
    }
  }
  todoInput = (e) => {
    this.setState({
      todoTitle: e.target.value
    })
  }
  submitTodo = (e) => {
    e.preventDefault()
    const { todos, todoTitle } = this.state
    if (todoTitle === '') {
      return null
    }
    const title = todoTitle.charAt(0).toUpperCase() + todoTitle.slice(1)
    const newTodo = {
      id: uuid.v4(),
      title,
      completed: false
    }
    if (todos.length <= 4) {
      return this.setState({
        todos: [...this.state.todos, newTodo],
        todoTitle: '',
        ready: true
      })
    }
    return this.setState({
      error: `Can't have more than 5 todos in a day`
    })
  }

  deleteTodo = (e) => {
    const { id } = e.target
    this.setState({
      todos: [...this.state.todos.filter((todo) => todo.id !== id)],
      error: '',
      todoTitle: ''
    })
    this.checkReady()
  }

  setTodos = () => {
    const { todos } = this.state
    localStorage.setItem('Todos', JSON.stringify(todos))
    localStorage.setItem('Finished', false)
    this.setState({
      addedTodos: true
    })
  }
  render() {
    const { userName } = this.props
    const { todos, todoTitle, error, ready, addedTodos } = this.state

    return (
      <div className="position-fixed shadow w-100 p-5 vh-100 z-index-max todos-overlay d-flex justify-content-center align-items-center animated fadeIn faster">
        <X className="close-todos mr-3 mt-3" onClick={this.props.addTodosOverlayHandler} color={'#fff'} />
        <div
          className={
            addedTodos
              ? 'container p-3 w-75 d-flex flex-column align-items-center justify-content-center'
              : 'container p-3 w-75 d-flex flex-column align-items-center justify-content-between'
          }
          style={{ height: '30rem' }}
        >
          {addedTodos ? (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h4 style={{ color: 'white' }}>Setting up Todos</h4>
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="w-50 text-center">
              <h3 className="text-secondary">{error ? `Oops ${userName}` : `Hi, ${userName}`}</h3>
              {error ? <p>{error}</p> : <p>What are your Todos for today?</p>}
              <form className={error ? 'w-100 hide' : 'w-100'} onSubmit={this.submitTodo}>
                <input
                  type="text"
                  className="form-control w-100"
                  placeholder="Enter Todo"
                  autoFocus={true}
                  onChange={this.todoInput}
                  value={todoTitle}
                />
              </form>
              <ul className="list-group w-100">
                {todos.map((todo) => (
                  <li
                    className="li list-group-item border-0 p-3 mt-2 w-100 d-flex justify-content-between align-items-center animated fadeIn"
                    key={todo.id}
                    style={{ color: 'white', fontSize: '1rem' }}
                  >
                    {todo.title}
                    <button
                      className="btn btn-danger btn-sm"
                      // style={{ height: '30px' }}
                      id={todo.id}
                      onClick={this.deleteTodo}
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button
            className={ready ? 'left-0 btn btn-success btn-sm animated fadeIn' : 'left-0 hide animated fadeOut'}
            onClick={this.setTodos}
          >
            Set Todos
          </button>
        </div>
      </div>
    )
  }
}
