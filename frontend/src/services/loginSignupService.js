import axios from 'axios'
const baseUrl = '/homesearch/v1/auth'

const sendLoginDetails = (email, password) => {
  return axios.post(`${baseUrl}/login`, {
    email: email, 
    password: password
  })
}

const sendSignupDetails = async (name, email, password, user) => {
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