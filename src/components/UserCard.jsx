import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, age, gender, photoUrl, about, skills } =
    user;

  const handleReview = async (status, id) => {
    try {
      const res = await axios.post(
        BASE_URL + `/request/send/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(id));
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="card bg-base-100 shadow-xl w-96">
      <figure>
        <img
          src={photoUrl}
          className="w-full h-full object-cover"
          alt="user pic"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{age + " " + gender}</p>
        <p>{skills}</p>
        <p>{about}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={() => {
              handleReview("interested", _id);
            }}
          >
            Interested
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              handleReview("ignored", _id);
            }}
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
