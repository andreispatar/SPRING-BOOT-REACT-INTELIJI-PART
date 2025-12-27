import { useState } from 'react';
import { deleteUser } from '../../Service/UserService.js';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { useEffect } from 'react';
import { fetchUsers } from '../../Service/UserService.js';
import { useCallback } from 'react';
import { useMemo } from 'react';
import { useRef } from 'react';
import { useLayoutEffect } from 'react';
import { useReducer } from 'react';
import { useDebugValue } from 'react';
import { useImperativeHandle } from 'react';


const UsersList = ({users, setUsers}) => {

const [searchTerm, setSearchTerm] = useState("");

const filteredUsers = users.filter(user =>
  user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  user.email.toLowerCase().includes(searchTerm.toLowerCase())
);

const deleteByUserId = async (userId) => {
  try{
    const response = await deleteUser(userId);
    if(response.status === 204){
      const updatedUsers = users.filter(user => user.userId !== userId);
      setUsers(updatedUsers);
      toast.success("User deleted successfully");
    }
    else
      toast.error("Failed to delete user");
  }
  catch(error){
    console.error( error);
  }
}

  return (

   <div className="category-list-container" style={{ overflowY: 'auto', height: '100vh', overflowX: 'hidden' }}> 
      <div className="row pe-2">
        <div className="input-group mb-3">
          <input type="text" 
                  name="keyword" 
                  id="keyword" 
                  placeholder="Search by keyboard" 
                  className="form-control"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                  />
          <span className="input-group-text bg-warning">
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>
      <div className="row g-3 pe-2">
        {filteredUsers.map((user, index) => (
          <div key={index} className="col-12">
            <div className="card p-3 bg-dark">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <h5 className="text-white mb-1">{user.name}</h5>
                  <p className="text-white mb-0">{user.email}</p>
                </div>
                <div>
                  <button className="btn btn-danger btn-sm" 
                          onClick={async () => {deleteByUserId(user.userId)}}>
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
          </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default UsersList;