
import './App.css';
import UserComponent from './components/UserComponent/UserComponent';
import UserViewContainer from './containers/UserViewContainer/UserViewContainer';
import CompanyComponent from './components/companyComponent/companyComponent';

import { ThemeProvider } from '@mui/material';
import theme from './styles/theme';

import { BrowserRouter,Routes,Route } from 'react-router-dom';
import AllCompaniesComponent from './components/allCompaniesComponent/allCompaniesComponent';

//treba zamijeniti theme.js u stilovima kada se bude stilizovala aplikacija
function App() {
  
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserComponent/>}></Route>
          <Route path="/user/page" element={<UserViewContainer/>}></Route>
          <Route path="/companies" element={<AllCompaniesComponent/>}></Route>
          <Route path="/company/:1" element={<CompanyComponent/>}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
