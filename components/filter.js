import { useState, useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const GreenCheckbox = withStyles({
  root: {
    color: 'rgba(255, 255, 255, 0.87)',
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const Filter = (props) => {
    const intialTags = [];
    props.tags.forEach(tag => {
        intialTags.push(tag.node.tags)
    });
    const combinedtagList = [].concat.apply([], intialTags);
    const tagList = [...new Set(combinedtagList)];
    const [tagsState, setTagsState] = useState(tagList);
    const [checked, setChecked] = useState([]);
    //console.log('tagsState', tagsState)

    const handleChecked = (tag) => {
      const currentIndex = checked.indexOf(tag);
      const newChecked = [...checked];

      if(currentIndex === -1){
        newChecked.push(tag);
      } else {
        newChecked.splice(currentIndex, 1)
      }
      setChecked(newChecked);

      props.handleFilters(newChecked);
    }

    return (
      <FormGroup>
        {tagsState.map(tag => {
          return (
            <FormControlLabel
              control={
                <GreenCheckbox
                  //checked={state.checkedB}
                  onChange={() => handleChecked(tag)}
                  //name="checkedB"
                  //color="primary"
                />
              }
              label={tag}
              key={tag}
            />
          )
        })}
      </FormGroup>
    )
}

export default Filter