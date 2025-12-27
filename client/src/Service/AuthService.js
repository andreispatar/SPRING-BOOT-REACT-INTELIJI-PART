import axios from "axios";

export const login = async (data) => {
    return axios.post('http://localhost:8080/login', data)
}