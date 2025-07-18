import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home";

import Preview from "./components/Preview";
import FormScreen from "./screens/FormScreen";
import TemplateScreen from "./screens/TemplateScreen";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/template" element={<TemplateScreen />} />
      <Route path="/form/:templateid" element={<FormScreen />} />
      <Route path="/preview/:templateid" element={<Preview />} />
    </Routes>
  );
}

export default App;
