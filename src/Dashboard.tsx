import { useCookies } from "react-cookie";

function Dashboard() {
  window.onbeforeunload = () => {
    localStorage.clear();
  };
  const [cookies, setCookie] = useCookies();

  if (cookies.token) {
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
