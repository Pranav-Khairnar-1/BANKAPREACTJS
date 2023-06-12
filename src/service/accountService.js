import axios from 'axios'
import * as constants from '../config/config'


export const getAllaccountsAdmin = async (data) => {
    console.log("INside getAllaccountsAdmin Service---->", data);
    const token = localStorage.getItem('authorization')
    try {
        const response = await axios.get(`${constants.BASE_URL}/account/admin`, {
            headers: { "Content-type": "application/json", "authorization": token },
            params: data
        })
        return response
    } catch (error) {
        console.error(error);
        throw error.response.data.error
    }
}

export const getAllaccounts = async (data) => {
    console.log("INside getAllaccounts Service---->", data);
    const token = localStorage.getItem('authorization');
    const ID = localStorage.getItem('ID');
    try {
        const response = await axios.get(`${constants.BASE_URL}/account/${ID}`, {
            headers: { "Content-type": "application/json", "authorization": token },
            params: data
        })
        return response
    } catch (error) {
        console.error(error);
        throw error.response.data.error
    }
}



export const createNewAccount = async (data) => {
    console.log("INside createNewAccount Service---->", data);
    const token = localStorage.getItem('authorization')
    try {
        const response = await axios.post(`${constants.BASE_URL}/account/new`, data, {
            headers: { "Content-type": "application/json", "authorization": token },
        })
        return response
    } catch (error) {
        console.error(error);
        throw error.response.data.error
    }
}

export const deleteaccount = async (ID) => {
    console.log("INside deleteaccount Service---->", ID);
    const token = localStorage.getItem('authorization')
    try {
        const response = await axios.delete(`${constants.BASE_URL}/account/delete/${ID}`, {
            headers: { "Content-type": "application/json", "authorization": token },
        })
        return response
    } catch (error) {
        console.error(error);
        throw error.response.data.error
    }
}