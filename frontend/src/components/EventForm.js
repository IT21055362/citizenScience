import { useState } from "react";
import { Link } from 'react-router-dom'

const EventForm = () => {
  const [orgName, setOrgName] = useState('')
  const [eventType, setEventType] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [name, setName] = useState('')
  const [contactNo, setContactNo] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()


    const orgEvent = { orgName, eventType, location, date, name, contactNo }

    const response = await fetch('/api/orgEvents', {
      method: 'POST',
      body: JSON.stringify(orgEvent),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const json = await response.json()
    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setOrgName('')
      setEventType('')
      setLocation('')
      setDate('')
      setName('')
      setContactNo('')
      setError(null)
      console.log('Event added', json)
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
            <li className="breadcrumb-item active">Add a Community Service Event</li>
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
                <h6 className="card-title">Add a Community Service Event</h6>


                {/* {error &&
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {error}
                    <button type="button" className="btn" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>
                } */}

                {/* <!-- Vertical Form --> */}
                <form className="row g-3" onSubmit={handleSubmit}>
                  <div className="col-12">
                    <label  >Enter Organization Name: </label>
                    <input type="text" onChange={(e) => setOrgName(e.target.value)} value={orgName} />
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
                    <label for="inputEmail" className="form-label">Enter the date you planning to organize the event:</label>
                    <input type="date" onChange={(e) => setDate(e.target.value)} value={date} />
                  </div>
                  <div className="col-12">
                    <label for="inputPhone" className="form-label">Your Name:</label>
                    <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
                  </div>
                  <div className="col-12">
                    <label for="inputAddress" className="form-label">Contact Number:</label>
                    <input type="text" onChange={(e) => setContactNo(e.target.value)} value={contactNo} />

                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">Submit Event Details</button>
                  </div>
                </form>
                {/* <!-- Vertical Form --> */}

              </div>
            </div>
          </div>
          <div className="col-lg-4">
          </div>
        </div>
      </section>

    </main>
  )
}

export default EventForm