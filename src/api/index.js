import axios from '@/config/index'

export const root = '/app'

export const login = (query) => axios.post(`${root}/user/login`, query)
export const loginOut = (query) => axios.delete(`${root}/user/loginOut`, query)

export const dropYear = (query) => axios.get(`${root}/common/dropDownBox/year`, { params: query })
export const getExamine = (query) => axios.get(`${root}/common/dropDownBox/examine`, { params: query })
