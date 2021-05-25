import React, { useContext } from 'react'
import Index from './components/pages/index/index';
import Context from "./context/Context";
import Footer from './_partials/footer';
import Navbar from './_partials/navbar';
import Sidebar from './_partials/sidebar';
import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import CalanderWithDataTable from './components/pages/CalanderWithDataTable';
function App() {
  const { addSideBarClass } = useContext(Context);
  return (

    <Router>
      <Switch>
        <div className={addSideBarClass ? "sb-nav-fixed " : "sb-nav-fixed sb-sidenav-toggled"}  >
          <Navbar />
          <div id="layoutSidenav">
            <Sidebar />
            <div id="layoutSidenav_content">
              <main>
                <Route exact path="/calender" children={<Index />} />
                <Route exact path="/" children={<CalanderWithDataTable />} />
              </main>
              <Footer />
            </div>
          </div>
        </div>
      </Switch>
    </Router>

  );
}

export default App;
