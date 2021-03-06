// part
import NavBar from "./component/fectment/Navbar2";
import Footer from "./component/fectment/Footer";
import Contact from "./component/contact";
import Home from "./component/Home";
import Model from "./component/Model";
import Java from "./component/learningPage/Javascript";
import Main from "./component/admin/Main";

import * as constant from './Constants'

// styled
import CSS from "./content";

// library
import { BrowserRouter as Router ,Switch , Route, Redirect} from 'react-router-dom'
import React, { useState , useEffect} from 'react'

function App() {

  const [showModel, setShowModel] = useState(false)

  const [ auth , setAuth] = useState( false )

  const readStore = () => {
    const isLogin = localStorage.getItem(constant.LOGIN_STATUS)
    if (isLogin) {
      setAuth(true)
      setShowModel(false)
    }
  }

  useEffect(() => {
    readStore()
  }, []);

  const SecuredRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        // ternary condition
        auth ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );


  return (
    <div className="App">
      <Router>
        <CSS/>
        <NavBar setShowModel={setShowModel} />
        <Model showModel={showModel} setShowModel={setShowModel} readStore={readStore}/>
        <div style={{ minHeight: "6vh", marginTop: "20px"}}></div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/contact" component={Contact} />
          <SecuredRoute path="/admin" component={Main} />
          <SecuredRoute path="/:subject" component={Java} />
        </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
