import "./App.css";
import Container from "./components/container/Container";
import NavBar from "./components/navigation/NavBar";
import Home from "./features/Home/Home";
import TodoList from "./features/TodoList";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Container>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/todo" element={<TodoList />} />
      </Routes>
    </Container>
  );
}

export default App;
