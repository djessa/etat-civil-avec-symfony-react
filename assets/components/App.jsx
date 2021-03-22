import React from 'react';

import './App.css';

//Importing bootstrap and other modules
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/umd/popper.min.js'

import $ from 'jquery';
class App extends React.Component {
  componentDidMount(){

    // Sidebar Toggle Menu Click
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
     });
  }
  render() {
    return (
      <div className="MainDiv">
        <div class="d-flex" id="wrapper">


            <div class="bg-light border-right" id="sidebar-wrapper">
              <div class="sidebar-heading">Therichpost </div>
              <div class="list-group list-group-flush">
                <a href="#" class="list-group-item list-group-item-action bg-light">Dashboard</a>
                <a href="#" class="list-group-item list-group-item-action bg-light">Shortcuts</a>
                <a href="#" class="list-group-item list-group-item-action bg-light">Overview</a>
                <a href="#" class="list-group-item list-group-item-action bg-light">Events</a>
                <a href="#" class="list-group-item list-group-item-action bg-light">Profile</a>
                <a href="#" class="list-group-item list-group-item-action bg-light">Status</a>
              </div>
            </div>

            <div id="page-content-wrapper">

              <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                <button class="btn btn-primary" id="menu-toggle">Toggle Menu</button>

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                    <li class="nav-item active">
                      <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dropdown
                      </a>
                      <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Something else here</a>
                      </div>
                    </li>
                  </ul>
                </div>
              </nav>

              <div class="container-fluid">
                <h1 class="mt-4">Reactjs Sidebar Responsive Template - Therichpost.com</h1>
                <p>Reactjs Sidebar Responsive Template - Therichpost.com 
                    Reactjs Sidebar Responsive Template - Therichpost.com
                    Reactjs Sidebar Responsive Template - Therichpost.com
                    Reactjs Sidebar Responsive Template - Therichpost.com
                    Reactjs Sidebar Responsive Template - Therichpost.com
                    Reactjs Sidebar Responsive Template - Therichpost.com
                    Reactjs Sidebar Responsive Template - Therichpost.com
                </p>
                
              </div>
            </div>


        </div>

      </div>
    );
  }
}

export default App;