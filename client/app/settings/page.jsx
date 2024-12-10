"use client";
import React, { useContext, useEffect, useState } from "react";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import SettingsLeftbar from "@/app/Components/Settings/Leftbar";
import { BACKEND_URI } from "../utils/url";
import { getCookie } from "cookies-next";
import Context from "../Context/Context";
import toast from "react-hot-toast";

const Settings = () => {
  const { userData, checkToken } = useContext(Context);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    postal_code: "",
  });

  useEffect(() => {
    setData({
      firstName: userData?.client_name?.split(" ")[0],
      lastName: userData?.client_name?.split(" ")[1],
      email: userData?.email_address
        ? userData?.email_address
        : userData?.phone,
      phone: userData?.key_contact_phone,
      ...userData,
    });
  }, [userData]);

  const updateUsers = () => {
    if (data?.firstName && data?.lastName && data?.email) {
      const queryParams = new URLSearchParams({
        ...userData,
        email: data?.email,
        password: data?.password,
        first_name: data?.firstName,
        last_name: data?.lastName,
        phone: data?.phone || "",
      }).toString();

      try {
        fetch(`${BACKEND_URI}/client/update?${queryParams}`, {
          headers: {
            Accept:
              "application/json, application/xml, text/plain, text/html, *.*",
            Authorization: `Bearer ${getCookie("token")}`,
            method: JSON.stringify({ user_id: userData?.user_id }),
          },
          method: "PUT",
        })
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            if (res.msg) {
              toast.success("User updated successfully");
              checkToken();
            }
            if (res.detail) {
              toast.error(res.detail);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Please fill all the details");
    }
  };

  return (
    <div className="flex items-start h-[100vh]">
      <Leftbar />
      <div className="w-[85%] bg-main h-full relative">
        <div className="bg-newBubbleColor/10 w-[30vw] h-[30vh] absolute top-1/2 -translate-y-1/2 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[30vw] h-[30vh] absolute left-0 bottom-0 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[30vw] h-[30vh] absolute left-[40%] top-1/2 -translate-y-1/2 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-0 absolute top-3/6 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-20 absolute bottom-0 rounded-full"></div>
        <div className="absolute backdrop-blur-3xl top-0 left-0 w-full h-full px-5">
          <Navbar />
          <div className="h-[85vh] w-full flex gap-x-5 justify-between items-start text-white px-6">
            <SettingsLeftbar />
            <div className="w-8/12 h-fit justify-between flex flex-col items-start border border-gray-500/5 rounded-lg px-6 py-4 text-white">
              <div className="w-full">
                <h4 className="mainLogoSize">Account</h4>{" "}
                <div className="gradient-line my-4"></div>
                <h6 className="text-lg min-[1600px]:text-[20px] font-medium mt-5">
                  Profile
                </h6>{" "}
                <div className="grid grid-cols-2 gap-x-8 gap-y-6 mt-4 w-full">
                  <div className="flex flex-col">
                    <label
                      htmlFor="firstName"
                      className="mb-1.5 text-sm min-[1600px]:text-base"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      value={data?.firstName}
                      onChange={(e) => {
                        setData({ ...data, firstName: e.target.value });
                      }}
                      type="text"
                      placeholder="Enter First Name"
                      className="glass outline-none border border-gray-500/5 px-4 py-2 rounded-md text-sm min-[1600px]:text-base"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="lastName"
                      className="mb-1.5 text-sm min-[1600px]:text-base"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      value={data?.lastName}
                      onChange={(e) => {
                        setData({ ...data, lastName: e.target.value });
                      }}
                      type="text"
                      placeholder="Enter Last Name"
                      className="glass outline-none border border-gray-500/5 px-4 py-2 rounded-md text-sm min-[1600px]:text-base"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="email"
                      className="mb-1.5 text-sm min-[1600px]:text-base"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      value={data?.email}
                      onChange={(e) => {
                        setData({ ...data, email: e.target.value });
                      }}
                      type="email"
                      placeholder="Enter Email"
                      className="glass outline-none border border-gray-500/5 px-4 py-2 rounded-md text-sm min-[1600px]:text-base"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="phone"
                      className="mb-1.5 text-sm min-[1600px]:text-base"
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      value={data?.phone}
                      onChange={(e) => {
                        setData({ ...data, phone: e.target.value });
                      }}
                      type="number"
                      placeholder="Enter Phone"
                      className="glass outline-none border border-gray-500/5 px-4 py-2 rounded-md text-sm min-[1600px]:text-base"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-10 flex items-center justify-end w-full">
                <button
                  className={`bg-[#898989]/15 font-semibold min-[1600px]:w-[160px] w-[120px] min-[1600px]:py-3 py-2 min-[1600px]:text-base text-sm rounded-xl ml-4`}
                  onClick={() => {
                    setData({
                      firstName: userData?.first_name,
                      lastName: userData?.last_name,
                      ...userData,
                    });
                    toast.success("Changes Discarded");
                  }}
                >
                  Discard
                </button>
                <button
                  className={`bg-newBlue font-semibold min-[1600px]:w-[160px] w-[120px] min-[1600px]:py-3 py-2 min-[1600px]:text-base text-sm rounded-xl ml-4`}
                  onClick={() => {
                    updateUsers();
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
