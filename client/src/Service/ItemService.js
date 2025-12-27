import axios from "axios";

const authHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const addItem = async (item) => {
    return await axios.post('http://localhost:8080/admin/items', item, {
        headers: authHeaders()
    })
}

export const deleteItem = async (itemId) => {
    return await axios.delete(`http://localhost:8080/admin/items/${itemId}`, {
        headers: authHeaders()
    })
}

export const fetchItems = async ({ useAuth = true } = {}) => {
    const headers = useAuth ? authHeaders() : {};
    return await axios.get('http://localhost:8080/items', { headers })
}
