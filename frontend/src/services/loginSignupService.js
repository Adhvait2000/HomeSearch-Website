import axios from 'axios'
import tokenAndHeaderPrep from './tokenAndHeaderPrep';
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

const forgotPassword = async (email) => {
  return axios.post(`${baseUrl}/forgotpassword`, {email: email})
}

const resetPassword = async(newPass, token) => {
  return axios.put(`${baseUrl}/resetpassword/${token}`, {password: newPass})
}

const getUserDetails = async () => {
  return axios.get(`${baseUrl}/me`, {
    headers: tokenAndHeaderPrep.getAuthHeaders()
  })
}

export default { 
  sendLoginDetails, 
  sendSignupDetails,
  forgotPassword,
  resetPassword,
  getUserDetails
}