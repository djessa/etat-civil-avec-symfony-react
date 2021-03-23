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


const SideMenu = (props) => {

    const { classes } = props;
    return (
        <div className={classes.sideMenu}>
            <div style={{height: '150px', marginLeft: '5%', width: '90%'}}>
                <hr/>
                <img src="/images/flag.jpg" alt="drapeau" className="image"/>
            </div>
            <div className="navigation">
                <Menu className="menu">
                    <hr/>
                    <SubMenu title="Déclaration" className="submenu">
                        <MenuItem style={{listStyleType: 'none', color: '#fff'}}>
                            <Button color="inherit" style={{textTransform: 'capitalize', padding: '5px', fontSize: '1em'}}>
                                <NavLink exact to="/declaration_naissance" className="link">
                                    Naissance
                                </NavLink>
                            </Button>
                        </MenuItem>
                        <MenuItem style={{listStyleType: 'none', color: '#fff'}}>
                            <Button color="inherit" style={{textTransform: 'capitalize', padding: '5px', fontSize: '1em'}}>
                                <NavLink exact to="/declaration_mariage" className="link">
                                    Mariage
                                </NavLink>
                            </Button>
                        </MenuItem>
                        <MenuItem style={{listStyleType: 'none', color: '#fff'}}>
                            <Button color="inherit" style={{textTransform: 'capitalize', padding: '5px', fontSize: '1em'}}>
                                <NavLink exact to="/declaration_deces" className="link">
                                    Décès
                                </NavLink>
                            </Button>
                        </MenuItem>
                        <MenuItem style={{listStyleType: 'none', color: '#fff'}}>
                            <Button color="inherit" style={{textTransform: 'capitalize', padding: '5px', fontSize: '1em'}}>
                                <NavLink exact to="/declaration_divorce" className="link">
                                    Divorce
                                </NavLink>
                            </Button>
                        </MenuItem>
                        <MenuItem style={{listStyleType: 'none', color: '#fff'}}>
                            <Button color="inherit" style={{textTransform: 'capitalize', padding: '5px', fontSize: '1em'}}>
                                <NavLink exact to="/declaration_reconnaissance" className="link">
                                    Réconnaissance
                                </NavLink>
                            </Button>
                        </MenuItem>
                        <MenuItem style={{listStyleType: 'none', color: '#fff'}}>
                            <Button color="inherit" style={{textTransform: 'capitalize', padding: '5px', fontSize: '1em'}}>
                                <NavLink exact to="/declaration_adoption" className="link">
                                    Adoption simple
                                </NavLink>
                            </Button>
                        </MenuItem>
                        <MenuItem style={{listStyleType: 'none', color: '#fff'}}>
                            <Button color="inherit" style={{textTransform: 'capitalize', padding: '5px', fontSize: '1em'}}>
                                <NavLink exact to="/declaration_adoption" className="link">
                                    Adoption plenière
                                </NavLink>
                            </Button>
                        </MenuItem>
                        <MenuItem style={{listStyleType: 'none', color: '#fff'}}>
                            <Button color="inherit" style={{textTransform: 'capitalize', padding: '5px', fontSize: '1em'}}>
                                <NavLink exact to="/declaration_rejet" className="link">
                                    Réjet
                                </NavLink>
                            </Button>
                        </MenuItem>
                    </SubMenu>
                    <hr/>
                    <SubMenu title="Régistre" className="submenu">
                        <MenuItem style={{listStyleType: 'none', color: '#fff'}}>
                            <Button color="inherit" style={{textTransform: 'capitalize', padding: '5px', fontSize: '1em'}}>
                                <NavLink exact to="/naissances" className="link">
                                    Naissance
                                </NavLink>
                            </Button>
                        </MenuItem>
                        <MenuItem style={{listStyleType: 'none', color: '#fff'}}>
                            <Button color="inherit" style={{textTransform: 'capitalize', padding: '5px', fontSize: '1em'}}>
                                <NavLink exact to="/declaration_mariage" className="link">
                                    Mariage
                                </NavLink>
                            </Button>
                        </MenuItem>
                        <MenuItem style={{listStyleType: 'none', color: '#fff'}}>
                            <Button color="inherit" style={{textTransform: 'capitalize', padding: '5px', fontSize: '1em'}}>
                                <NavLink exact to="/declaration_deces" className="link">
                                    Décès
                                </NavLink>
                            </Button>
                        </MenuItem>
                        <MenuItem style={{listStyleType: 'none', color: '#fff'}}>
                            <Button color="inherit" style={{textTransform: 'capitalize', padding: '5px', fontSize: '1em'}}>
                                <NavLink exact to="/declaration_divorce" className="link">
                                    Divorce
                                </NavLink>
                            </Button>
                        </MenuItem>
                        <MenuItem style={{listStyleType: 'none', color: '#fff'}}>
                            <Button color="inherit" style={{textTransform: 'capitalize', padding: '5px', fontSize: '1em'}}>
                                <NavLink exact to="/declaration_divorce" className="link">
                                    Réconnaissance
                                </NavLink>
                            </Button>
                        </MenuItem>
                        <MenuItem style={{listStyleType: 'none', color: '#fff'}}>
                            <Button color="inherit" style={{textTransform: 'capitalize', padding: '5px', fontSize: '1em'}}>
                                <NavLink exact to="/declaration_divorce" className="link">
                                    Adoption
                                </NavLink>
                            </Button>
                        </MenuItem>
                        <MenuItem style={{listStyleType: 'none', color: '#fff'}}>
                            <Button color="inherit" style={{textTransform: 'capitalize', padding: '5px', fontSize: '1em'}}>
                                <NavLink exact to="/declaration_divorce" className="link">
                                    Réjet
                                </NavLink>
                            </Button>
                        </MenuItem>
                    </SubMenu>
                    <hr/>
                </Menu>
            </div>
        </div>
    )
}

export default withStyles(style)(SideMenu);