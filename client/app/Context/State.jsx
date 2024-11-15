"use client";
import React, { useEffect, useState } from "react";
import Context from "./Context";
import axios from "axios";
import { ADMIN_BACKEND_URI, BACKEND_URI } from "../utils/url";
import { getCookie } from "cookies-next";

const State = (props) => {
  const [userData, setUserData] = useState();
  const [agency_templates, setAgency_templates] = useState();

  const checkToken = () => {
    let cookie = getCookie("token");
    if (cookie?.length > 5) {
      try {
        axios
          .get(`${BACKEND_URI}/client/me`, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookie}`,
            },
          })
          .then((res) => {
            setUserData(res.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getTemplates = (id) => {
    let cookie = getCookie("token");
    setAgency_templates([]);
    if (cookie?.length > 5 && id) {
      try {
        axios
          .get(`${ADMIN_BACKEND_URI}/template/templates?agency_id=${id}`, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookie}`,
            },
          })
          .then((res) => {
            setAgency_templates(res.data.templates);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    let id = userData?.agency_id
      ? userData?.agency_id
      : "6521d442-4378-44ec-a305-f55c2aca9b23";
    getTemplates(id);
  }, [userData]);

  return (
    <Context.Provider
      value={{ userData, setUserData, checkToken, agency_templates }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default State;
