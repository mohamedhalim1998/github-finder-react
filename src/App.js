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

    const res = await (
      await fetch(
        `https://api.github.com/users/${username}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`
      )
    ).json();
    console.log(res)

    this.setState({ user: res});
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/">
              <div className="container">
                <SearchBar search={this.searchUsers} />

                <Users users={this.state.users}></Users>
              </div>
            </Route>
            <Route
              exact
              path="/user/:login"
              render={(props) => (
                <User
                  {...props}
                  getUser={this.getUser}
                  user={this.state.user}
                ></User>
              )}
            ></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
