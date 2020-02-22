import '../../assets/main.css'

import React, { Component } from 'react'
import { Settings } from 'react-feather'
import Clock from 'react-live-clock'

import Add from '../../assets/icons/add.png'
import AddTodosOverlay from '../../components/AddTodosOverlay'
import SearchBar from '../../components/SearchBar'
import SettingsTray from '../../components/SettingsTray'
import SlideShow from '../../components/SlideShow'

const getWorkMode = localStorage.getItem('WorkMode')
export default class Main extends Component {
  constructor() {
    super()
    this.state = {
      todos: '',
      userName: localStorage.getItem('username'),
      searchError: false,
      showSettings: false,
      showAddTodosOverlay: false,
      showAddBtn: true,
      finished: JSON.parse(localStorage.getItem('Finished')),
      workMode: JSON.parse(getWorkMode) === null ? false : JSON.parse(getWorkMode)
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.checkTodos()
    }, 1)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  // Search error handler for flash message
  searchErrorHandler = () => {
    this.setState({ searchError: true })
  }

  // Function that runs continuously to check if todos array exists in state
  checkTodos = () => {
    const todosLocal = localStorage.getItem('Todos')
    const todos = JSON.parse(todosLocal)
    this.setState({
      todos
    })
    if (todos) {
      this.setState({
        showAddTodosOverlay: false,
        showAddBtn: false
      })
    } else {
      this.setState({
        showAddBtn: true
      })
    }
  }

  mainWorkModeToggle = () => {
    this.setState({ workMode: !this.state.workMode })
  }

  // Overlay for adding todos toggle handler
  addTodosOverlayHandler = () => {
    this.setState((prevState) => ({
      showAddTodosOverlay: !prevState.showAddTodosOverlay
    }))
  }

  // Settings Tray Handler
  openSettingsHandler = () => {
    this.setState({ showSettings: true })
  }

  closeSettingsHandler = () => {
    this.setState({ showSettings: false })
  }

  // Function for marking complete todo
  markCompleted = (e) => {
    const { id } = e.target
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    })
    const { todos } = this.state
    const todosStore = JSON.stringify(todos)
    localStorage.setItem('Todos', todosStore)
    this.checkFinished()
  }

  // Function called when Marking complete todo item so done button can appear
  checkFinished = () => {
    const { todos } = this.state
    const filtered = todos.filter((todo) => todo.completed === false)
    if (filtered.length === 0) {
      localStorage.setItem('Finished', true)
      const finished = localStorage.getItem('Finished')
      return this.setState({ finished: JSON.parse(finished) })
    } else {
      localStorage.setItem('Finished', false)
      const finished = localStorage.getItem('Finished')
      return this.setState({ finished: JSON.parse(finished) })
    }
  }

  // Done Button function
  clearTodos = () => {
    localStorage.removeItem('Todos')
    localStorage.setItem('Finished', false)
    this.setState({ finished: false })
  }

  render() {
    const { showSettings, userName, showAddTodosOverlay, todos, showAddBtn, finished, workMode } = this.state
    return (
      <div className="w-100 vh-100 d-flex flex-column justify-content-center align-items-center animated fadeIn">
        {/* Time */}
        <h1 className="time p-1">
          <Clock format="h:mma" interval={1000} />
        </h1>

        {/* Work mode message */}
        {workMode && (
          <h4 className="work-mode mt-11 bg-warning rounded p-3" style={{ opacity: '0.75' }}>
            You're in Work mode
          </h4>
        )}

        {/* add Todos Overlay */}
        {showAddTodosOverlay && (
          <AddTodosOverlay
            addTodosOverlayHandler={this.addTodosOverlayHandler}
            showAddTodosOverlay={showAddTodosOverlay}
            userName={userName}
          />
        )}

        <SearchBar searchErrorHandler={this.searchErrorHandler} workMode={workMode} />
        <div className="mt-9" />

        {/* carousel */}
        {workMode ? null : <SlideShow />}

        {/* Todo card */}
        {todos && (
          <div className={workMode ? 'mt-4 border' : 'todos-card float-right mr-2 mt-3'}>
            <div className="card-content shadow" style={{ width: '15rem' }}>
              <div className="card-body p-1">
                {finished ? (
                  <h6 className="card-title text-center text-uppercase">Good job {userName}</h6>
                ) : (
                  <h6 className="card-title text-center text-uppercase">{userName}'s Todos</h6>
                )}
              </div>
              <ul className="list-group">
                {todos.map((todo) => (
                  <li
                    key={todo.id}
                    className={
                      todo.completed
                        ? 'list-group-item p-3 pl-3 pr-3 line-through animated shake'
                        : 'list-group-item p-3 pl-3 pr-3'
                    }
                    style={{ fontSize: '0.85rem' }}
                  >
                    <input
                      type="checkbox"
                      onChange={this.markCompleted}
                      id={todo.id}
                      className="float-right check"
                      style={{ cursor: 'pointer' }}
                      checked={todo.completed ? true : false}
                    />
                    {todo.title}
                  </li>
                ))}
                {finished && (
                  <button className="btn-success p-2 animated fadeIn border-0" onClick={this.clearTodos}>
                    Done
                  </button>
                )}
              </ul>
            </div>
          </div>
        )}

        {/* Add Todos Button */}
        {showAddBtn && (
          <img
            className="add-btn mr-2 mt-2"
            title={`Add Todos ${userName}`}
            src={Add}
            alt="add"
            onClick={this.addTodosOverlayHandler}
            style={{ cursor: 'pointer' }}
          />
        )}

        {/* settings */}
        <SettingsTray
          showSettings={showSettings}
          mainWorkModeToggle={this.mainWorkModeToggle}
          userName={userName}
          workMode={workMode}
          closeSettingsHandler={this.closeSettingsHandler}
        />
        <Settings
          onClick={this.openSettingsHandler}
          className="fixed-bottom ml-3 mb-3"
          size="30"
          style={{ cursor: 'pointer' }}
        />
      </div>
    )
  }
}
