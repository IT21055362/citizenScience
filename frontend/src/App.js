import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//pages and components
// import Home from './pages/Home'
import EventDisplay from './pages/orgEventManagement/eventDisplay';
import EventForm from './components/EventForm';
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

            <Route path="/event-form" element={<EventForm />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
