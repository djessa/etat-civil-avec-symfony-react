import React, { useState } from 'react'
import { Button, IconButton, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { Add, Alarm, Album } from '@material-ui/icons';
import { Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';

const SideMenu = (props) => {

    return (
        <div className="sideMenu">
            <div  className="appLogo">
                <img src="/images/flag.jpg" alt="drapeau" className="img-fluid rounded shadow"/>
                <span>Etat civil</span>
            </div>
            <div className="navigation">
                <List>
                    <ListItem>
                        <NavLink to="/declaration" className="link">
                            <Add  />
                            <span>Déclaration</span>
                        </NavLink>
                    </ListItem>
                    <ListItem>
                        <NavLink to="/" className="link">
                            <Album  />
                            <span>Régistre</span>
                        </NavLink>
                    </ListItem>
                    <ListItem>
                        <NavLink to="/" className="link">
                            <Album  />
                            <span>Statistique</span>
                        </NavLink>
                    </ListItem>
                    <ListItem>
                        <NavLink to="/" className="link">
                            <Album  />
                            <span>Administration</span>
                        </NavLink>
                    </ListItem>
                </List>
            </div>
            <div className="footer">
                coopyright &copy; 2021
            </div> 
        </div>
    )
}

export default SideMenu