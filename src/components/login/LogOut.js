import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const LogOut = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, []);
  return <div></div>;
};

export default LogOut;
