import { useState } from "react"

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
    <form action="" className="create" onSubmit={handleSubmit}>
      <h3>Add a Community Service Event</h3>

      <label>Enter Organization Name: </label>
      <input type="text" onChange={(e) => setOrgName(e.target.value)} value={orgName} />

      <label>Choose Event Type: </label>
      <select id="eventType" name="eventType" value={eventType} onChange={(e) => setEventType(e.target.value)}>
        <option value="beachCleanUp" selected>Beach Clean Up</option>
        <option value="fundRaiser">FundRaiser</option>
        <option value="awarenessSession">Public Awareness Session</option>
      </select>
      {/* <input type="text" onChange={(e) => setEventType(e.target.value)} value={eventType} /> */}

      <label>Select the Location: </label>
      <input type="text" onChange={(e) => setLocation(e.target.value)} value={location} />

      <label>Enter the date you planning to organize the event: </label>
      <input type="date" onChange={(e) => setDate(e.target.value)} value={date} />

      <label>Your Name: </label>
      <input type="text" onChange={(e) => setName(e.target.value)} value={name} />

      <label>Contact Number: </label>
      <input type="text" onChange={(e) => setContactNo(e.target.value)} value={contactNo} />

      <button>Submit Event Details</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default EventForm