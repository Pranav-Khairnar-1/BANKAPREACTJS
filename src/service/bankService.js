import axios from 'axios'
import * as constants from '../config/config'


export const getAllbanks = async (data) => {
    console.log("INside getAllbanks Service---->", data);
    const token = localStorage.getItem('authorization')
    try {
        const response = await axios.get(`${constants.BASE_URL}/bank/`, {
            headers: { "Content-type": "application/json", "authorization": token },
            params: data
        })
        return response
    } catch (error) {
        console.error(error);
        throw error.response.data.error
    }
}

export const UpdateBankByID = async (data, ID) => {
    console.log("INside UpdateBankByID Service---->", data, ID);
    const token = localStorage.getItem('authorization')
    try {
        const response = await axios.put(`${constants.BASE_URL}/bank/update/${ID}`, data, {
            headers: { "Content-type": "application/json", "authorization": token },
        })
        return response
    } catch (error) {
        console.error(error);
        throw error.response.data.error
    }
}

export const createNewBank = async (data) => {
    console.log("INside createNewBank Service---->", data);
    const token = localStorage.getItem('authorization')
    try {
        const response = await axios.post(`${constants.BASE_URL}/bank/new`, data, {
            headers: { "Content-type": "application/json", "authorization": token },
        })
        return response
    } catch (error) {
        console.error(error);
        throw error.response.data.error
    }
}

export const deleteBank = async (ID) => {
    console.log("INside deleteBank Service---->", ID);
    const token = localStorage.getItem('authorization')
    try {
        const response = await axios.delete(`${constants.BASE_URL}/bank/delete/${ID}`, {
            headers: { "Content-type": "application/json", "authorization": token },
        })
        return response
    } catch (error) {
        console.error(error);
        throw error.response.data.error
    }
}