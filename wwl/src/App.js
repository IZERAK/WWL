import AppRouter from "./components/AppRouter.jsx"
import "./style/App.css";

function App() {
  return (
    <div className="App">
      <div className="header"></div>
      <div className="main">
        <AppRouter />
      </div>
      <div className="footer"></div>
      <div></div>
    </div>
  );
}

export default App;
