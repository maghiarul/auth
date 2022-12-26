import { useCookies } from "react-cookie";
import { useEffect } from "react";

function Dashboard() {
  window.onbeforeunload = () => {
    localStorage.clear();
  };
  const [cookies, setCookie, removeCookie] = useCookies();

  if (cookies.token) {
    return (
      <div>
        <h1>bravo ma , esti logat</h1>
        <button
          onClick={() => {
            removeCookie("token", { path: "/", sameSite: 'none'});
          }}
        >
          Sign out
        </button>
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
