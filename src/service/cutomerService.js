import axios from 'axios'
import * as constants from '../config/config'


export const getAllCustomers = async (data) => {
    console.log("INside getAllCustomers Service---->", data);
    const token = localStorage.getItem('authorization')
    try {
        const response = await axios.get(`${constants.BASE_URL}/customer/`, {
            headers: { "Content-type": "application/json", "authorization": token },
            params: data
        })
        return response
    } catch (error) {
        console.error(error);
        throw error.response.data.error
    }
}

export const UpdateCustomerByID = async (data, ID) => {
    console.log("INside UpdateCustomerByID Service---->", data, ID);
    const token = localStorage.getItem('authorization')
    try {
        const response = await axios.put(`${constants.BASE_URL}/customer/update/${ID}`, data, {
            headers: { "Content-type": "application/json", "authorization": token },
        })
        return response
    } catch (error) {
        console.error(error);
        throw error.response.data.error
    }
}

export const createNewCustomer = async (data) => {
    console.log("INside createNewCustomer Service---->", data);
    const token = localStorage.getItem('authorization')
    try {
        const response = await axios.post(`${constants.BASE_URL}/customer/new`, data, {
            headers: { "Content-type": "application/json", "authorization": token },
        })
        return response
    } catch (error) {
        console.error(error);
        throw error.response.data.error
    }
}

export const deleteCustomer = async (ID) => {
    console.log("INside deleteCustomer Service---->", ID);
    const token = localStorage.getItem('authorization')
    try {
        const response = await axios.delete(`${constants.BASE_URL}/customer/delete/${ID}`, {
            headers: { "Content-type": "application/json", "authorization": token },
        })
        return response
    } catch (error) {
        console.error(error);
        throw error.response.data.error
    }
}