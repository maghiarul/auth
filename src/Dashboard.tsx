import React from "react";
import { useState, useEffect } from "react";

function Dashboard() {
  //   const [token, setToken] = useState(()=>{
  //     const saved:any = localStorage.getItem("token")
  //     const initialValue = JSON.parse(saved);
  //     setToken(initialValue)
  //   });
  // const saved = JSON.parse(localStorage.getItem("token")!);
  const saved = JSON.parse(localStorage.getItem("token")!);
  console.log(saved);
  window.onbeforeunload = () => {
    localStorage.clear();
  };
  if (saved?.length !== 0 && saved !== null && saved !== undefined) {
    return (
      <div>
        <h1>bravo ma , esti logat</h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1>du-te ba si logheaza-te</h1>
        <a href="/">i-a de aici</a>
      </div>
    );
  }
}

export default Dashboard;
