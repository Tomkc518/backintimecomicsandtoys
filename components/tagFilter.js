import { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@mui/icons-material/Menu';

const GreenCheckbox = withStyles({
  root: {
    color: 'rgba(255, 255, 255, 0.87)',
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles({
  paper: {
    background: "#121212",
    color: "rgba(255, 255, 255, 0.87)"
  }
});

const TagFilter = (props) => {
    const classes = useStyles();

    const [tagsState, setTagsState] = useState(props.tags
    //   () => {
    //   let listofTags = [];
    //   props.tags.forEach(tag => {
    //     listofTags.push({
    //       label: tag,
    //       checked: false
    //     })
    //   });
    //   return listofTags;
    // }
    );
    const [checked, setChecked] = useState([]);
    const [openDrawer, setOpenDrawer] = useState(false);

    // const setupTags = () => {
    //   let listofTags = [];
    //   props.tags.forEach(tag => {
    //     listofTags.push({
    //       label: tag,
    //       checked: false
    //     })
    //   });
    //   setTagsState(listofTags);
    // }

    const handleChecked = (tag) => {
      const currentIndex = checked.indexOf(tag);
      const newChecked = [...checked];

      if(currentIndex === -1){
        newChecked.push(tag);
      } else {
        newChecked.splice(currentIndex, 1)
      }
      setChecked(newChecked);

      props.handleTagFilters(newChecked);
    }

    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('sm'))

    const handleDrawer = () => {
      setOpenDrawer(!openDrawer)
      setChecked([]);
      props.handleTagFilters([]);
    }

    return (
      <>
        {isMatch ? 
        <>
        <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        classes={{paper: classes.paper}}
        >
          <FormGroup>
            {tagsState.map(tag => {
              return (
                <FormControlLabel
                  control={
                    <GreenCheckbox
                      onChange={() => handleChecked(tag)}
                    />
                  }
                  label={tag}
                  key={tag}
                />
              )
            })}
          </FormGroup>
        </Drawer>
        <IconButton onClick={() => handleDrawer()}>
          <MenuIcon color="success"/>
        </IconButton>
        </> : 
        <FormGroup>
          {tagsState.map(tag => {
            return (
              <FormControlLabel
                control={
                  <GreenCheckbox
                    onChange={() => handleChecked(tag)}
                  />
                }
                label={tag}
                key={tag}
              />
            )
          })}
        </FormGroup>}
      </>
    )
}

export default TagFilter