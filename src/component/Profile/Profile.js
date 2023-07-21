import React, { useContext, useEffect, useState } from "react";
import DataContext from "../../DataContext/DataContext";
import Popup from "reactjs-popup";
import "../Profile/Profile.css";
import { Tooltip } from "@mui/material";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";

function Profile() {
  const {
    role,
    id,
    name,
    mail,
    phonenumber,
    setUser,
    setEmail,
    setPhoneNumber,
    setRole,
    setId,
  } = useContext(DataContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedEmail, setEditedEmail] = useState(mail);
  const [editedPhoneNumber, setEditedPhoneNumber] = useState(phonenumber);
  const user = JSON.parse(localStorage.getItem("User"));

  useEffect(() => {
    console.log(user.role.name.toLowerCase());
    setRole(user.role.name.toLowerCase());
    setId(user.id);
    setEmail(user.email);
    setUser(user.name);
    setPhoneNumber(user.phoneNumber);
  }, []);

  let Ename = user.name;
  let Eemail = user.email;
  let EphoneNumber = user.phoneNumber;

  // Function to handle the partial update of user details
  const handleUpdateUserDetails = () => {
    const updatedUserData = {
      name: name,
      email: mail,
      phoneNumber: phonenumber,
    };
    console.log(editedName, editedEmail, editedPhoneNumber);

    const url = `https://localhost:7017/api/User/${id}`;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUserData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User details updated successfully:", data);
        setUser(data.name);
        setEmail(data.email);
        setPhoneNumber(data.phoneNumber);
        Ename = data.name;
        Eemail = data.email;
        EphoneNumber = data.phoneNumber;
        setIsEditing(false);
        var localData = JSON.parse(localStorage.getItem("User"));
        localData = {
          ...localData,
          email: data.email,
          name: data.name,
          phoneNumber: data.phoneNumber,
        };
        localStorage.setItem("User", JSON.stringify(localData));
      })
      .catch((error) => {
        console.error("Error updating user details:", error);
      });
  };

  return (
    <Popup
      trigger={
        // <Tooltip title="View Profile">
        <button className="profile_icon" onClick={() => {}}>
          <i class="fa fa-user" aria-hidden="true"></i>
        </button>
        // </Tooltip>
      }
      modal
      nested
    >
      {(close) => (
        <div className="">
          <div>
            <button className="closeprofile" onClick={() => close()}>
              X
            </button>
          </div>
          <div>
            <div
              style={{
                height: "400px",
                overflowY: "scroll",
                backgroundColor: "white",
                padding: "40px",
                placeContent: "center",
                justifyContent: "center",
                textAlign: "center",
                border: "3px solid #091644",
              }}
            >
              <div>
                <h2>My Profile</h2>
                <button className="profileicon" onClick={() => {}}>
                  <i class="fa fa-user" aria-hidden="true"></i>
                </button>

                <p>ID : {id}</p>
                <p>Role : {role}</p>
                {!isEditing ? (
                  <>
                    <p>Name: {name}</p>
                    <p>Phone Number: {phonenumber}</p>
                    <p>Email: {mail}</p>

                    <button
                      className="add_button"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Details
                    </button>
                  </>
                ) : (
                  <div>
                    <label>
                      Name:
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setUser(e.target.value);
                        }}
                      />
                    </label>
                    <label>
                      Email:
                      <input
                        type="text"
                        value={mail}
                        onChange={(e) => setEmail((Eemail = e.target.value))}
                      />
                    </label>
                    <label>
                      Phone Number:
                      <input
                        type="text"
                        value={phonenumber}
                        onChange={(e) =>
                          setPhoneNumber((EphoneNumber = e.target.value))
                        }
                      />
                    </label>
                    <div className="profilebuttons">
                      <button
                        className="add_button"
                        onClick={handleUpdateUserDetails}
                      >
                        Update Details
                      </button>
                      <button
                        className="add_button"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
}

export default Profile;
