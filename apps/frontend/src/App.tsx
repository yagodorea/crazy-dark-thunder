import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CharacterCreatePage from './pages/CharacterCreatePage';
import CharactersListPage from './pages/CharactersListPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CharacterCreatePage />} />
          <Route path="/characters" element={<CharactersListPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
