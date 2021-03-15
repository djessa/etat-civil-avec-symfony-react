import React, { useState } from 'react'
import { Button, Drawer, Grid, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, ListSubheader, makeStyles, Menu, withStyles } from "@material-ui/core";
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { Add, AddToHomeScreen, Album } from '@material-ui/icons';
import Naissances from '../pages/Naissances';
import MenuIcon from '@material-ui/icons/Menu';



// withStyles & makeStyles

const style = {
    sideMenu: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        left: '0px',
        width: '250px',
        height: '100%',
        backgroundColor: '#253053',
    }
}

const SideMenu = (props) => {
    const [open, setOpen] = useState(false);
    const { classes } = props;
    return (
        <Grid container justify="space-between">
        <Grid item>
        <Drawer open={open} onClose={() => setOpen(false)}>
        <div>
            <div style={{ height: '150px'}}>
                <img src="/images/flag.png" alt="drapeau malagasy" className="image"/>
            </div>
            <List>
                <ListSubheader style={{color: '#ddd', fontSize: '1.1em'}}>
                    <Button onClick={() => setOpenNaissance(!openNaissance)}>
                        Naissances
                    </Button>
                </ListSubheader>
                    <NavLink to="/naissances" className="link">
                        <ListItem  button>
                            <IconButton color="default">
                                <Add color="secondary"/>
                            </IconButton>
                            <ListItemText>Déclaration</ListItemText>
                        </ListItem>
                    </NavLink>
                    <NavLink to="/naissances" className="link">
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
                    <NavLink to="/naissances" className="link">
                        <ListItem  button>
                            <IconButton color="default">
                                <Add color="secondary"/>
                            </IconButton>
                            <ListItemText>Déclaration</ListItemText>
                        </ListItem>
                    </NavLink>
                    <NavLink to="/naissances" className="link">
                        <ListItem  button>
                            <IconButton color="default">
                                <Album color="secondary" />
                            </IconButton>
                            <ListItemText>Régistres</ListItemText>
                        </ListItem>
                    </NavLink>
            </List>
        </div>
        </Drawer>
        </Grid>
        <Grid item>
            <Button onClick={() => setOpen(!open)}>
                <IconButton color="default">
                    <MenuIcon/>
                </IconButton>
            </Button>
        </Grid>
        </Grid>
    )
}

export default withStyles(style)(SideMenu);