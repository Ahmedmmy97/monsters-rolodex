import React, { Component } from "react";
import "./App.css";
import { CardList } from "./Components/card-list/card-list.component";
import { SearchBox } from "./Components/search-box/search-box.component";
class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchfield: ""
    };
  }
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => this.setState({ monsters: users }))
      .catch(error =>
        this.setState({ monsters: [{ name: String(error), id: "error" }] })
      );
  }
  render() {
    const { monsters, searchfield } = this.state;
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchfield.toLowerCase())
    );
    return (
      <div className="App">
      <h1>Monster Rolodox</h1>
        <SearchBox
          placeholder="Search Monsters"
          onChange={e => this.setState({ searchfield: e.target.value })}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
