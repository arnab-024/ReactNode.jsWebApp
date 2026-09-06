import React from 'react'
import Sidebar from './components/Sidebar';
import Employees from './pages/Employees';
import Departments from './pages/Departments';
import Trainings from './pages/Trainings';

const App = () => {
  return (
    <div>
      <Sidebar/>
      <Employees/>
      <Departments />
      <Trainings/>
    </div>
  )
}

export default App;
