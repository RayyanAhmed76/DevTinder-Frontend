import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Adduser } from "../store/UserSlice";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Editprofile = ({ data }) => {
  const user = data;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchuser = async () => {
    try {
      const res = await axios.get("http://localhost:7777/profile/view", {
        withCredentials: true,
      });
      dispatch(Adduser(res.data));
    } catch (error) {
      console.log(error.message);
    }
  };
  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-white">Loading profile...</p>
      </div>
    );
  }
  const [profile, setProfile] = useState({
    photoUrl: user.photoUrl,
    firstName: user.firstName,
    lastName: user.lastName,
    age: user.age,
    gender: user.gender,
    about: user.about,
    skills: user.skills,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...profile.skills];
    updatedSkills[index] = value;
    setProfile((prev) => ({ ...prev, skills: updatedSkills }));
  };

  const addSkill = () => {
    setProfile((prev) => ({ ...prev, skills: [...prev.skills, ""] }));
  };

  const removeSkill = (index) => {
    const updatedSkills = profile.skills.filter((_, i) => i !== index);
    setProfile((prev) => ({ ...prev, skills: updatedSkills }));
  };

  const { firstName, lastName, age, about, gender, photoUrl, skills } = profile;

  const updatedata = async () => {
    try {
      const res = await axios.patch(
        "http://localhost:7777/profile/edit",
        { firstName, lastName, age, about, gender, photoUrl, skills },
        { withCredentials: true }
      );
      dispatch(Adduser(res?.data?.data));
      toast.success("Profile updated sucessfully!");
      navigate("/profile");
    } catch (error) {
      console.log(error.console);
    }
  };

  return (
    user && (
      <div className=" overflow-y-auto overflow-x-hidden ">
        <Navbar />

        <div className="min-h-screen  flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-zinc-700 w-full  max-w-2xl  rounded-2xl shadow-2xl overflow-hidden p-6 md:p-10"
          >
            <div className="flex flex-col md:flex-col gap-8 items-center">
              <div className="flex flex-col items-center">
                <img
                  src={profile.photoUrl}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
                />
              </div>

              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6 ">
                  <h1 className="text-white  ">FirstName</h1>
                  <input
                    type="text"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleChange}
                    className="input"
                    placeholder="First Name"
                  />
                  <h1 className="text-white ">LastName</h1>
                  <input
                    type="text"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleChange}
                    className="input"
                    placeholder="Last Name"
                  />
                  <h1 className="text-white ">Age</h1>
                  <input
                    type="number"
                    name="age"
                    value={profile.age}
                    onChange={handleChange}
                    className="input"
                    placeholder="Age"
                  />
                  <h1 className="text-white ">Gender</h1>
                  <input
                    type="text"
                    name="gender"
                    value={profile.gender}
                    onChange={handleChange}
                    className="input"
                    placeholder="gender"
                  />
                </div>

                <div className="">
                  <label htmlFor="about" className=" text-white ">
                    About
                  </label>
                  <div className=" w-full flex mt-3  overflow-x-hidden">
                    <textarea
                      name="about"
                      id="about"
                      value={profile.about}
                      onChange={handleChange}
                      className="input w-full pt-5 text-sm md:text-lg lg:text-xl  h-[15vh] resize-none flex flex-wrap overflow-x-hidden overflow-y-auto"
                      placeholder="Tell us about yourself"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-md font-semibold mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full shadow-sm"
                      >
                        <input
                          type="text"
                          value={skill}
                          onChange={(e) =>
                            handleSkillChange(index, e.target.value)
                          }
                          className="bg-transparent outline-none text-sm mr-2"
                        />
                        <button onClick={() => removeSkill(index)}>
                          <X size={14} />
                        </button>
                      </motion.div>
                    ))}
                    <button
                      onClick={addSkill}
                      className="text-sm px-[5%] py-[1%] rounded-full bg-purple-400 text-zinc-300 font-semibold cursor-pointer md:ml-2 hover:text-indigo-800"
                    >
                      + Add Skill
                    </button>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-4">
                  <button className="px-4 py-2 bg-gray-400 hover:bg-gray-300 cursor-pointer rounded-full text-sm">
                    Cancel
                  </button>
                  <button
                    onClick={updatedata}
                    className="px-4 py-2 bg-indigo-500 cursor-pointer text-white hover:bg-indigo-600 rounded-full text-sm"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <Footer />
      </div>
    )
  );
};

export default Editprofile;
