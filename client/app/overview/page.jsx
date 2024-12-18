"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import Image from "next/image";
import Context from "../Context/Context";
import UpdateAssign from "../Components/Utils/UpdateAssign";

const Overview = () => {
  const { agency_templates, userData } = useContext(Context);

  return (
    <div className="flex items-start h-[100vh]">
      <Leftbar />
      <div className="w-[85%] bg-main h-full relative">
        <div className="bg-newBubbleColor/10 w-[50vw] h-[30vh] absolute top-1/2 -translate-y-1/2 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-0 absolute top-3/6 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-20 absolute bottom-10 rounded-full"></div>
        <div className="absolute backdrop-blur-3xl top-0 left-0 w-full h-full px-5 overflow-y-auto">
          <Navbar />
          <div className="text-white w-full px-6">
            <div className="text-white w-full rounded-xl p-3 min-[1600px]:p-4 overflow-y-auto h-[84vh] small-scroller overflow-x-hidden bg-[#171C2A]/20 border border-gray-500/5 mt-6">
              <h3 className="text-[20px]">Dashboards</h3>
              <div className="grid grid-cols-4 gap-4 mt-3 min-[1600px]:mt-4">
                {agency_templates?.map((e, i) => {
                  return (
                    e?.template_image && (
                      <div
                        key={i}
                        className="border border-gray-500/20 p-3 rounded-2xl cursor-pointer"
                      >
                        <Image
                          src={e?.template_image}
                          alt={e?.template_image?.src}
                          width={1000}
                          height={1000}
                          className="rounded-2xl h-[22vh] object-cover"
                          onClick={() => {
                            window.open(e?.report_link, "__blank");
                          }}
                        />
                        <div className="mt-3 flex items-center justify-between">
                          <h4 className="mainText18 font-medium">
                            {e?.report_name}
                          </h4>
                          {userData?.platform_name && (
                            <SelectingUser data={e} i={i} />
                          )}
                        </div>
                      </div>
                    )
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SelectingUser = ({ data }) => {
  const [searchVal, setSearchVal] = useState("");
  const { allUsers } = useContext(Context);
  const [show, setShow] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShow(false);
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  const toggleDropdown = (e) => {
    e?.stopPropagation();
    setSearchVal("");
    setShow(!show);
  };

  return (
    <div
      className="relative inline-block text-left"
      ref={dropdownRef}
      onClick={(e) => e?.stopPropagation()}
    >
      <Image
        src={
          data?.assigned_users?.length > 0
            ? allUsers?.find((e) => e?.id === data?.assigned_users[0])
                ?.profile_picture?.length > 0
              ? allUsers?.find((e) => e?.id === data?.assigned_users[0])
                  ?.profile_picture
              : "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
            : "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
        }
        alt="User Icon"
        width={10000}
        height={10000}
        className="w-[35px] aspect-square object-cover rounded-full border border-transparent hover:border-gray-800 transition-all cursor-pointer"
        onClick={toggleDropdown}
      />
      <div
        className={`absolute ${"left-[40px]"} top-1/2 w-[10vw] small-scroller -translate-y-1/2 bg-main border border-gray-300/50 rounded-md shadow-xl shadow-main text-white transition-transform duration-300 ease-in-out ${
          show ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        <input
          type="search"
          value={searchVal}
          placeholder="Search here..."
          onChange={(e) => setSearchVal(e.target.value)}
          className="border-b border-b-gray-300/50 outline-none bg-main text-white text-sm w-full py-2 px-3 rounded-md"
        />
        {[
          { profile_picture: "", first_name: "Unassigned", last_name: "" },
          ...allUsers,
        ]
          ?.filter((e) => {
            if (searchVal) {
              return (
                e?.first_name
                  ?.toLowerCase()
                  ?.includes(searchVal.toLowerCase()) ||
                e?.last_name?.toLowerCase()?.includes(searchVal.toLowerCase())
              );
            }
            return e;
          })
          ?.map((e, i) => {
            return (
              <User
                e={e}
                key={i}
                original_data={data}
                toggleDropdown={toggleDropdown}
              />
            );
          })}
      </div>
    </div>
  );
};

const User = ({ e, original_data, toggleDropdown }) => {
  const { allUsers } = useContext(Context);
  const [user, setUser] = useState();
  const [showSubscribe, setShowSubscribe] = useState(false);

  useEffect(() => {
    if (original_data?.assigned_users?.length > 0) {
      setUser(allUsers?.find((e) => e?.id == original_data?.assigned_users[0]));
    }
  }, [original_data]);

  return (
    <div
      className={`flex items-center ${
        user?.id === e?.id && "bg-gray-700/70"
      } gap-x-2 px-2 py-1.5 rounded-md hover:bg-gray-700/40 text-gray-300 hover:text-white`}
      onClick={() => {
        if (e?.first_name !== "Unassigned") {
          setShowSubscribe(!showSubscribe);
        }
        toggleDropdown();
      }}
    >
      <UpdateAssign
        showSubscribe={showSubscribe}
        setShowSubscribe={setShowSubscribe}
        original_data={original_data}
        user_data={e}
      />
      <Image
        src={
          e?.profile_picture ||
          "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
        }
        alt="User Icon"
        width={10000}
        height={10000}
        className="w-[25px] aspect-square object-cover rounded-full border border-transparent hover:border-gray-800 transition-all"
      />
      <p className="font-normal text-sm">
        {e?.first_name + " " + e?.last_name}
      </p>
    </div>
  );
};

export default Overview;
