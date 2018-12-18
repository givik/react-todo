import React from 'react';

import TodoForm from './TodoForm';
import Todo from './Todo';

export default class TodoList extends React.Component {
  state = {
    todos: [],
    filter: 'none',
    toggleAllComplete: true
  };

  addTodo = todo => {
    this.setState(state => ({
      todos: [todo, ...state.todos]
    }));
  };

  toggleComplete = id => {
    this.setState(state => ({
      todos: state.todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            complete: !todo.complete
          };
        } else {
          return todo;
        }
      })
    }));
  };

  filterTodos = s => {
    this.setState({
      filter: s
    });
  };

  handleDelete = id => {
    this.setState(state => ({
      todos: state.todos.filter(todo => todo.id !== id)
    }));
  };

  removeCompletedTodos = () => {
    this.setState(state => ({
      todos: state.todos.filter(todo => !todo.complete)
    }));
  };

  render() {
    let todos = [];

    if (this.state.filter === 'none') {
      todos = this.state.todos;
    } else if (this.state.filter === 'active') {
      todos = this.state.todos.filter(todo => !todo.complete);
    } else if (this.state.filter === 'complete') {
      todos = this.state.todos.filter(todo => todo.complete);
    }

    return (
      <div>
        <TodoForm onSubmit={this.addTodo} />
        {todos.map(todo => (
          <Todo
            key={todo.id}
            toggleComplete={() => this.toggleComplete(todo.id)}
            onDelete={() => this.handleDelete(todo.id)}
            id={todo.id}
            todo={todo}
          />
        ))}
        <div>
          todos left: {this.state.todos.filter(todo => !todo.complete).length}
        </div>
        <div>
          <button onClick={() => this.filterTodos('none')}>all</button>
          <button onClick={() => this.filterTodos('active')}>active</button>
          <button onClick={() => this.filterTodos('complete')}>complete</button>
        </div>
        {this.state.todos.some(todo => todo.complete) ? (
          <div>
            <button onClick={this.removeCompletedTodos}>
              remove all complete items
            </button>
          </div>
        ) : null}
        <div>
          <button
            onClick={() =>
              this.setState(state => ({
                todos: state.todos.map(todo => ({
                  ...todo,
                  complete: state.toggleAllComplete
                })),
                toggleAllComplete: !state.toggleAllComplete
              }))
            }
          >
            toggle all complete: {`${this.state.toggleAllComplete}`}
          </button>
        </div>
      </div>
    );
  }
}
