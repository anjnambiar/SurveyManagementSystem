import { Link } from "react-router-dom";

function Logout() {

    localStorage.clear();

    return (
        <div className="logout">
            <label className="sucessMessage">You have been logged out successfully!</label>
            <Link to='/' className="logout_link"> Click here to login again.</Link>
        </div>
    );
}

export default Logout;