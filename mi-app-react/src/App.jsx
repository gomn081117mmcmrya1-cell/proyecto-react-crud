import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navegacion from './components/Navegacion';

import Inicio from './pages/Inicio';
import Listado from './pages/Listado';
import Registro from './pages/Registro';
import AcercaDe from './pages/AcercaDe';
import NoEncontrado from './pages/NoEncontrado';

function App() {
  return (
    <BrowserRouter>
      <Navegacion />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/listado" element={<Listado />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/acerca" element={<AcercaDe />} />
        <Route path="*" element={<NoEncontrado />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;