"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const AgencyDetailsTopbar = () => {
  const history = useRouter();
  const pathname = usePathname();

  return (
    <div className="h-[5vh] flex items-start">
      {[
        { title: "About", route: "/agencies/alpha-solutions" },
        {
          title: "Edit Profile",
          route: "/agencies/alpha-solutions/edit-profile",
        },
      ].map((e, i) => {
        return (
          <button
            key={i}
            className={`${
              pathname == e?.route
                ? "bg-newBlue"
                : "bg-transparent text-[#B2B4BA]"
            } py-2 px-5 rounded-2xl mr-4`}
            onClick={() => {
              history.push(e?.route);
            }}
          >
            {e?.title}
          </button>
        );
      })}
    </div>
  );
};

export default AgencyDetailsTopbar;
