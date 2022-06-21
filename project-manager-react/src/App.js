import { Routes, Route } from 'react-router-dom';
import { AdminLayout } from './layout/Admin';
import { PublicLayout } from './layout/Public';
import { Login } from './pages/Login';
import { ProjectDetail } from './pages/Project-detail';
import { ProjectList } from './pages/Project-list';
import { Register } from './pages/Register';
import { UserList } from './pages/User-list';


function App() {
  return (
    <Routes>
       <Route path='admin' element={<AdminLayout/>}>
        <Route path='projects' element={<ProjectList/>}></Route>
        <Route path='projects/:id/detail' element={<ProjectDetail/>}></Route>
        <Route path='users' element={<UserList/>}></Route>
      </Route>
      <Route path='auth' element={<PublicLayout/>}>
        <Route path='login' element={<Login/>}></Route>
        <Route path='register' element={<Register/>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
