import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import DataContext from "../../DataContext/DataContext";
import "./ViewUsers.css";

import { Tooltip } from "@mui/material";

import Button from "@mui/material/Button";
function ViewUsers() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  //   const { id, role } = useContext(DataContext);
  const userData = JSON.parse(localStorage.getItem("User"));
  const userid = userData.id;

  useEffect(() => {
    axios
      .get("https://localhost:7017/api/User")
      .then((res) => setData(res.data))
      .catch((er) => console.log(er));
  }, []);

  const handleDelete = (Uid) => {
    axios
      .delete(`https://localhost:7017/api/User/${Uid}/${userid}`)
      .then((res) => {
        console.log(res);
        axios
          .get("https://localhost:7017/api/User")
          .then((res) => setData(res.data));
        // location.reload();
      })
      .catch((er) => console.log(er));
  };

  const handleEdit = (index) => {
    // Copy the data array to avoid modifying the original state directly
    const newData = [...data];
    newData[index].editing = true;
    setData(newData);
  };

  const handleSave = (index) => {
    const saveuser = data[index];
    // Perform your PUT request here using axios
    // Example:
    axios
      .put(
        `https://localhost:7017/update/${saveuser.id}/${saveuser.role.name}`,
        {
          name: saveuser.name,
          email: saveuser.email,
          phoneNumber: saveuser.phoneNumber,
          role: saveuser.role.name,
          approvalStatus: saveuser.approvalStatus,
          isActive: saveuser.role.isActive,
        }
      )
      .then((res) => {
        console.log(res);
        const newData = [...data];
        newData[index].editing = false;
        setData(newData);
      })
      .catch((er) => console.log(er));
  };
  const filteredData =
    filter === "all" ? data : data.filter((user) => user.role.name === filter);

  const searchedData = filteredData.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phoneNumber.includes(searchTerm)
  );

  return (
    <div className="body-content">
      <label htmlFor="filter">Filter by Role</label>
      <div className="searches">
        <div className="filter-container">
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            <option value="Approver">Approver</option>
            <option value="Readonly">Readonly</option>
            {/* Add more filter options if needed */}
          </select>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name, email, or phone number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="table_overflow">
        <table>
          <thead>
            <tr>
              <th>User Id</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {searchedData.map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>
                  {user.editing ? (
                    <input
                      type="text"
                      value={user.role.name}
                      onChange={(e) => {
                        const newData = [...data];
                        newData[index].role.name = e.target.value;
                        setData(newData);
                      }}
                    />
                  ) : (
                    user.role.name
                  )}
                </td>

                {user.isActive ? (
                  <td>
                    {user.editing ? (
                      <button
                        class="update_button"
                        onClick={() => handleSave(index)}
                      >
                        Update
                      </button>
                    ) : (
                      <>
                        <Tooltip title="Edit">
                          <Button
                            type="button"
                            class="btn-btn"
                            onClick={() => handleEdit(index)}
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <Button
                            type="button"
                            class="btn-btn"
                            onClick={() => handleDelete(user.id)}
                          >
                            <i className="far fa-trash-alt"></i>
                          </Button>
                        </Tooltip>
                      </>
                    )}
                  </td>
                ) : (
                  <td style={{ color: "red" }}>Inactive</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewUsers;
