import axios from "axios";

const API_URL = "http://localhost:8081/api/jdpCustomer";

export const getCustomerById = (id) =>{
    return axios.get(`${API_URL}/${id}`);
}

export const getAllCustomers = (page , size) =>{
    // const params = {
    //     page : page,
    //     size : size,
    // }
    const params = {};
    params.page = page;
    params.size = size;
    return axios.get(API_URL , {params});
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

export const searchjdpCustomers = (isDisabled , saleDateFrom , saleDateTo , page , size) => {
    const params = {};

    if(isDisabled  != "") params.isDisabled = isDisabled;
    if(saleDateFrom != "") params.saleDateFrom = saleDateFrom;
    if(saleDateTo != "") params.saleDateTo = saleDateTo;

    params.page = page;
    params.size = size;

    return axios.get(`${API_URL}/search` , {params});
}