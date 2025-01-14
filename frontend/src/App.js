import './App.css';
import axios from 'axios';
import { Navigate, Route, Routes } from "react-router-dom";
import Main from './components/views/MainView/Main.js'
import Login from "./components/views/LoginView/Login.js";
import ForgotPassword from "./components/views/ForgotPasswordView/ForgotPassword.js";
import SignUp from "./components/views/SignUpView/SignUp.js";
import SurveyMain from "./components/views/SurveyMainView/SurveyMain.js";
import AdminForms from "./components/views/AdminFormsView/AdminForms.js";
import Profile from "./components/views/ProfileView/Profile.js";
import User from "./components/views/UserView/User.js";
import AddForm from './components/views/AddFormView/AddForm.js';

function App() {

  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';

  const isLogged = localStorage.getItem('username') == null ? false : true;

  return (
    <div className="App">

      <Routes>
        <Route className="segment" path="/"  element={<Main/>}>
          <Route index element={<Login/>}></Route>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
          <Route path="/signUp" element={<SignUp/>}></Route>
        </Route>
      </Routes>

      <Routes>
        <Route path="survey" element={ <SurveyMain/> }>
            <Route path="survey/adminForms" element={<AdminForms/>}></Route>
            <Route path="survey/profile" element={<Profile/>}></Route>
            <Route path="survey/user" element={<User/>}></Route>
            <Route path="survey/addForms" element={<AdminForms/>}></Route>
            <Route path="*" element={<h1>Not found</h1>}></Route>
          </Route>
      </Routes>

    </div>
  );
}

export default App;
