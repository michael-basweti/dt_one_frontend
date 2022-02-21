import "./App.css";
import "../src/components/layout/Navbar.css";
import AlertState from "./context/alert/AlertState";
import AuthState from "./context/auth/AuthState";
import setAuthToken from "./utils/setAuthToken";
import RouteComponent from "./components/RouteComponent";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <AlertState>
        <RouteComponent />
      </AlertState>
    </AuthState>
  );
}

export default App;
