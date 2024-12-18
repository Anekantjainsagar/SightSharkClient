import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import DeleteUser from "./DeleteUser";
import UpdateUser from "./UpdateUser";
import Context from "@/app/Context/Context";
import ShowReportsAssigned from "@/app/Components/Users/ShowReportsAssigned";

const UserDetailBlock = ({ data }) => {
  const { userData } = useContext(Context);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showReportsPopup, setShowReportsPopup] = useState(false);
  const [userClickedData, setUserClickedData] = useState();

  useEffect(() => {
    setUserClickedData(data);
  }, [data]);

  return (
    <>
      <DeleteUser
        showSubscribe={showDeletePopup}
        setShowSubscribe={setShowDeletePopup}
        data={data}
      />
      <UpdateUser
        showSubscribe={showUpdatePopup}
        setShowSubscribe={setShowUpdatePopup}
        userData={userClickedData}
      />
      <ShowReportsAssigned
        showSubscribe={showReportsPopup}
        setShowSubscribe={setShowReportsPopup}
        data={data}
      />
      <div className="py-4 px-7 border-gray-200/5 border-y grid userBlockGrid items-center cursor-pointer text-textGrey text-sm min-[1600px]:text-base">
        <div className="flex items-start min-[1600px]:ml-0 ml-2">
          {!data?.profile_picture ? (
            <Image
              src={"/Agency/Avatar.png"}
              width={1000}
              height={1000}
              className="w-8 min-[1600px]:w-10 object-cover aspect-square rounded-full"
              alt="Key contact"
            />
          ) : (
            <Image
              src={data?.profile_picture}
              width={1000}
              height={1000}
              className="w-8 min-[1600px]:w-10 aspect-square object-cover rounded-full"
              alt="Key contact"
            />
          )}
          <div className="ml-2.5 min-[1600px]:ml-4">
            <p className="mainText14">
              {data?.first_name} {data?.last_name}
            </p>
            <p className="mainText14 text-[#85888E]">{data?.email}</p>
          </div>
        </div>
        <h5 className="text-center">
          {data?.role[0].toUpperCase() + data?.role.slice(1)}
        </h5>
        <div className="w-full flex items-center justify-center">
          <div
            className={`status-user-${data?.status?.toLowerCase()} flex items-center gap-x-2 w-fit px-3 border-2 py-0.5 rounded-2xl`}
          >
            <div
              className={`w-2.5 h-2.5 rounded-full dot-status-user-${data?.status?.toLowerCase()}`}
            ></div>
            {data?.status[0]?.toUpperCase() + data?.status.slice(1)}
          </div>
        </div>
        <p className="text-center">
          {new Date(data?.last_online).toString().slice(4, 21)}
        </p>
        <div className="text-center">
          {data?.report_ids ? (
            <p
              onClick={() => {
                setShowReportsPopup(true);
              }}
              className="hover:underline transition-all hover:text-blue-400"
            >
              View Report
            </p>
          ) : (
            <p className="text-gray-400">No Report is Assigned</p>
          )}
        </div>
        <div className="flex items-center justify-end">
          {userData?.role != "guest" && (
            <div className="mr-4">
              <svg
                className="w-4 min-[1600px]:w-5 h-4 min-[1600px]:h-5"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={(e) => {
                  e.stopPropagation();
                  setUserClickedData(data);
                  setShowUpdatePopup(!showUpdatePopup);
                }}
              >
                <path
                  d="M9.1665 3.33332H5.6665C4.26637 3.33332 3.56631 3.33332 3.03153 3.6058C2.56112 3.84549 2.17867 4.22794 1.93899 4.69834C1.6665 5.23312 1.6665 5.93319 1.6665 7.33332V14.3333C1.6665 15.7335 1.6665 16.4335 1.93899 16.9683C2.17867 17.4387 2.56112 17.8212 3.03153 18.0608C3.56631 18.3333 4.26637 18.3333 5.6665 18.3333H12.6665C14.0666 18.3333 14.7667 18.3333 15.3015 18.0608C15.7719 17.8212 16.1543 17.4387 16.394 16.9683C16.6665 16.4335 16.6665 15.7335 16.6665 14.3333V10.8333M6.66648 13.3333H8.06193C8.46959 13.3333 8.67341 13.3333 8.86522 13.2873C9.03528 13.2464 9.19786 13.1791 9.34698 13.0877C9.51517 12.9847 9.6593 12.8405 9.94755 12.5523L17.9165 4.58332C18.6069 3.89296 18.6069 2.77368 17.9165 2.08332C17.2261 1.39296 16.1069 1.39296 15.4165 2.08332L7.44753 10.0523C7.15928 10.3405 7.01515 10.4847 6.91208 10.6528C6.8207 10.802 6.75336 10.9645 6.71253 11.1346C6.66648 11.3264 6.66648 11.5302 6.66648 11.9379V13.3333Z"
                  stroke="#85888E"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
          <div>
            <svg
              className="w-4 min-[1600px]:w-5 h-4 min-[1600px]:h-5"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={(e) => {
                e.stopPropagation();
                setShowDeletePopup(!showDeletePopup);
              }}
            >
              <g filter="url(#filter0_d_23_1215)">
                <path
                  d="M13.3333 5.00002V4.33335C13.3333 3.39993 13.3333 2.93322 13.1517 2.5767C12.9919 2.2631 12.7369 2.00813 12.4233 1.84834C12.0668 1.66669 11.6001 1.66669 10.6667 1.66669H9.33333C8.39991 1.66669 7.9332 1.66669 7.57668 1.84834C7.26308 2.00813 7.00811 2.2631 6.84832 2.5767C6.66667 2.93322 6.66667 3.39993 6.66667 4.33335V5.00002M8.33333 9.58335V13.75M11.6667 9.58335V13.75M2.5 5.00002H17.5M15.8333 5.00002V14.3334C15.8333 15.7335 15.8333 16.4336 15.5608 16.9683C15.3212 17.4387 14.9387 17.8212 14.4683 18.0609C13.9335 18.3334 13.2335 18.3334 11.8333 18.3334H8.16667C6.76654 18.3334 6.06647 18.3334 5.53169 18.0609C5.06129 17.8212 4.67883 17.4387 4.43915 16.9683C4.16667 16.4336 4.16667 15.7335 4.16667 14.3334V5.00002"
                  stroke="#D93F21"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  shapeRendering="crispEdges"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_23_1215"
                  x="-2.3335"
                  y="0.833374"
                  width="24.667"
                  height="26.3333"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_23_1215"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_23_1215"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetailBlock;
