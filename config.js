const isDev = process.env.NODE_ENV === 'development'

export default {
  url: isDev ? 'http://localhost:3000' : '',
  apiUrl: isDev ? 'http://localhost:8080/api' : '',

  hours: [
    '09:00:00',
    '10:00:00',
    '11:00:00',
    '12:00:00',
    '13:00:00',
    '14:00:00',
    '15:00:00',
    '16:00:00',
    '17:00:00',
  ],
}
