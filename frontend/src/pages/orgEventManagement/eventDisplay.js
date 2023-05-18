import {
  useEffect, useState
} from "react";
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'

//components 
import EventDetails from '../../components/EventDetails.js'
import EventForm from './EventForm.js'

const EventDisplay = () => {

  const [orgEvents, setOrgEvents] = useState(null)
  const [orgEvent, setOrgEvent] = useState(null);
  const [orgName, setOrgName] = useState('')
  const [eventType, setEventType] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [name, setName] = useState('')
  const [contactNo, setContactNo] = useState('')

  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('/api/orgEvents/')
      const json = await response.json()

      if (response.ok) {
        setOrgEvents(json)
      }
    }

    fetchEvents()
  }, [])

  const handleDeleteSubmit = async (e, event) => {
    e.preventDefault()

    const response = await fetch(`http://localhost:4000/api/orgEvents/${event._id}`, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      console.log(json.error)
    }

    if (response.ok) {
      console.log('event deleted', json)
      navigate("/")
      window.location.reload();
    }
  }

  return (
    <main id="main" className="main">

      {/* Header and Navigation  */}
      <div className="pagetitle">
        <h1>Citizen Science</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to={{ pathname: `/dashboard/` }}>Home</Link></li>
            <li className="breadcrumb-item active">Community Service Events</li>
          </ol>
        </nav>
      </div>
      {/* <!-- End Page Title --> */}
      {/* 
      <SearchBar
        searchTerm={getSearchTerm}
        searchCategory={getSearchCategory}
      /> */}
      <section className="section">
        <div className="row">
          <div className="col-lg-12">

            <div className="card">
              {/* <center><button type="button" onClick={printReport} class="btn btn-primary btn-sm">Download as pdf</button></center> */}
              <div className="card-body" id="saveTable">

                <h5 className="card-title">Community Service Events</h5>

                {/* <!-- Default Table --> */}
                <table className="table">
                  <thead>
                    <tr>
                      {/* <th scope="col">ID</th> */}
                      <th scope="col">Organization Name</th>
                      <th scope="col">Event Type</th>
                      <th scope="col">Location</th>
                      <th scope="col">Date</th>
                      <th scope="col">Organizer's Name</th>
                      <th scope="col">Contact Number</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>


                    {/* {searchTerm === "" ? staffs && staffs.map((staff) => ( */}
                    {orgEvents && orgEvents.map((orgEvent) => (
                      // <EventDetails key={orgEvent._id} orgEvent={orgEvent} =>
                      <tr key={orgEvent._id}>
                        {/* <th scope="row">{orgEvent._id}</th> */}
                        <td>{orgEvent.orgName}</td>
                        <td>{orgEvent.eventType}</td>
                        <td>{orgEvent.location}</td>
                        <td>{orgEvent.date}</td>
                        <td>{orgEvent.name}</td>
                        <td>{orgEvent.contactNo}</td>
                        <td> {/*<Link to={{ pathname: `/org/${orgEvent._id}` }}>Update</Link> */}
                          <Link to={{
                            pathname: `/event/${orgEvent._id}`,
                            state: {
                              orgName: orgEvent.orgName,
                              eventType: orgEvent.eventType,
                              location: orgEvent.location,
                              date: orgEvent.date,
                              name: orgEvent.name,
                              contactNo: orgEvent.contactNo
                            }
                          }}>Update</Link>
                        </td>
                        <td>
                          {/* <button onClick={handleDeleteSubmit} >Delete</button> */}
                          <button onClick={(e) => handleDeleteSubmit(e, orgEvent)}>Delete</button>
                        </td>


                      </tr>

                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div>
        <Link to="/event-form" className="btn btn-primary"> Organize an event
        </Link>
      </div>

    </main>

  );



}

export default EventDisplay;