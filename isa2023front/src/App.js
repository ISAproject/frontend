
import './App.css';
import UserComponent from './components/UserComponent/UserComponent';
import CompanyComponent from './components/companyComponent/companyComponent';

import { ThemeProvider } from '@mui/material';
import theme from './styles/theme';

import { BrowserRouter,Routes,Route } from 'react-router-dom';

//treba zamijeniti theme.js u stilovima kada se bude stilizovala aplikacija
function App() {
  
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserComponent/>}></Route>
          <Route path="/company" element={<CompanyComponent/>}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
