import axios from 'axios'
const baseUrl = 'TO BE DETERMINED'

/*
This is the service implementing axios, that the frontend uses to send login/signup details.
When the server is set up, we must fill in the server's URL and API subdirectories below.
*/

const sendLoginDetails = (loginId, password) => {
  const request = axios.post('subdirectory TBD', {loginId, password})
  return request.then(response => 'sent')
}

const sendSignupDetails = (name, email, phone, password) => {
  const request = axios.post('subdirectory TBD', {name, email, phone, password})
  return request.then(response => 'sent')
}

export default { 
  sendLoginDetails
}