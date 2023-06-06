import axios from 'axios'
import * as constants from '../config/config'

export const login = async (data) => {
    console.log("INside Login Service---->", data);
    try {
        const response = await axios.post(`${constants.BASE_URL}/customer/login`, data, {
            headers: { "Content-type": "application/json" },
        })
        return response
    } catch (error) {
        console.error(error);
        throw error.response.data.error
    }
}

export const verifyAdmin = async (data) => {
    console.log("INside verify Admin---->", data);
    try {
        const response = await axios.get(`${constants.BASE_URL}/auth/admin`, {
            headers: { "Content-type": "application/json", "authorization": data },
        })
        return response.data
    } catch (error) {
        console.error(error);
        throw error.response.data.error
    }
}

export const verifyUser = async (data) => {
    console.log("INside verify Admin---->", data);
    try {
        const response = await axios.get(`${constants.BASE_URL}/auth/user`, {
            headers: { "Content-type": "application/json", "authorization": data },
        })
        return response.data
    } catch (error) {
        console.error(error);
        throw error.response.data.error
    }
} 