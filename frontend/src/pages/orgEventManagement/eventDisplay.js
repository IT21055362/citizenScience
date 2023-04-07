import {
  useEffect, useState
} from "react";

//components 
import EventDetails from '../../components/EventDetails.js'
import EventForm from '../../components/EventForm.js'

const EventDisplay = () => {

  const [orgEvents, setOrgEvents] = useState(null)

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


  return (
    <div className="main">
      <div className="events">
        {orgEvents && orgEvents.map((orgEvent) => (
          <EventDetails key={orgEvent._id} orgEvent={orgEvent} />
        ))}
      </div>
      <EventForm />
    </div>
  )
}
export default EventDisplay;