import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { NavBar } from "./cmps/NavBar";
import Favorites from "./pages/Favorites";
import WeatherApp from "./pages/WeatherApp";

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Router>
          <Route path="/favorites" component={Favorites} />
          <Route path="/" component={WeatherApp} exact />
        </Router>
      </Switch>
    </div>
  );
}

export default App;
