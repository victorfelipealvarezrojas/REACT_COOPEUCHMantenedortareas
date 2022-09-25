import { Header } from "./components/header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Tareas } from "./components/tareas";
import { NuevaTarea } from "./components/nueva-tarea";
import { EditarTarea } from "./components/editar-tarea";
import { Provider } from 'react-redux'
import store from "./redux/store";


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<Tareas />} />
            <Route path="/tareas/crear" element={<NuevaTarea />} />
            <Route path="/tareas/editar/:id" element={<EditarTarea />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
