import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
const VCDashboard = () => {
  const [token] = useState(localStorage.getItem("user"));
  const history = useHistory();
  useEffect(() => {
    if (!token) {
      history.push("/");
    }
  }, []);
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>VC Dashboard</h2>
    </div>
  );
};

export default VCDashboard;
