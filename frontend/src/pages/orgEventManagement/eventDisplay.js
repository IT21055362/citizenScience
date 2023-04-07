import {
  useEffect, useState
} from "react";

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

    <div className="events">
      {orgEvents && orgEvents.map((orgEvent) => (
        <p key={orgEvent._id}>{orgEvent.orgName}</p>
      ))}
    </div>

  )
}
export default EventDisplay;