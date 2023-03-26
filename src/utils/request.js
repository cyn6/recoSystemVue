import axios from 'axios'

const request = axios.create({
    baseURL: 'http://10.184.17.72:9099',  // 后端地址
})

request.all

export default request

