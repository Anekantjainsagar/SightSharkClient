"use client";
import React, { useContext } from "react";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import Image from "next/image";
import Context from "../Context/Context";

const Overview = () => {
  const { agency_templates } = useContext(Context);

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
            <div className="text-white w-full rounded-xl p-3 min-[1600px]:p-4 bg-[#171C2A]/20 border border-gray-500/5 mt-6">
              <h3 className="text-[20px]">Dashboards</h3>
              <div className="grid grid-cols-4 gap-x-4 mt-3 min-[1600px]:mt-4">
                {agency_templates?.map((e, i) => {
                  return (
                    <div
                      key={i}
                      className="border border-gray-500/20 p-3 rounded-2xl"
                    >
                      <Image
                        src={e?.img}
                        alt={e?.img?.src}
                        width={1000}
                        height={1000}
                        className="rounded-2xl"
                      />
                      <h4 className="mainText18 font-medium text-center mt-2.5">
                        {e?.title}
                      </h4>
                    </div>
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

export default Overview;
