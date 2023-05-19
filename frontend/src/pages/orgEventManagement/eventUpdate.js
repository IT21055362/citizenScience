import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const EventUpdate = () => {

  const locations = useLocation();

  let initialOrgName, initialEventType, initialLocation, initialDate, initialName, initialContactNo;

  if (locations.state) {
    ({ initialOrgName: initialOrgName, initialEventType: initialEventType, initialLocation: initialLocation, initialDate: initialDate, initialName: initialName, initialContactNo: initialContactNo } = locations.state);
  }
  // Extract the state data from the location object
  // const { orgName: initialOrgName, eventType: initialEventType, location: initialLocation, date: initialDate, name: initialName, contactNo: initialContactNo } = locations.state;

  // const locations = { state: { initialOrgName: 'a', x: 'b' } }

  const [orgEvent, setOrgEvent] = useState(null);
  // const [orgName, setOrgName] = useState('');
  // const [eventType, setEventType] = useState('');
  // const [location, setLocation] = useState('');
  // const [date, setDate] = useState('');
  // const [name, setName] = useState('');
  // const [contactNo, setContactNo] = useState('');

  const [orgName, setOrgName] = useState(initialOrgName);
  const [eventType, setEventType] = useState(initialEventType);
  const [location, setLocation] = useState(initialLocation);
  const [date, setDate] = useState(initialDate);
  const [name, setName] = useState(initialName);
  const [contactNo, setContactNo] = useState(initialContactNo);

  const [error, setError] = useState(null)
  const navigate = useNavigate();


  //'http://localhost:4000/event/:id' + orgEvent.id,

  const handleUpdateSubmit = async (e) => {
    e.preventDefault()

    console.log(orgName, eventType, location, date, name, contactNo);

    const response = await fetch(`http://localhost:4000/event/${location.state._id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        orgName: orgName,
        eventType: eventType,
        location: location,
        date: date,
        name: name,
        contactNo: contactNo

      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      console.log(json.error)
    }

    if (response.ok) {
      console.log('User updated', json)
      window.location.reload();
    }
  }

  useEffect(() => {
    const fetchEvent = async () => {

      const response = await fetch("/api/orgEvents/")
      const json = await response.json()
      if (response.ok) {
        setOrgEvent(
          {
            orgName: `${json["orgName"]}`,
            eventType: `${json["eventType"]}`,
            location: `${json["location"]}`,
            date: `${json["date"]}`,
            name: `${json["name"]}`,
            contactNo: `${json["contactNo"]}`,
            _id: `${json["_id"]}`
          })
        setName(json["name"])
        setDate(json["date"])
        setOrgName(json["orgName"])
        setEventType(json["eventType"])
        setLocation(json["location"])
        setContactNo(json["contactNo"])
      } else {
        console.log("not ok")
      }

    }

    fetchEvent()

  }, [setOrgEvent])


  return (
    <main id="main" className="main">

      {/* Header and Navigation  */}
      <div className="pagetitle">
        <h1>Citizen Science</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to={{ pathname: `/dashboard/` }}>Home</Link></li>
            <li className="breadcrumb-item active">Update a Community Service Event</li>
          </ol>
        </nav>
      </div>
      {/* End of Header and Navigation  */}
      <section className="section">
        <div className="row">
          <div className="col-lg-4">
          </div>
          <div className="col-lg-5">

            <div className="card">
              <div className="card-body">
                <h6 className="card-title">Update a Community Service Event</h6>


                {/* {error &&
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {error}
                    <button type="button" className="btn" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>
                } */}

                {/* <!-- Vertical Form --> */}
                <form className="row g-3" onSubmit={handleUpdateSubmit}>
                  <div className="col-12">
                    <label  >Enter Organization Name: </label>
                    <input type="text" value={orgName} onChange={(e) => setOrgName(e.target.value)} />


                  </div>
                  <div class="col-12">
                    <label >Choose Event Type: </label>
                    <select id="eventType" name="eventType" value={eventType} onChange={(e) => setEventType(e.target.value)}>
                      <option selected>Beach Clean Up</option>
                      <option >Fund Raiser</option>
                      <option >Public Awareness Session</option>
                    </select>

                  </div>

                  <div className="col-12">
                    <label >Select the Location:</label>
                    <div class="col-sm-10">
                      <input type="text" onChange={(e) => setLocation(e.target.value)} value={location} />

                    </div>
                  </div>

                  <div className="col-12">
                    <label for="inputDate" className="form-label">Enter the date you planning to organize the event:</label>
                    <input type="date" onChange={(e) => setDate(e.target.value)} value={date} />

                  </div>
                  <div className="col-12">
                    <label for="inputPhone" className="form-label">Your Name:</label>
                    <input type="text" onChange={(e) => setName(e.target.value)} value={name} />

                  </div>
                  <div className="col-12">
                    <label for="inputAddress" className="form-label">Contact Number:</label>
                    <input type="text" onChange={(e) => setContactNo(e.target.value)} value={contactNo} />


                    {/* {error && <div className="alert alert-danger">{error}</div>} Display error if present */}


                  </div>

                  <div className="text-center" >
                    <button type="reset " className="btn btn-reset btn btn-secondary" btn btn-secondary onClick={() => navigate("/allEvents")}>  Cancel </button>
                    <button type="submit" className="btn btn-submit btn btn-primary" onClick={() => navigate("/allEvents")}>Update Event</button>
                  </div>
                </form>
                {/* <!-- Vertical Form --> */}

              </div>
            </div>
          </div>
          <div className="col-lg-4">
          </div>
        </div>
      </section >

    </main >
  )
}
export default EventUpdate;
