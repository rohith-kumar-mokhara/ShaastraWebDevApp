import "./App.css";
import Tasks from "./pages/Tasks/Tasks.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddTask from "./pages/AddTask/AddTask.tsx";
import EditTask from "./pages/EditTask/EditTask.tsx";
import {ToastContainer} from "react-toastify"
function App() {
  return (
    <div className="App">
    <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Tasks />} />
          <Route path="/addTask" element={<AddTask />} />
          <Route path="/editTask/:taskId" element = {<EditTask />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
