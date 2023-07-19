import React, { useContext, useState } from 'react';
import DataContext from '../../DataContext/DataContext';
import Popup from 'reactjs-popup'


function Profile() {
    const { role, id, name, mail, phonenumber, setUser, setEmail, setPhoneNumber } = useContext(DataContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(name);
    const [editedEmail, setEditedEmail] = useState(mail);
    const [editedPhoneNumber, setEditedPhoneNumber] = useState(phonenumber);

    // Function to handle the partial update of user details
    const handleUpdateUserDetails = () => {
        const updatedUserData = {
            name: editedName,
            email: editedEmail,
            phoneNumber: editedPhoneNumber,
            password: '',
        };
        console.log(editedName, editedEmail, editedPhoneNumber);

        const url = `https://localhost:7017/api/User/${id}`;

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUserData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('User details updated successfully:', data);
                setUser(data.name)
                setEmail(data.email)
                setPhoneNumber(data.phoneNumber)
                setIsEditing(false);
            })
            .catch((error) => {
                console.error('Error updating user details:', error);
            });
    };

    return (
        <div>
            <div style={{
                justifyContent: "center",
                textAlign: "center"
            }}>
                <h2>My Profile</h2>
                <p>{role}</p>
                <p>ID: {id}</p>
                {!isEditing ? (
                    <>
                        <p>Name: {name}</p>
                        <p>Email: {mail}</p>
                        <p>Phone Number: {phonenumber}</p>
                        <button className="add_button" onClick={() => setIsEditing(true)}>Edit Details</button>
                    </>
                ) : (
                    <div>
                        <label>
                            Name:
                            <input
                                type="text"
                                value={editedName}
                                onChange={(e) => setEditedName(e.target.value)}
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="text"
                                value={editedEmail}
                                onChange={(e) => setEditedEmail(e.target.value)}
                            />
                        </label>
                        <label>
                            Phone Number:
                            <input
                                type="text"
                                value={editedPhoneNumber}
                                onChange={(e) => setEditedPhoneNumber(e.target.value)}
                            />
                        </label>
                        <button className="add_button" onClick={handleUpdateUserDetails}>Update Details</button>
                        <button className="add_button" onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                )}
            </div>

        </div >
    );
}

export default Profile;

