import { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Users from "./components/Users";
import SearchBar from "./components/SearchBar";
import User from "./components/screens/User";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
class App extends Component {
  state = {
    users: [],
    loading: false,
    user: {},
    repos: [],
  };
  searchUsers = async (text) => {
    let users = await (
      await fetch(
        `https://api.github.com/search/users?q=${text}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`
      )
    ).json();
    console.log(users);
    this.setState({ users: users.items, loading: false });
  };
  getUser = async (username) => {
    const user = await (
      await fetch(
        `https://api.github.com/users/${username}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`
      )
    ).json();

    const repos = await (
      await fetch(
        `https://api.github.com/users/${username}/repos?per_page=5?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`
      )
    ).json();
    console.log(repos);

    this.setState({ user: user });
    this.setState({ repos: repos });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <div className="container">
              <Route exact path="/">
                <SearchBar search={this.searchUsers} />

                <Users users={this.state.users}></Users>
              </Route>
              <Route
                exact
                path="/user/:login"
                render={(props) => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    user={this.state.user}
                    repos={this.state.repos}
                  ></User>
                )}
              ></Route>
            </div>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
