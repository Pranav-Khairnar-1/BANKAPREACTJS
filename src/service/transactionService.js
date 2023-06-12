import axios from 'axios'
import * as constants from '../config/config'

export const createNewTransaction = async (data) => {
    console.log("INside createNewTransaction Service---->", data);
    const token = localStorage.getItem('authorization')
    try {
        const response = await axios.post(`${constants.BASE_URL}/transaction/new`, data, {
            headers: { "Content-type": "application/json", "authorization": token },
        })
        return response
    } catch (error) {
        console.error(error);
        throw error.response.data.error
    }
}

export const createTransferTransaction = async (data) => {
    console.log("INside createTransferTransaction Service---->", data);
    const token = localStorage.getItem('authorization')
    try {
        const response = await axios.post(`${constants.BASE_URL}/transaction/transfer-new`, data, {
            headers: { "Content-type": "application/json", "authorization": token },
        })
        return response
    } catch (error) {
        console.error(error);
        throw error.response.data.error
    }
}

export const getAllTransaction = async (data, ID) => {
    console.log("INside createTransferTransaction Service---->", data);
    const token = localStorage.getItem('authorization')
    try {
        const response = await axios.get(`${constants.BASE_URL}/transaction/${ID}`, {
            headers: { "Content-type": "application/json", "authorization": token },
            params: data
        })
        return response
    } catch (error) {
        console.error(error);
        throw error.response.data.error
    }
}