const isDev = process.env.NODE_ENV === 'development'

export default {
  url: isDev ? 'http://localhost:3000' : 'https://deaddance.herokuapp.com/',
  apiUrl: isDev
    ? 'http://localhost:8080/api'
    : 'https://deaddance.herokuapp.com/api',
}
