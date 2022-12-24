import React from "react";

function Dashboard() {
  //   const [token, setToken] = useState(()=>{
  //     const saved:any = localStorage.getItem("token")
  //     const initialValue = JSON.parse(saved);
  //     setToken(initialValue)
  //   });
  const saved = JSON.parse(localStorage.getItem("token")!);
  console.log(saved);
  if (saved.length !== 0)
    return (
      <div>
        <h1>bravo ma , esti logat</h1>
      </div>
    );
  else {
    return (
      <div>
        <h1>du-te ba si logheaza-te</h1>
        <a href="/">i-a de aici</a>
      </div>
    );
  }
}

export default Dashboard;
