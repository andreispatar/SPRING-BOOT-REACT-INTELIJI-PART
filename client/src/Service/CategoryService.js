import axios from "axios";

const authHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const addCategory = async (category) => {
    return axios.post('http://localhost:8080/admin/categories', category, {
        headers: {
            ...authHeaders(),
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const deleteCategory = async (categoryId) => {
    return axios.delete(`http://localhost:8080/admin/categories/${categoryId}`, {
        headers: authHeaders()
    })
}

export const fetchCategories = async () => {
    return axios.get('http://localhost:8080/categories', {
        headers: authHeaders()
    })
}
