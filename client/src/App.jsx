// css
import './App.css';
import './Assets/css/Login.css'
import "./Assets/css/About.css"
// MBD 5 
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";


import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Landing from './Components/Layout/Landing';
import Auth from './Views/Auth';
import ErrPage from './Views/404';

// Protected route (check nếu đã đăng nhập trong dashboard)
import ProtectedRoute from './Components/routing/ProtectedRoute';

// AUTH CONTEXT
import AuthContextProvider from './contexts/authContext';
import PostContextProvider from './contexts/postContext';

import DashBoard from './Views/DashBoard';
import About from './Views/About';

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <div className="App">
          <Router>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/login" render={props => <Auth {...props} authRoute='login' />} />
              <Route path="/register" render={props => <Auth {...props} authRoute='register' />} />
              <ProtectedRoute exact path='/home' component={DashBoard} />
              <ProtectedRoute path='/' component={About} />
              <Route path='/404' component={ErrPage} />
            </Switch>
          </Router>
        </div>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
