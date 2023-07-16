import axios from 'axios';
import React, { useEffect, useState } from 'react';

function ViewUsers() {
    const [data, setData] = useState([]);

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

    return (
        <div>
            <table>
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
                    {data.map((user, index) => (
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
                            <td>{user.role.isActive}</td>
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
    );
}

export default ViewUsers;
