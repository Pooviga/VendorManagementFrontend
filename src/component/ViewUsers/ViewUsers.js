import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './ViewUsers.css'

function ViewUsers() {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios
            .get('https://localhost:7017/api/User')
            .then(res => setData(res.data))
            .catch(er => console.log(er));
    }, []);

    const handleDelete = (id) => {
        axios
            .delete(`https://localhost:7017/api/User/${id}/4`)
            .then(res => {
                console.log(res);
                // location.reload();
            })
            .catch(er => console.log(er));
    };

    const handleEdit = (index) => {
        // Copy the data array to avoid modifying the original state directly
        const newData = [...data];
        newData[index].editing = true;
        setData(newData);
    };

    const handleSave = (index) => {
        const user = data[index];
        // Perform your PUT request here using axios
        // Example:
        axios
            .put(`https://localhost:7017/api/User/${user.id}`, {
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role.name,
                approvalStatus: user.approvalStatus,
                isActive: user.role.isActive,
            })
            .then(res => {
                console.log(res);
                // If needed, you can reset the editing flag after successful update
                const newData = [...data];
                newData[index].editing = false;
                setData(newData);
            })
            .catch(er => console.log(er));
    };
    // Filter the users based on the selected filter option
    const filteredData = filter === 'all' ? data : data.filter((user) => user.approvalStatus === filter);

    // Search for users based on the search term
    const searchedData = filteredData.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.phoneNumber.includes(searchTerm)
    );

    return (
        <div className='body-content'>
            <label htmlFor="filter">Filter by Role</label>
            <div  className='searches'>
                <div className="filter-container">
                    <select
                        id="filter"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="Approved">Approved</option>
                        <option value="Pending">Pending</option>
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
            <div className='table_overflow'>
            <table >
                <thead>
                    <tr>
                        <th>User Id</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>IsActive</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {searchedData.map((user, index) => (
                        <tr key={index}>
                            <td>{user.id}</td>
                            <td>
                                {user.editing ? (
                                    <input
                                        type="text"
                                        value={user.name}
                                        onChange={(e) => {
                                            const newData = [...data];
                                            newData[index].name = e.target.value;
                                            setData(newData);
                                        }}
                                    />
                                ) : (
                                    user.name
                                )}
                            </td>
                            <td>
                                {user.editing ? (
                                    <input
                                        type="text"
                                        value={user.email}
                                        onChange={(e) => {
                                            const newData = [...data];
                                            newData[index].email = e.target.value;
                                            setData(newData);
                                        }}
                                    />
                                ) : (
                                    user.email
                                )}
                            </td>
                            <td>
                                {user.editing ? (
                                    <input
                                        type="text"
                                        value={user.phoneNumber}
                                        onChange={(e) => {
                                            const newData = [...data];
                                            newData[index].phoneNumber = e.target.value;
                                            setData(newData);
                                        }}
                                    />
                                ) : (
                                    user.phoneNumber
                                )}
                            </td>

                            <td>{user.role.name}</td>
                            <td>{user.approvalStatus}</td>
                            <td>{user.isActive ? 'true' : 'false'}</td>

                            <td>
                                {user.editing ? (
                                    <button onClick={() => handleSave(index)}>Update</button>
                                ) : (
                                    <>
                                        <button onClick={() => handleEdit(index)}>
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button onClick={() => handleDelete(user.id)}>
                                            <i className="far fa-trash-alt"></i>
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            
        </div>
    );
}

export default ViewUsers;
