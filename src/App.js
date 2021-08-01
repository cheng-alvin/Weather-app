import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Modules/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route link="/" exact component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
