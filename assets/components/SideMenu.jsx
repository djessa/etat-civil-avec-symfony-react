import React, { useState } from 'react'
import { Button, IconButton, List, ListItem, ListItemIcon, ListItemText, ListSubheader, makeStyles, withStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { Add, Alarm, Album } from '@material-ui/icons';
import { Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

// withStyles & makeStyles

const style = {
    sideMenu: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        left: '0px',
        width: '275px',
        height: '100%',
        direction: 'inherit',
        boxSizing: 'border-box !important',
        visibility: 'visible',
        backgroundColor: '#253053'
    }
}

const ListItems = ({ items }) => items
    .filter(({ hidden }) => !hidden)
    .map(({ label, disabled, Icon, path }, i) => (
    <MenuItem
    button
    key={i}
    disabled={disabled}
    style={{listStyleType: 'none', color: '#fff'}}
    >
    <Button color="inherit" style={{textTransform: 'capitalize', padding: '5px', fontSize: '1em'}}>
    <NavLink exact to={path} className="link">
        {label}
    </NavLink>
    </Button>
    </MenuItem>
));

const SideMenu = (props) => {
    const [items] = useState({
        naissance: [
            { label: 'Déclaration', Icon: Add, path: '/declaration_naissance' },
            { label: 'Régistre', Icon: Album, path: '/naissances' },
        ],
        deces: [
            { label: 'Déclaration', Icon: Add, path: '/declaration_deces' },
            { label: 'Régistre', Icon: Album , path: '/deces'},
        ],
        mariage: [
            { label: 'Déclaration', Icon: Add, path: '/declaration_mariage' },
            { label: 'Régistre', Icon: Album, path: '/mariages' },
        ],
        divorce: [
            { label: 'Déclaration', Icon: Add, path: '/declaration_divorce' },
            { label: 'Régistre', Icon: Album, path: '/divorces' },
        ]
    });
    const { classes } = props;
    return (
        <div className={classes.sideMenu}>
            <div style={{height: '150px', marginLeft: '5%', width: '90%'}}>
                <hr/>
                <img src="/images/flag.jpg" alt="drapeau" className="image"/>
                <hr/>
            </div>
            <div className="navigation">
                <Menu className="menu">
                    <SubMenu title="Naissance" className="submenu">
                        <ListItems items={items.naissance}>Déclaration</ListItems>
                    </SubMenu>
                    <SubMenu title="Décès"  className="submenu">
                        <ListItems items={items.deces}>Déclaration</ListItems>
                    </SubMenu>
                    <SubMenu title="Mariages" className="submenu">
                        <ListItems items={items.mariage}>Déclaration</ListItems>
                    </SubMenu>
                    <SubMenu title="Divorces" className="submenu">
                        <ListItems items={items.divorce}>Déclaration</ListItems>
                    </SubMenu>
                </Menu>
            </div>
        </div>
    )
}

export default withStyles(style)(SideMenu);