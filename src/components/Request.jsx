import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, RemoveRequest } from "../store/RequestSlice";
import { h1 } from "framer-motion/client";
import { toast } from "react-toastify";

const Request = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const request = useSelector((state) => state.request);
  const handlerequest = async (status, _id) => {
    const res = await axios.post(
      `http://localhost:7777/request/review/${status}/${_id}`,
      {},
      { withCredentials: true }
    );
    dispatch(RemoveRequest(_id));
    if (status === "accepted") {
      toast.success("Request accepted successfully!");
    } else {
      toast.error("Request rejected!");
    }
    console.log(res.data.fromUserid);
  };

  const fetchRequest = async () => {
    try {
      const res = await axios.get("http://localhost:7777/requests/pending", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
      console.log(res.data.data);
    } catch (error) {}
  };

  const profileview = async (user) => {
    navigate("/request/profile", { state: { user } });
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!request) return;

  return (
    request && (
      <div className=" overflow-x-hidden  ">
        <Navbar />
        <div className="">
          <h1 className="text-3xl font-semibold text-center mt-3">Request</h1>
          {request.length === 0 ? (
            <h1 className="text-center mt-5 text-lg text-gray-400 ">
              No Request yet
            </h1>
          ) : (
            <div>
              <div className="overflow-y-auto "></div>
              {request.map((r, i) => {
                const {
                  _id,
                  firstName,
                  lastName,
                  photoURL,
                  age,
                  gender,
                  about,
                  skills,
                } = r.fromUserid;
                return (
                  <div className="p-5  ">
                    <div className="bg-zinc-700 mb-3 shadow-sm p-4 rounded-lg ">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div
                          onClick={() => profileview(r.fromUserid)}
                          className=" relative flex items-center  cursor-pointer"
                        >
                          <img
                            className="w-20 h-20 rounded-full mr-5 object-cover"
                            src={photoURL}
                            alt="Profile"
                          />
                          <div className="flex flex-col text-white">
                            <h1 className="text-lg font-semibold mb-1">
                              {firstName + " " + lastName}
                            </h1>
                            <p>{about}</p>
                          </div>
                        </div>

                        <div className="flex justify-center md:justify-between items-center gap-3">
                          <i
                            onClick={() => handlerequest("rejected", r._id)}
                            className="ri-close-large-line text-xl px-4 py-2 hover:text-red-500 cursor-pointer bg-red-300 rounded-full"
                          ></i>
                          <i
                            onClick={() => handlerequest("accepted", r._id)}
                            className="ri-check-fill text-xl px-4 py-2 hover:text-green-500 cursor-pointer bg-green-300 rounded-full"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <Outlet />
            </div>
          )}
        </div>
        <Footer />
      </div>
    )
  );
};

export default Request;
