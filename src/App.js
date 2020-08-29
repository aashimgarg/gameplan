import React , { Component } from 'react';
import { BrowserRouter, Switch, Route  } from 'react-router-dom';
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import ProjectDetails from './components/projects/ProjectDetails'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import ResetPassword from './components/auth/ResetPassword'
import CreateProject from './components/projects/CreateProject'
import MyProjects from './components/projects/MyProjects'


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/'component={Dashboard} />
            <Route exact path='/project/:id' component={ProjectDetails} />
            <Route exact path='/signin' component={SignIn} />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/myprojects' component={MyProjects} /> 
            <Route exact path='/create' component={CreateProject} />
            <Route exact path='/resetPassword' component={ResetPassword} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

