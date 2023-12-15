
import './App.css';
import UserViewContainer from './containers/UserViewContainer/UserViewContainer';
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
import EquipmentsSearchContainer from "./containers/equipmentsSearchContainer/EquipmentsSearchContainer";
import EquipmentComponent from "./components/equipmentComponent/equipmentComponent";
import UpdateCompanyAdminComponent from './components/upateCompanyAdminComponent/updateCompanyAdminComponent';
import CompanyCreationContainer from "./containers/companyCreationContainer/CompanyCreationContainer";

//treba zamijeniti theme.js u stilovima kada se bude stilizovala aplikacija
function App() {
  
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/user/page/:id" element={<UserViewContainer/>}></Route>
          <Route path="/companies" element={<AllCompaniesComponent/>}></Route>
          <Route path="/company/:id/:role" element={<CompanyComponent/>}></Route>
          <Route path="/equipment/:id" element={<EquipmentComponent/>}></Route>
          <Route path="/companyAdmin/:id" element={<UpdateCompanyAdminComponent/>}></Route>
          <Route path="/home" element={<HomePageContainer/>}></Route>
          <Route path="/register" element={<RegisterUserContainer/>}></Route>
          <Route path="/verify/:id" element={<VerifyUserContainer/>}></Route>
          <Route path="/login" element={<LoginUserContainer/>}></Route>
          <Route path="/logged" element={<LoggedUserContainer/>}></Route>
          <Route path="/equipments" element={<EquipmentsSearchContainer/>}></Route>
          <Route path="/companycreation" element={<CompanyCreationContainer/>}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
