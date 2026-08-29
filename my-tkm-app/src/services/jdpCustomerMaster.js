import axios from "axios";

const API_URL = "http://localhost:8081/api/jdpCustomer";

export const getCustomerById = (id) =>{
    return axios.get(`${API_URL}/${id}`);
}

export const getAllCustomers = () =>{
    return axios.get(API_URL);
}

export const addCustomer = (customer) => {
    return axios.post( API_URL , customer);
}

export const addCustomersBulk = (customers) => {
    return axios.post( `${API_URL}/bulk` , customers);
}

export const deleteCustomer = (id) => {
    return axios.delete( API_URL , id );
}

export const deleteCustomersBulk = (ids) => {
    return axios.delete( `${API_URL}/bulk` , {
        data : ids} );
}

export const updateCustomer = (id , customer) => {
    return axios.put(`${API_URL}/${id}` , customer);
}

export const updateCustomersBulk = (customers) => {
    return axios.put(`${API_URL}/bulk` , customers);
}