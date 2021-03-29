// axios
import axios from 'axios'
const headers = { 'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/json' }
const baseURL = process.env.VUE_APP_BACKEND_URL
// eslint-disable-next-line prefer-const
const accessToken = localStorage.getItem('accessToken')
// eslint-disable-next-line prefer-const
if (accessToken) headers.Authorization = `Bearer ${accessToken}`
 
export default axios.create({
  baseURL,
  headers
 
})

console.log(baseURL)
console.log(headers)

// export default  axios.create({
//   baseURL: process.env.VUE_APP_BACKEND_URL,
//   withCredentials: true,
//   headers: {
//     "X-Requested-With": 'XMLHttpRequest',
//     "Content-Type": 'application/json'
//   }
// })

