import React, { useEffect } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUserToFeed } from "../utils/feedSlice";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const feed = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user);

  if (!user) return navigate("/login");


  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addUserToFeed(res.data.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);


  if (!feed) return;

  if (feed.length == 0)
    return <h1 className="flex justify-center my-10">No User Found!!</h1>;

  return (
    feed && (
      <div className="flex justify-center mt-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
