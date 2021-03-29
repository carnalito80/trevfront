// axios
import axios from 'axios'
const headers = { 'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/json' }
const baseURL = `${process.env.VUE_APP_BACKEND_URL  }:6001` 
 
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

