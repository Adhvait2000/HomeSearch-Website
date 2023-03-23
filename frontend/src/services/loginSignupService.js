import axios from 'axios'
const baseUrl = '/homesearch/v1/auth'

/*
This is the service implementing axios, that the frontend uses to send login/signup details.
When the server is set up, we must fill in the server's URL and API subdirectories below.
*/

const sendLoginDetails = (email, password) => {
  return axios.post(`${baseUrl}/login`, {
    email: email, 
    password: password
  })
}

const sendSignupDetails = (name, email, password, user) => {
  return axios.post(`${baseUrl}/register`, {
    name: name, 
    email: email, 
    password: password,
    role: user})
}

export default { 
  sendLoginDetails, 
  sendSignupDetails
}