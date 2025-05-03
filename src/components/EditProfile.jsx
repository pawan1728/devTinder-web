import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [gender, setGender] = useState(user.gender);
  const [age, setAge] = useState(user.age);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [skills, setSkills] = useState(user.skills);
  const [about, setAbout] = useState(user.about);
  const [isToastShow, setIsToastShow] = useState(false);

  const data = { firstName, lastName, gender, age, photoUrl, skills, about };
  const handleProfileUpdate = async () => {
    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", data, {
        withCredentials: true,
      });
      dispatch(addUser(res.data.data));
      setIsToastShow(true);
      setTimeout(() => {
        setIsToastShow(false);
      }, 3000);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="card-body w-96 shadow-md mx-6">
          <h2 className="card-title">Update Profile</h2>
          <div className="">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">First Name</legend>
              <input
                type="text"
                className="input"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Last Name</legend>
              <input
                type="text"
                className="input"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Age</legend>
              <input
                type="text"
                className="input"
                placeholder="Last Name"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                }}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Photo</legend>
              <input
                type="text"
                className="input"
                placeholder="photo urls"
                value={photoUrl}
                onChange={(e) => {
                  setPhotoUrl(e.target.value);
                }}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Skill</legend>
              <input
                type="text"
                className="input"
                placeholder="skills"
                value={skills}
                onChange={(e) => {
                  setSkills(e.target.value);
                }}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">About</legend>
              <input
                type="text"
                className="input"
                placeholder="about you"
                value={about}
                onChange={(e) => {
                  setAbout(e.target.value);
                }}
              />
            </fieldset>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={handleProfileUpdate}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
        <div className="w-96 shadow-md">
          <UserCard
            user={{ firstName, lastName, age, gender, photoUrl, skills, about }}
          />
        </div>
      </div>
      {isToastShow && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
