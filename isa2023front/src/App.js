
import './App.css';
import UserViewContainer from './containers/UserViewContainer/UserViewContainer';
import CompanyComponent from './components/companyComponent/companyComponent';

import { ThemeProvider } from '@mui/material';
import theme from './styles/theme';

import { BrowserRouter,Routes,Route } from 'react-router-dom';
import AllCompaniesComponent from './components/allCompaniesComponent/allCompaniesComponent';
import HomePageContainer from './containers/homePageContainer/home-page-container';
import RegisterUserContainer from './containers/registerUserContainer/register-user-container';

//treba zamijeniti theme.js u stilovima kada se bude stilizovala aplikacija
function App() {
  
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/user/page/:id" element={<UserViewContainer/>}></Route>
          <Route path="/companies" element={<AllCompaniesComponent/>}></Route>
          <Route path="/company/:id" element={<CompanyComponent/>}></Route>
          <Route path="/home" element={<HomePageContainer/>}></Route>
          <Route path="/register" element={<RegisterUserContainer/>}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
