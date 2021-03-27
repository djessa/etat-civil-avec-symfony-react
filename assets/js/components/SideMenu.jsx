import React, { useState } from 'react'
import { Button, IconButton, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { Add, Alarm, Album } from '@material-ui/icons';
import { Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';

const SideMenu = (props) => {

    return (
        <div className="sideMenu">
            <div  style={{height: '150px', marginLeft: '5%', width: '90%', marginTop: '5px'}}>
                <div className="w-100 overflow-hidden">
                    <img src="/images/flag.jpg" alt="drapeau" className="image rounded shadow" width="80" height="80"/>
                </div>
            </div>
            <div className="navigation">

            </div>
        </div>
    )
}

export default SideMenu