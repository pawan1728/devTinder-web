import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addMyConnection } from "../utils/myConnectionSlice";

const MyConnection = () => {
  const dispatch = useDispatch();
  const myConnection = useSelector((store) => store.myConnection);

  const getMyConnection = async () => {
    if (myConnection) return;
    try {
      const res = await axios.get(BASE_URL + "/user/request/connection", {
        withCredentials: true,
      });
      console.log("🚀 ~ getMyConnection ~ res:", res.data.data);
      dispatch(addMyConnection(res.data.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getMyConnection();
  }, []);

  if (!myConnection) return;

  if (myConnection.length == 0)
    return <h1 className="flex justify-center mt-10">No Connection Found</h1>;

  //   return <p>here is data</p>
  return (
    myConnection && (
      <div className="grid grid-cols-3 gap-4 mt-10">
        {myConnection.map((connection) => {
          return (
            <div className="" key={connection._id}>
              <div className="hero mt-2">
                <div className="hero-content flex-col lg:flex-row shadow-md">
                  <img
                    alt="user Photo"
                    src={connection.photoUrl}
                    className="w-40 rounded-lg shadow-2xl"
                  />
                  <div className="w-60">
                    <h1 className="text-xl font-bold">
                      {connection.firstName + " " + connection.lastName}
                    </h1>
                    <p className="py-1">
                      {connection.age + " " + connection.gender}
                    </p>
                    <p className="py-1">{connection.about}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    )
  );
};

export default MyConnection;
