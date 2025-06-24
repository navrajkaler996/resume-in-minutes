import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Form from "./components/Form";
import Preview from "./components/Preview";
import FormScreen from "./screens/FormScreen";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/form" element={<FormScreen />} />
      <Route path="/preview" element={<Preview />} />
    </Routes>
  );
}

export default App;
