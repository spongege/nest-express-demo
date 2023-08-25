import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

export const addUser = (data) => axios.post('/internet', data).then((res) => res.data)

export const getList = (data) => axios.get('/internet', { params: data }).then((res) => res.data)

export const delUser = (data) => axios.delete(`/internet/${data.id}`).then((res) => res.data)

export const updateUser = (data) =>
  axios.patch(`/internet/${data.id}`, data).then((res) => res.data)
