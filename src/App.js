import { BrowserRouter,Route,Routes } from 'react-router-dom';
import './App.css';

import HomePage from './posts/component/pages/HomePage';
import WritePage from './posts/component/pages/WritePage';
import ViewPage from './posts/component/pages/ViewPage';
import UpdatePage from './posts/component/pages/UpdatePage';
// import ForecastSelectPage from './bbs/component/pages/ForecastSelectPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <HomePage /> }></Route>
        <Route path="/write" element={ <WritePage /> }></Route>
        <Route path="/post/:id" element={ <ViewPage /> }></Route>
        <Route path="/update/:id" element={ <UpdatePage /> }></Route>
        {/* 
        
        <Route path="/forecast-select" element={ <ForecastSelectPage />}></Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
