import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../store/ConnectionSlice";
import { useNavigate } from "react-router";

const Connections = () => {
  const user = useSelector((state) => state.connection);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleconnection = async () => {
    try {
      const res = await axios.get("http://localhost:7777/collections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  const profileview = async () => {
    navigate("/profilecard");
  };

  useEffect(() => {
    handleconnection();
  }, []);

  return (
    <div className="overflow-x-hidden flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1 flex flex-col">
        <h1 className="text-3xl font-semibold text-center mt-4">Connections</h1>

        <div
          className="
          
          "
        >
          {user && user.some((u) => u.firstName || u.lastName) ? (
            user
              .filter((u) => u.firstName || u.lastName)
              .map((u, i) => (
                <div key={i} className="p-5">
                  <div className="bg-zinc-700 shadow-sm p-4 rounded-lg">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="relative flex items-center">
                        <img
                          className="w-20 h-20 rounded-full mr-5 object-cover"
                          src={u.photoURL}
                          alt="Profile"
                        />
                        <div className="flex flex-col text-white">
                          <h1 className="text-lg font-semibold mb-1">
                            {(u.firstName || "") + " " + (u.lastName || "")}
                          </h1>
                          <p>{u.about || "No about info"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <h1 className="text-center mt-5 text-lg text-gray-400">
              No connections yet
            </h1>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Connections;
