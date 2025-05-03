import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  addConnectionrequest,
  removeConnectionRequest,
} from "../utils/connectionRequestSlice";
import UserCard from "./UserCard";

const ConnectionRequest = () => {
  const dispatch = useDispatch();
  const ConnectionRequest = useSelector((store) => store.connectionRequest);

  const getRequestUser = async () => {
    if (ConnectionRequest) return;
    try {
       
        // "/user/request/connection"
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      console.log("🚀 ~ getRequestUser ~ res:", res)
      dispatch(addConnectionrequest(res.data.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getRequestUser();
  }, []);

  const handleReviewRequest = async (status, id) => {
    const res = await axios.post(BASE_URL + `/request/review/${status}/${id}`,{},{withCredentials:true});
    dispatch(removeConnectionRequest(id));
  };

  if (!ConnectionRequest) return;
  if (ConnectionRequest.length == 0)
    return <h1 className="flex justify-center mt-10">No Request Found!!</h1>;

  return (
    ConnectionRequest &&
    ConnectionRequest.map((connection) => {
      return (
        <div className="" key={connection._id}>
          <div className="hero mt-2">
            <div className="hero-content flex-col lg:flex-row shadow-md">
              <img
                alt="user Photo"
                src={connection.fromUserId.photoUrl}
                className="w-40 rounded-lg shadow-2xl"
              />
              <div className="w-60">
                <h1 className="text-xl font-bold">
                  {connection.fromUserId.firstName + " " + connection.fromUserId.lastName}
                </h1>
                <p className="py-1">
                  {connection.fromUserId.age + " " + connection.fromUserId.gender}
                </p>
                <p className="py-1">{connection.fromUserId.about}</p>
                <button
                  className="btn btn-primary mx-2 my-2"
                  onClick={() => {
                    handleReviewRequest("accepted", connection._id);
                  }}
                >
                  Accept
                </button>
                <button
                  className="btn btn-secondary my-2"
                  onClick={() => {
                    handleReviewRequest("rejected", connection._id);
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    })
  );
};

export default ConnectionRequest;
