import React, { useState } from 'react'
import { Button, IconButton, List, ListItem, ListItemIcon, ListItemText, ListSubheader, makeStyles, withStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { Add, Alarm, Album } from '@material-ui/icons';
import { Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// withStyles & makeStyles

const style = {
    sideMenu: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        left: '0px',
        width: '200px',
        height: '100%',
        direction: 'inherit',
        boxSizing: 'border-box !important',
        visibility: 'visible',
        backgroundColor: 'rgba(17, 134, 170, 0.9)'
    }
}

const declaration_items = [
    {label: 'Naissance', url: "/declaration_naissance"},
    {label: 'Mariage', url: "/declaration_mariage"},
    {label: 'Divorce', url: "/declaration_divorce"},
    {label: 'Décès', url: "/declaration_deces"}
];

const registre_items = [
    {label:'Naissance', url: '/naissances'}
];



const MenuItems = (props) => {
    return (props.items).map((item, index) => (
        <MenuItem key={index} style={{listStyleType: 'none', color: '#fff'}}>
            <Button color="inherit" style={{textTransform: 'capitalize', padding: '5px', fontSize: '1em'}}>
                <NavLink exact to={item.url} className="link">
                    {item.label}
                </NavLink>
            </Button>
        </MenuItem>
    ));
};

const SideMenu = (props) => {

    const { classes } = props;
    return (
        <div className={classes.sideMenu}>
            <div  style={{height: '150px', marginLeft: '5%', width: '90%', marginTop: '5px'}}>
                <div className="w-100 overflow-hidden">
                    <img src="/images/flag.jpg" alt="drapeau" className="image rounded shadow"/>
                </div>
            </div>
            <div className="navigation">
                <Menu className="menu">
                    <SubMenu title="Déclaration" className="submenu">
                        <MenuItems items={declaration_items} />
                    </SubMenu>
                    <SubMenu title="Régistre" className="submenu">
                        <MenuItems items={registre_items} />
                    </SubMenu>
                    <SubMenu className="submenu" title={<NavLink exact to="/administration" className="link">Administration</NavLink>}>
                        
                    </SubMenu>
                </Menu>
            </div>
        </div>
    )
}

export default withStyles(style)(SideMenu);