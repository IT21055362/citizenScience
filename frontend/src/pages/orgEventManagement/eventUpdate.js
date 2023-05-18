import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function EventUpdate() {
  const [orgName, setOrgName] = useState('')
  const [eventType, setEventType] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [name, setName] = useState('')
  const [contactNo, setContactNo] = useState('')
  const [error, setError] = useState(null)

  const { id } = useParams()
  const [orgEvent, setOrgEvent] = useState({

  })


}