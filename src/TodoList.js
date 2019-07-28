import React from "react";
import { Person } from "blockstack";

class TodoList extends React.Component {
  state = {
    todos: [],
    newTodo: ""
  };

  componentDidMount() {
    this.fetchData();
  }

  handleSignout = () => {
    this.props.userSession.signUserOut(window.location.origin);
  };

  handleCheckboxClick(id) {
    let newTodos = [...this.state.todos];
    newTodos[newTodos.findIndex(todo => todo.id === id)].done = true;
    const options = { encrypt: true };
    this.props.userSession
      .putFile("todos.json", JSON.stringify(newTodos), options)
      .then(() => {
        this.setState({
          todos: newTodos
        });
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
    const options = { encrypt: true };
    this.props.userSession
      .putFile("todos.json", JSON.stringify(todos), options)
      .then(() => {
        this.setState({
          todos,
          newTodo: ""
        });
      });
  };

  async fetchData() {
    const options = { decrypt: true };
    const file = await this.props.userSession.getFile("todos.json", options);
    let todos = JSON.parse(file || "[]");
    this.setState({
      todos,
      user: new Person(this.props.userSession.loadUserData().profile)
    });
  }

  hanldeInputChange = e => {
    this.setState({
      newTodo: e.target.value
    });
  };

  render() {
    const { user } = this.state;

    return (
      <div
        style={{ padding: "30px 0" }}
        className="ui text container center aligned"
      >
        <button className="ui button negative" onClick={this.handleSignout}>
          Sign out
        </button>
        <h1>{user && user.name()}</h1>
        <img
          className="ui centered medium rounded image"
          src={user && user.avatarUrl()}
          alt="user profile image"
        />
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

export default TodoList;
