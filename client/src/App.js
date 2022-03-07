import React,{Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Signup from '../src/components/pages/Signup';
import LoginUser from '../src/components/pages/Login';
import Logout from '../src/components/pages/Logout';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Genre from './components/pages/Genre';
import Platforms from './components/pages/Platforms';
import Games from './components/pages/Games';
import Footer from './components/pages/Footer';
import PlatformPage from './components/PlatformPage';
import GameDetails from './components/pages/GameDetails';
import Profile from './components/pages/Profile';


class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <Navbar />
            <Route exact path="/" component={Home} />
            <Route exact path="/genre" component={Genre} />
            <Route exact path="/platforms" component={Platforms} />
            <Route exact path="/games" component={Games} />
            <Route path="/games/:pageid" component={Games} />
            <Route path="/platformpage/:platform" component={PlatformPage} />
            <Route path="/game/:name/:id" component={GameDetails} />
            <Route path="/register" component={Signup} />
            <Route path="/login" component={LoginUser} />
            <Route path="/logout" component={Logout} />
            <Route path="/profile" component={Profile} />
            <Footer />
          </div>
        </Router>
    );
  }
}
export default App;
