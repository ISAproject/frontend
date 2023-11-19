
import './App.css';
import UserComponent from './components/UserComponent/UserComponent';
import CompanyComponent from './components/companyComponent/companyComponent';

import { ThemeProvider } from '@mui/material';
import theme from './styles/theme';

import { BrowserRouter,Routes,Route } from 'react-router-dom';
import AllCompaniesComponent from './components/allCompaniesComponent/allCompaniesComponent';
import HomePageContainer from './containers/homePageContainer/home-page-container';
import RegisterUserContainer from './containers/registerUserContainer/register-user-container';
import VerifyUserContainer from './containers/verifyUserContainer/verify-user-container';
import LoginUserContainer from './containers/loginUserContainer/login-user-container';
import LoggedUserContainer from './containers/loggedUserContainer/logged-user-container';

//treba zamijeniti theme.js u stilovima kada se bude stilizovala aplikacija
function App() {
  
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserComponent/>}></Route>
          <Route path="/companies" element={<AllCompaniesComponent/>}></Route>
          <Route path="/company/:id" element={<CompanyComponent/>}></Route>
          <Route path="/home" element={<HomePageContainer/>}></Route>
          <Route path="/register" element={<RegisterUserContainer/>}></Route>
          <Route path="/verify/:id" element={<VerifyUserContainer/>}></Route>
          <Route path="/login" element={<LoginUserContainer/>}></Route>
          <Route path="/logged/:userId" element={<LoggedUserContainer/>}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
