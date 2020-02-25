import React from 'react'
import { 
  Drawer, 
  Divider, 
  IconButton, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText 
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import HomeWorkIcon from '@material-ui/icons/HomeWork'
import HomeIcon from '@material-ui/icons/Home'
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate'

const links = [
  {
    icon: <HomeIcon />, 
    text: 'Home', 
    path: '/',
  },
  {
    icon: <HomeWorkIcon />, 
    text: 'My Properties', 
    path: '/properties/list',
  },
  {
    icon: <AssignmentLateIcon />, 
    text: 'Maintenance Requests', 
    path: '/maintenance_requests/list',
  },
]

function AppDrawer(props) {
  const { open, handleToggleDrawer, width } = props
  const Style = styled.div`
    width: ${width}px;

    .header {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 64px;
    }
  `

  return (
    <Drawer
      variant='persistent'
      anchor='left'
      open={open}>
      <Style>
        <div className='header'>
          <IconButton onClick={handleToggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {
            links.map(link => (
                <ListItem component={Link} to={link.path}>
                  <ListItemIcon>{link.icon}</ListItemIcon>
                  <ListItemText primary={link.text} />
                </ListItem>
            ))
          }
        </List>
      </Style>
    </Drawer>
  )
}

export default AppDrawer
