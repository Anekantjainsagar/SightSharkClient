"use client";
import React, { useEffect, useState } from "react";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import AddAgency from "@/app/Components/Agencies/AddAgency";
import AgencySmallBlock from "@/app/Components/Agencies/AgencySmallBlock";
import Image from "next/image";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import Notify from "@/app/Components/Overview/Notify";
import { useRouter } from "next/navigation";

const Overview = () => {
  const [page, setPage] = useState(1);
  const [addAgency, setAddAgency] = useState(false);
  const history = useRouter();

  return (
    <div className="flex items-start h-[100vh]">
      <Leftbar />
      <AddAgency showSubscribe={addAgency} setShowSubscribe={setAddAgency} />
      <div className="w-[85%] bg-main h-full relative">
        <div className="bg-newBubbleColor/10 w-[50vw] h-[30vh] absolute top-1/2 -translate-y-1/2 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-0 absolute top-3/6 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-20 absolute bottom-10 rounded-full"></div>
        <div className="absolute backdrop-blur-3xl top-0 left-0 w-full h-full px-5 overflow-y-auto">
          <Navbar />
          <div className="text-white w-full px-6">
            <div className="text-white w-full rounded-xl p-4 bg-[#171C2A]/20 border border-gray-500/5 mt-6">
              <h3 className="text-[20px]">Dashboards</h3>
              <div className="grid grid-cols-4 gap-x-4 mt-4">
                {[
                  {
                    img: "/Agency/individual/templates/1 (2).png",
                  },
                  {
                    img: "/Agency/individual/templates/1 (1).png",
                  },
                  { img: "/Agency/individual/templates/1 (4).png" },
                  {
                    img: "/Agency/individual/templates/1 (3).png",
                  },
                ].map((e, i) => {
                  return (
                    <div key={i}>
                      <Image
                        src={e?.img}
                        alt={e?.img?.src}
                        width={1000}
                        height={1000}
                      />
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
