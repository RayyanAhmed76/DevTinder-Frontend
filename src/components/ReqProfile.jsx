import React from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";

const ReqProfile = ({ data }) => {
  const navigate = useNavigate();
  const user = {
    photoURL:
      "https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg=",
    firstName: "rayyan",
    lastName: "ahmed",
    age: "21",
    gender: "male",
    about: "hi,I'M RAYYAN",
    skills: ["java", "react", "node"],
  };

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-white">Loading profile...</p>
      </div>
    );
  }
  const profile = {
    photoURL: user.photoURL,
    firstName: user.firstName,
    lastName: user.lastName,
    age: user.age,
    gender: user.gender,
    about: user.about,
    skills: user.skills,
  };
  return (
    <div className="bg-[rgba(0,0,0,.8)] absolute top-0 left-0 flex w-screen h-screen z-[50] items-center justify-center">
      <Link
        onClick={() => navigate(-1)}
        className="hover:text-[#6556CD] absolute right-[3%] top-[5%] text-5xl text-white ri-close-fill text-zinc-500 text-4xl"
      ></Link>
      <div className="min-h-screen flex items-center justify-center p-4 ">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-zinc-600 rounded-2xl shadow-xl p-8 w-[40vh]  h-auto "
        >
          <div className="flex flex-col items-center md:mt-[30%] gap-6 text-center">
            <img
              src={profile.photoURL}
              alt="Profile"
              className="w-32 h-32 md:w-52 md:h-52 rounded-full object-cover border-4 border-blue-500"
            />
            <h2 className="text-2xl font-bold mt-4">
              {profile.firstName} {profile.lastName}
            </h2>
            <p className="text-sm text-gray-300">
              {profile.gender}, {profile.age} years old
            </p>
            <p className="mt-4 text-gray-400 md:text-xl">{profile.about}</p>
            <div className="mt-6 w-full text-left flex flex-col items-center  ">
              <h3 className="text-lg font-semibold mb-2">Skills</h3>
              <ul className="flex flex-wrap gap-2">
                {profile.skills ? (
                  profile.skills.map((skill, index) => (
                    <motion.li
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </motion.li>
                  ))
                ) : (
                  <h1>No Skills</h1>
                )}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReqProfile;
