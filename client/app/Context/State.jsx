"use client";
import React, { useEffect, useState } from "react";
import Context from "./Context";
import axios from "axios";
import { ADMIN_BACKEND_URI, BACKEND_URI } from "../utils/url";
import { getCookie } from "cookies-next";

const State = (props) => {
  const [userData, setUserData] = useState();
  const [users, setUsers] = useState();
  const [allUsers, setAllUsers] = useState([]);
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

  const getReport = (id) => {
    let cookie = getCookie("token");
    setAgency_templates([]);

    if (cookie?.length > 5 && id) {
      try {
        axios
          .get(`${BACKEND_URI}/client/get-reports?client_id=${id}`, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookie}`,
            },
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getUsers = (page = 1, order_by = "created_at", type = true) => {
    let cookie = getCookie("token");
    let limit = users?.limit ? users?.limit : 6;

    if (cookie?.length > 5) {
      try {
        axios
          .get(
            `${BACKEND_URI}/subclient/sub-clients/search?page=${page}&page_size=${limit}&sort_by=${order_by}&sort_order=${
              type ? "asc" : "desc"
            }&search=${""}`,
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookie}`,
              },
            }
          )
          .then((res) => {
            setUsers(res.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getAllUsers = () => {
    let cookie = getCookie("token");

    if (cookie?.length > 5) {
      try {
        axios
          .get(
            `${BACKEND_URI}/subclient/sub-clients/search?page=1&page_size=${
              users?.total
            }&sort_by=${"created_at"}&sort_order=${"asc"}&search=${""}`,
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookie}`,
              },
            }
          )
          .then((res) => {
            setAllUsers(res.data.data.sub_clients);
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
    getReport(id);
    getUsers(1);
  }, [userData]);

  useEffect(() => {
    getAllUsers();
  }, [users]);

  const checkPasswordCriteria = (password) => {
    return {
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  };

  const password_params = [
    "hasUppercase",
    "hasLowercase",
    "hasNumber",
    "hasSpecialChar",
  ];
  const tooltips = {
    hasUppercase: "Password must have at least one uppercase letter.",
    hasLowercase: "Password must have at least one lowercase letter.",
    hasNumber: "Password must have at least one number.",
    hasSpecialChar: "Password must have at least one special character.",
  };

  return (
    <Context.Provider
      value={{
        userData,
        setUserData,
        checkToken,
        agency_templates,
        checkPasswordCriteria,
        password_params,
        tooltips,
        getUsers,
        users,
        allUsers,
        setUsers,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default State;
