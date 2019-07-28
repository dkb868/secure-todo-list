import React from "react";
import { UserSession, AppConfig } from "blockstack";

const appConfig = new AppConfig(["store_write"]);
const userSession = new UserSession({ appConfig: appConfig });

class App extends React.Component {
  state = {
    todos: [],
    newTodo: ""
  };

  handleCheckboxClick(id) {
    let newTodos = [...this.state.todos];
    newTodos[newTodos.findIndex(todo => todo.id === id)].done = true;
    this.setState({
      todos: newTodos
    });
  }

  handleAddTodoClick = e => {
    e.preventDefault();
    const newTodo = {
      id: this.state.todos.length + 1,
      title: this.state.newTodo,
      done: false
    };
    const todos = [...this.state.todos];
    todos.push(newTodo);
    this.setState({
      todos: todos,
      newTodo: ""
    });
  };

  hanldeInputChange = e => {
    this.setState({
      newTodo: e.target.value
    });
  };

  handleSignIn = () => {
    userSession.redirectToSignIn();
  };

  render() {
    return (
      <div
        style={{ padding: "30px 0" }}
        className="ui text container center aligned"
      >
        <button className="ui button positive" onClick={this.handleSignIn}>
          Sign in with blockstack
        </button>
        <h2>My Todos</h2>
        <div className="ui grid">
          <div className="row centered">
            <div className="column twelve wide">
              <form className="ui form" onSubmit={this.handleAddTodoClick}>
                <div className="inline fields">
                  <div className="twelve wide field">
                    <input
                      type="text"
                      value={this.state.newTodo}
                      onChange={this.hanldeInputChange}
                    />
                  </div>
                  <button className="ui button primary" type="submit">
                    Add todo
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="row centered">
            <div className="column twelve wide">
              <div className="grouped fields">
                {this.state.todos
                  .filter(todo => !todo.done)
                  .map(todo => (
                    <div key={todo.id} className="field">
                      <div className="ui checkbox">
                        <input
                          type="checkbox"
                          onClick={() => {
                            this.handleCheckboxClick(todo.id);
                          }}
                        />
                        <label>{todo.title}</label>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
