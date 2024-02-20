import { Route, Routes } from 'react-router-dom';
import './App.css';
import { HomeApp } from './components/HomeApp';



function App() {
  return (
    <>
      <Routes>
         <Route exact path='/' element={<HomeApp />} />
      </Routes>
    </>
  );
}

export default App;
