import axios from "axios";
import React, { useEffect, useState } from "react";
const baseUrl = process.env.REACT_APP_BASEURL;

const UserList = () => {
  const [userList, setuserList] = useState([]);

useEffect(() => {
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/user/`);
      setuserList(response.data);

    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  fetchTasks();
}, []);
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Email List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {userList.map(user => (
          <div key={user.id} className="bg-gray-200 p-4 rounded">
            <p className="text-gray-600">{user?.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
