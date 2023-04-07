import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//pages and components
import Home from './pages/Home'
import EventDisplay from './pages/orgEventManagement/eventDisplay';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='pages'>
          <Routes>
            <Route
              path="/"
              element={<EventDisplay />}>

            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
