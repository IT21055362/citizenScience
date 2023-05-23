import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'

const EventForm = () => {
  const [orgName, setOrgName] = useState('')
  const [eventType, setEventType] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [name, setName] = useState('')
  const [contactNo, setContactNo] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  // const validateContactNo = () => {
  //   const contactNoRegex = /^(0\d{9}|\d{9})$/; // Regex for 9 digits or 10 digits starting with 0
  //   if (!contactNo.match(contactNoRegex)) {
  //     setError("Contact Number must be a 9-digit number or a 10-digit number starting with 0.");
  //   } else {
  //     setError(null);
  //   }
  // };

  const validateContactNo = () => {
    const contactNoRegex = /^(0\d{9}|\d{9})$/; // Regex for 9 digits or 10 digits starting with 0
    if (!contactNo.match(contactNoRegex)) {
      setError("Contact Number must be a 9-digit number or a 10-digit number starting with 0.");
      return false;
    } else {
      setError(null);
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    const isContactNoValid = validateContactNo();
    if (!isContactNoValid) {
      return;
    }


    const orgEvent = { orgName, eventType, location, date, name, contactNo }

    const response = await fetch(`http://localhost:4000/api/orgEvents`, {
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
    else {
      setOrgName('')
      setEventType('')
      setLocation('')
      setDate('')
      setName('')
      setContactNo('')
      setError(null)
      console.log('Event added', json)
      navigate("/allEvents")
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


                {error &&
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {error}
                    <button type="button" className="btn" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>
                }

                {/* <!-- Vertical Form --> */}
                <form className="row g-3" onSubmit={handleSubmit}>
                  <div className="col-12">
                    <label  >Enter Organization Name: </label>
                    <input type="text" onChange={(e) => setOrgName(e.target.value)} value={orgName} />
                    {/* Render error alert if orgName is empty */}
                    {orgName === "" && <div className="alert alert-danger">Organization Name is required.</div>}
                  </div>
                  <div class="col-12">
                    <label >Choose Event Type: </label>
                    <select id="eventType" name="eventType" value={eventType} onChange={(e) => setEventType(e.target.value)}>
                      <option >Beach Clean Up</option>
                      <option >Fund Raiser</option>
                      <option >Public Awareness Session</option>
                    </select>
                    {/* Render error alert if eventType is empty */}
                    {/* {eventType === "" && <div className="alert alert-danger">Event Type is required.</div>} */}
                  </div>

                  <div className="col-12">
                    <label >Select the Location:</label>
                    <div class="col-sm-10">
                      <input type="text" onChange={(e) => setLocation(e.target.value)} value={location} />
                      {/* Render error alert if location is empty */}
                      {location === "" && <div className="alert alert-danger">Location is required.</div>}
                    </div>
                  </div>

                  <div className="col-12">
                    <label for="inputDate" className="form-label">Enter the date you planning to organize the event:</label>
                    <input type="date" onChange={(e) => setDate(e.target.value)} value={date} />
                    {/* Render error alert if date is empty */}
                    {date === "" && <div className="alert alert-danger">Date is required.</div>}
                  </div>
                  <div className="col-12">
                    <label for="inputPhone" className="form-label">Your Name:</label>
                    <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
                    {/* Render error alert if name is empty */}
                    {name === "" && <div className="alert alert-danger">Name is required.</div>}
                  </div>
                  <div className="col-12">
                    <label for="inputContactNo" className="form-label">Contact Number:</label>
                    <input type="text" onChange={(e) => setContactNo(e.target.value)} value={contactNo} />
                    {/* Render error alert if Contact Number is empty */}
                    {contactNo === "" && <div className="alert alert-danger">Contact Number is required.</div>}

                    {error && <div className="alert alert-danger">{error}</div>} {/* Display error if present */}


                  </div>

                  <div className="text-center">
                    <button type="reset " className="btn btn-reset btn btn-secondary" onClick={() => navigate("/allEvents")}>  Cancel </button>
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
      </section >

    </main >
  )
}

export default EventForm