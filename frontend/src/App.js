import './App.css';
import React from 'react';
import axios from 'axios';
import { Route, Routes } from "react-router-dom";
import Main from './components/views/MainView/Main.js'
import Login from "./components/views/LoginView/Login.js";
import ForgotPassword from "./components/views/ForgotPasswordView/ForgotPassword.js";
import PasswordReset from './components/views/PasswordResetView/PasswordReset.js';
import SignUp from "./components/views/SignUpView/SignUp.js";
import SurveyMain from "./components/views/SurveyMainView/SurveyMain.js";
import AdminForms from "./components/views/AdminFormsView/AdminForms.js";
import Profile from "./components/views/ProfileView/Profile.js";
import User from "./components/views/UserView/User.js";
import AddForm from './components/views/AddFormView/AddForm.js';
import ParticipantList from './components/views/ParticipantListView/ParticipantList.js';
import ViewForm from './components/views/ViewFormView/ViewForm.js';
import UserForms from './components/views/UserFormsView/UserForms.js';
import SurveyForm from './components/views/SurveyFormView/SurveyForm.js';
import UserParticipatedForms from './components/views/UserParticipatedFormsView/UserParticipatedForms.js';
import UserSurvey from './components/views/UserSurveyView/UserSurvey.js';

function App() {

  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';

  //const isLogged = localStorage.getItem('username') ;

  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<Main/>}>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
          <Route path="/signUp" element={<SignUp/>}></Route>
          <Route path="/password-reset/:token" element={<PasswordReset/>}></Route>
        </Route>

         <Route element={ <SurveyMain/> }>
            <Route path="survey/adminForms" element={<AdminForms/>}></Route>
            <Route path="survey/profile/:userId" element={<Profile/>}></Route>
            <Route path="survey/user" element={<User/>}></Route>
            <Route path="survey/addForms" element={<AddForm/>}></Route>
            <Route path="survey/participantList/:surveyId" element={<ParticipantList/>}></Route>
            <Route path="survey/viewform/:surveyId/:participantId" element={<ViewForm/>}></Route>
            <Route path="survey/userForms" element={<UserForms/>}></Route>
            <Route path="survey/surveyForm/:surveyId" element={<SurveyForm/>}></Route>
            <Route path="/survey/userParticipatedForms/" element={<UserParticipatedForms/>}></Route>
            <Route path="/survey/userSurvey/:userId" element={<UserSurvey/>}></Route>
        </Route>

        <Route path="*" element={<h1>Page Not found</h1>}></Route>

      </Routes>

    </div>
  );
}

export default App;
