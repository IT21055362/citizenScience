import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//pages and components
// import Home from './pages/Home'
import EventDisplay from './pages/orgEventManagement/eventDisplay';
import EventForm from './pages/orgEventManagement/EventForm';
import EventUpdate from './pages/orgEventManagement/eventUpdate';


import Reports from "./pages/dashboard/reportManagement/Reports";
import ReportDetails from "./pages/dashboard/reportManagement/ReportDetails";
import AddReport from "./pages/dashboard/reportManagement/AddReport";
import Error404 from "./pages/dashboard/ReportManagement/Error404";
import ReportDashboard from "./pages/dashboard/reportManagement/ReportDashboard";
import ReportInfo from "./pages/dashboard/reportManagement/ReportInfo";

import ReportPaymentReport from "./pages/dashboard/ReportManagement/ReportPaymentReport";
import PaymentInfo from "./pages/dashboard/ReportManagement/PaymentInfo";
import ReportRawMaterialReport from "./pages/dashboard/ReportManagement/RawMaterialReport";
import ReportReports from './pages/dashboard/ReportManagement/ReportReports';
import ReportStatus from './pages/dashboard/reportManagement/ReportStatus';

import Home from './pages/Home';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='pages'>
          <Routes>
            <Route path='/' element={<Home />}> </Route>
            <Route path="/allEvents" element={<EventDisplay />}></Route>

            <Route path="/event-form" element={<EventForm />}></Route>
            <Route path="/event/:id" element={<EventUpdate />}></Route>

            <Route path="/Report-dashboard" element={<ReportDashboard/>}/>
                <Route path="/Reports" element={<Reports />} />
                <Route path="/update-Report-details/:id" element={<ReportDetails />} />
                <Route path="/add-Report" element={<AddReport />} />
                <Route path="/Report-info/:id" element={<ReportInfo />} />
                <Route path="/Report-details" element={<Error404 />} />
                
                <Route path="/Report-reports/:name/:rawMaterial" element={localStorage.getItem('employee')?<ReportPaymentReport/>:<Navigate to='/not-authorized'/>} />
                <Route path="/Report-reports/:rawMaterial" element={localStorage.getItem('employee')?<ReportRawMaterialReport/>:<Navigate to='/not-authorized'/>} />
                <Route path="/Report-payment-info/:name/:rawMaterial" element={localStorage.getItem('employee')?<PaymentInfo/>:<Navigate to='/not-authorized'/>} />
                <Route path="/Report-reports" element={localStorage.getItem('employee')?<ReportReports/>:<Navigate to='/not-authorized'/>} />
                <Route path="/Report-status-reports/:status" element={localStorage.getItem('employee')?<ReportStatus/>:<Navigate to='/not-authorized'/>} />


          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
