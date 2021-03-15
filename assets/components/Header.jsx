import { AppBar, Button, Grid, Toolbar } from '@material-ui/core';
import React, { useState } from 'react'
import {  Drawer, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@material-ui/core";
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { Add, AddToHomeScreen, Album } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
export default function Header({children}) {
    const [open, setOpen] = useState(false);
    return (
        <AppBar position="static">
            <Toolbar>
                <Grid container justify="space-between" alignItems="center">
                    <Grid item>
                        <Grid  container justify="space-between">
                            <Grid item>
                                <Button onClick={() => setOpen(!open)}>
                                    <IconButton color="default">
                                        <MenuIcon/>
                                    </IconButton>
                                </Button>
                            </Grid>
                            <Grid item>
                            {children}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Drawer open={open} onClose={() => setOpen(false)}>
                            <div style={{ height: '150px'}}>
                                <img src="/images/flag.png" alt="drapeau malagasy" className="image"/>
                            </div>
                            <List>
                                <ListSubheader style={{color: '#ddd', fontSize: '1.1em'}}>
                                    <Button onClick={() => setOpenNaissance(!openNaissance)}>
                                        Naissances
                                    </Button>
                                </ListSubheader>
                                <NavLink to="/add_naissance" className="link" onClick={()=> setOpen(false)}>
                                        <ListItem  button>
                                            <IconButton color="default">
                                                <Add color="secondary"/>
                                            </IconButton>
                                            <ListItemText>Déclaration</ListItemText>
                                        </ListItem>
                                </NavLink>
                                <NavLink to="/naissances" className="link" onClick={()=> setOpen(false)}>
                                        <ListItem  button>
                                            <IconButton color="default">
                                                <Album color="secondary" />
                                            </IconButton>
                                            <ListItemText>Régistres</ListItemText>
                                        </ListItem>
                                </NavLink>
                                <ListSubheader>
                                    <Button>
                                        Mariages
                                    </Button>
                                </ListSubheader>
                                <NavLink to="/add_mariage" className="link" onClick={()=> setOpen(false)}>
                                    <ListItem  button>
                                        <IconButton color="default">
                                            <Add color="secondary"/>
                                        </IconButton>
                                        <ListItemText>Déclaration</ListItemText>
                                    </ListItem>
                                </NavLink>
                                <NavLink to="/mariages" className="link" onClick={()=> setOpen(false)}>
                                    <ListItem  button>
                                        <IconButton color="default">
                                            <Album color="secondary" />
                                        </IconButton>
                                        <ListItemText>Régistres</ListItemText>
                                    </ListItem>
                                </NavLink>
                                <ListSubheader>
                                    <Button>
                                        Décès
                                    </Button>
                                </ListSubheader>
                                <NavLink to="/add_deces" className="link" onClick={()=> setOpen(false)}>
                                    <ListItem  button>
                                        <IconButton color="default">
                                            <Add color="secondary"/>
                                        </IconButton>
                                        <ListItemText>Déclaration</ListItemText>
                                    </ListItem>
                                </NavLink>
                                <NavLink to="/deces" className="link" onClick={()=> setOpen(false)}>
                                    <ListItem  button>
                                        <IconButton color="default">
                                            <Album color="secondary" />
                                        </IconButton>
                                        <ListItemText>Régistres</ListItemText>
                                    </ListItem>
                                </NavLink>
                            </List>
                    </Drawer>
                </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}
