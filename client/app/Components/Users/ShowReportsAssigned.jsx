"use client";
import Modal from "react-modal";
import { getCookie } from "cookies-next";
import Context from "@/app/Context/Context";
import { BACKEND_URI } from "@/app/utils/url";
import toast, { Toaster } from "react-hot-toast";
import React, { useContext, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

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
    width: "30vw",
    border: "none",
  },
};

const ShowReportsAssigned = ({ showSubscribe, setShowSubscribe, data }) => {
  function closeModal() {
    setShowSubscribe(false);
  }

  return (
    <div className="z-50">
      <Toaster />
      <Modal
        isOpen={showSubscribe}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div
          className="relative rounded-lg bg-[#0C111D] py-6 border border-gray-500/40 px-4 text-white flex flex-col items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <h4 className="min-[1600px]:text-xl mb-2 text-center font-semibold">
            Assigned Reports to {data?.first_name}
          </h4>
          {data?.report_ids?.map((e, i, arr) => {
            return (
              <div
                key={i}
                className={`w-full mt-2 flex items-center justify-between`}
              >
                <p className="flex items-center">
                  <span className="mr-2">{i + 1}.</span>
                  {e?.report_name}
                </p>
                <AiOutlineClose
                  className="cursor-pointer text-red-200 hover:text-red-400 transition-all"
                  onClick={() => {
                    setShowSubscribe(false);
                  }}
                />
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
};

export default ShowReportsAssigned;
