import { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import User from "./components/User";
class App extends Component {
  state = {
    users: [],
    loading: false,
  };
  async componentDidMount() {
    let users = await (await fetch("https://api.github.com/users")).json();
    console.log(users);
    this.setState({users: users, loading: false})
  }
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
        <User users={this.state.users}></User>
        </div>
      </div>
    );
  }
}

export default App;
