import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './pages/Home';
import Survey from './pages/Survey';
import Header from './components/Header/index';
import Footer from './components/Footer/index';
import Freelances from './pages/Freelances/index';
import Results from './pages/results/index';
import Error from './components/Error/index';
import GlobalStyle from './utils/style/GlobalStyle';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, SurveyProvider } from './utils/context'


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <SurveyProvider>
          <GlobalStyle />
          <Header />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/survey/:questionNumber' element={<Survey />} />
            <Route path='/freelances' element={<Freelances />} />
            <Route path='/results' element={<Results />} />
            <Route path='*' element={<Error />} />
          </Routes>
          <Footer />
        </SurveyProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
