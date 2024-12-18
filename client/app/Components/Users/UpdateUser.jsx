"use client";
import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import Required from "../Utils/Required";
import { BACKEND_URI } from "@/app/utils/url";
import { getCookie } from "cookies-next";
import Context from "@/app/Context/Context";
import { MdKeyboardArrowDown } from "react-icons/md";
import axios from "axios";

const customStyles = {
  overlay: { zIndex: 50 },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "transparent",
    width: "65vw",
    border: "none",
  },
};

const UpdateUser = ({ showSubscribe, setShowSubscribe, userData }) => {
  let maxPage = 1;
  const context = useContext(Context);
  const { getUsers } = useContext(Context);
  const [page, setPage] = useState(1);
  const [original_data, setOriginal_data] = useState("");
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    access: "guest",
    profile: "",
    phone: "",
    postal_code: "",
    country: "India",
    password: "",
    profile: "",
    status: "",
  });
  const [availableRoles, setAvailableRoles] = useState([]);
  const [file, setFile] = useState("");
  const fileInputRef = React.useRef(null);

  useEffect(() => {
    setData({
      ...userData,
      firstName: userData?.first_name,
      lastName: userData?.last_name,
      access: userData?.role,
    });
    setOriginal_data(userData);
    setFile(userData?.profile_picture);
  }, [userData]);

  useEffect(() => {
    setAvailableRoles(["admin", "guest"]);
    setData({ ...data, access: "admin" });
  }, [context?.userData]);

  const handleFileChangeProfile = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(URL.createObjectURL(file));
      setData({ ...data, profile: file });
    }
  };

  function closeModal() {
    setShowSubscribe(false);
  }

  const updateUsers = async () => {
    if (data?.firstName && data?.lastName && data?.email && data?.access) {
      const queryParams = {
        sub_client_id: original_data?.id,
        first_name: data?.firstName?.toString(),
        last_name: data?.lastName?.toString(),
        email: data?.email?.toString(),
        password: data?.password?.toString(),
        phone: data?.phone?.toString() || "",
        profile_picture: "",
        postal_code: data?.postal_code?.toString() || "",
        role: data?.access?.toString() || "admin",
        country: data?.country?.toString() || "",
        status: data?.status?.toString() || "active",
        two_factor_authentication: original_data?.two_factor_authentication,
      };

      let formdata = new FormData();
      formdata.append("profile_picture", data?.profile || "");
      formdata.append("profile_picture_filename", data?.profile?.name || "");
      formdata.append(
        "profile_picture_content_type",
        data?.profile?.type || ""
      );

      try {
        const response = await axios.post(
          `${BACKEND_URI}/subclient/update`,
          formdata,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${getCookie("token")}`,
            },
            params: queryParams,
          }
        );

        if (response.data.msg) {
          getUsers();
          toast.success("User updated successfully");
          closeModal();
        }
        if (response.data.detail) {
          toast.error(response.data.detail);
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while updating the user.");
      }
    } else {
      toast.error("Please fill all the details");
    }
  };

  return (
    <div className="z-50">
      <Toaster />
      <Modal
        isOpen={showSubscribe}
        onRequestCl2ose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="relative rounded-lg bg-main pt-10 text-white">
          <AiOutlineClose
            size={40}
            onClick={closeModal}
            className="absolute top-2 right-2 px-2 cursor-pointer"
          />
          <div className="mb-5 text-center">
            <h1 className="mainLogoSize font-semibold">Update User Details</h1>
          </div>
          <div className="h-fit px-[8vw] w-full">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChangeProfile}
                />
                <div
                  onClick={() => {
                    fileInputRef.current.click();
                  }}
                  className="absolute bg-newBlue flex items-center justify-center text-2xl px-2 bottom-0 min-[1600px]:-bottom-2 cursor-pointer right-0 min-[1600px]:-right-2 rounded-full"
                >
                  +
                </div>
                <Image
                  src={file || "/Agency/temp_logo.png"}
                  alt="Agency Img"
                  width={1000}
                  height={1000}
                  className="w-[6vw] min-[1600px]:w-[4vw] h-[6vw] min-[1600px]:h-[4vw] object-cover rounded-full"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <div className="flex flex-col">
                <label
                  htmlFor="name"
                  className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                >
                  First Name
                  <Required />
                </label>
                <input
                  id="name"
                  value={data?.firstName}
                  onChange={(e) => {
                    setData({ ...data, firstName: e.target.value });
                  }}
                  type="text"
                  placeholder="Enter First Name"
                  className="bg-[#898989]/15 outline-none border border-gray-500/20 h-9 min-[1600px]:h-[45px] px-4 py-2 min-[1600px]:text-base text-sm rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="lastName"
                  className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                >
                  Last Name
                  <Required />
                </label>
                <input
                  id="lastName"
                  value={data?.lastName}
                  onChange={(e) => {
                    setData({ ...data, lastName: e.target.value });
                  }}
                  type="text"
                  placeholder="Enter Last Name"
                  className="bg-[#898989]/15 outline-none border border-gray-500/20 px-4 py-2 min-[1600px]:text-base text-sm rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                >
                  Email
                  <Required />
                </label>
                <input
                  id="email"
                  value={data?.email}
                  onChange={(e) => {
                    setData({ ...data, email: e.target.value });
                  }}
                  type="text"
                  placeholder="Enter Email"
                  className="bg-[#898989]/15 outline-none border border-gray-500/20 px-4 py-2 min-[1600px]:text-base text-sm rounded-md"
                />
              </div>{" "}
              <div className="flex flex-col">
                <label htmlFor="access" className="mb-1.5 w-fit relative">
                  Access
                  <Required />
                </label>

                <div className="relative w-full">
                  <select
                    name="access"
                    id="access"
                    className="glass outline-none w-full border border-gray-500/5 px-4 py-2 pr-10 min-[1600px]:text-base text-sm rounded-md appearance-none"
                    value={data?.access}
                    onChange={(e) => {
                      setData({ ...data, access: e.target.value });
                    }}
                  >
                    {availableRoles?.map((e, i) => {
                      return (
                        <option value={e} key={i} className="bg-main">
                          {e[0]?.toUpperCase() + e.slice(1)}
                        </option>
                      );
                    })}
                  </select>
                  <span className="absolute z-50 right-3 top-1/2 text-2xl -translate-y-1/2 pointer-events-none">
                    <MdKeyboardArrowDown />
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="phone"
                  className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  value={data?.phone}
                  onChange={(e) => {
                    setData({ ...data, phone: e.target.value });
                  }}
                  type="text"
                  placeholder="Enter Phone"
                  className="bg-[#898989]/15 outline-none border border-gray-500/20 px-4 py-2 min-[1600px]:text-base text-sm rounded-md"
                />
              </div>{" "}
              <div className="flex flex-col">
                <label
                  htmlFor="postal_code"
                  className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                >
                  Postal Code
                </label>
                <input
                  id="postal_code"
                  value={data?.postal_code}
                  onChange={(e) => {
                    setData({ ...data, postal_code: e.target.value });
                  }}
                  type="text"
                  placeholder="Enter Postal Code"
                  className="bg-[#898989]/15 outline-none border border-gray-500/20 px-4 py-2 min-[1600px]:text-base text-sm rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="country"
                  className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                >
                  Country
                </label>
                <input
                  id="country"
                  value={data?.country}
                  onChange={(e) => {
                    setData({ ...data, country: e.target.value });
                  }}
                  type="text"
                  placeholder="Enter Country"
                  className="bg-[#898989]/15 outline-none border border-gray-500/20 px-4 py-2 min-[1600px]:text-base text-sm rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="status"
                  className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                >
                  Status
                </label>

                <div className="relative w-full">
                  <select
                    id="status"
                    value={data?.status}
                    onChange={(e) => {
                      setData({ ...data, status: e.target.value });
                    }}
                    className="bg-[#898989]/15 w-full outline-none border border-gray-500/20 px-4 py-2 pr-10 min-[1600px]:text-base text-sm rounded-md appearance-none"
                  >
                    {["active", "inactive"].map((e, i) => {
                      return (
                        <option key={i} className="bg-main" value={e}>
                          {e[0]?.toUpperCase() + e.slice(1)}
                        </option>
                      );
                    })}
                  </select>
                  {/* Custom dropdown icon */}
                  <span className="absolute right-3 top-1/2 text-2xl -translate-y-1/2 pointer-events-none">
                    <MdKeyboardArrowDown />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="px-[5vw] w-full flex items-center justify-end py-5 text-sm min-[1600px]:text-base">
            <button
              onClick={() => {
                if (page == maxPage) {
                  updateUsers();
                } else {
                  setPage(page + 1);
                }
              }}
              className={`text-white bg-newBlue w-[170px] h-12 rounded-lg`}
            >
              Update
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateUser;
