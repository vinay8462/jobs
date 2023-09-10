import {Switch, Route, Redirect} from 'react-router-dom'

import './App.css'
import LoginPage from './components/LoginPage/Login'
import Home from './components/Home/Home'
import NotFound from './components/NotFound/NotFound'
import Jobs from './components/Jobs/Jobs'
import JobItemDetails from './components/JobItemDetails/JobItemDetails'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/Jobs" component={Jobs} />
    <ProtectedRoute exact path="/Jobs/:id" component={JobItemDetails} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
