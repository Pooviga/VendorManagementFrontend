import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import DataContext from '../../DataContext/DataContext'


function ViewUsers() {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const { id } = useContext(DataContext)


    useEffect(() => {
        axios
            .get('https://localhost:7017/api/User')
            .then(res => setData(res.data))
            .catch(er => console.log(er));
    }, []);

    const handleDelete = (userid) => {
        axios
            .delete(`https://localhost:7017/api/User/${userid}/${id}`)
            .then(res => {
                console.log(res);
                axios
                    .get('https://localhost:7017/api/User')
                    .then(res => setData(res.data))
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
            .put(`https://localhost:7017/update/${user.id}/${user.role.name}`, {
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role.name,
                approvalStatus: user.approvalStatus,
                isActive: user.role.isActive,
            })
            .then(res => {
                console.log(res);
                const newData = [...data];
                newData[index].editing = false;
                setData(newData);
            })
            .catch(er => console.log(er));
    };
    const filteredData = filter === 'all' ? data : data.filter((user) => user.role.name === filter);

    const searchedData = filteredData.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.phoneNumber.includes(searchTerm)
    );

    return (
        <div>
            <div className="filter-container">
                <label htmlFor="filter">Filter by Role:</label>
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
            <div className='table_overflow'>
                <table >
                    <thead>
                        <tr>
                            <th>User Id</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Role</th>
                            {/* <th>Status</th>
                            <th>IsActive</th> */}
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
                                {/* <td>{user.approvalStatus}</td>
                                <td>{user.isActive ? 'true' : 'false'}</td> */}

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
