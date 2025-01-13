import Main from './components/views/MainView/Main.js';
import SurveyMain from './components/views/SurveyMainView/SurveyMain.js';
import AdminForms from './components/views/AdminFormsView/AdminForms.js';
import Profile from './components/views/ProfileView/Profile.js';
import User from './components/views/UserView/User.js';
import Login from './components/views/LoginView/Login.js';
import ForgotPassword from './components/views/ForgotPasswordView/ForgotPassword.js';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import axios from 'axios';

function App() {

  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';

  return (
    <div className="App">
      <header className="App-header">
       <main>
         <SurveyMain/>
          {/* <Main/> */}
        </main>
      </header>
    </div>
  );
}

export default App;
