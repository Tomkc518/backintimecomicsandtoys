import { makeStyles, withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { useState, useCallback } from 'react';
import FormControl from '@material-ui/core/FormControl';
import { debounce } from "lodash";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const WhiteInput = withStyles({
  root: {
    color: 'rgba(255, 255, 255, 0.87)',
    // backgroundColor: 'rgba(255, 255, 255, 0.87)',
    borderRadius: 6
  }
})((props) => <Input color="default" {...props} />);

const SearchFilter = (props) => {
  const classes = useStyles();

  const handleChange = (event) => {
    const searchTerms = event.target.value
    if (searchTerms.length > 2){
      props.handleSearchFilter(searchTerms)
    }
  };

  // const searchFunction = value => {
  //   console.log('search', value);
  //   props.handleSearchFilter(value);
  //   console.log('search happened')
  //   setSearch('')
  // }

  //const handler = useCallback(debounce((value => searchFunction(value)), 2000), []);

  //const [dbValue, saveToDb] = usetState('');

  // const debouncedSave = useCallback(
  //   debounce(nextValue => saveToDb(nextValue), 1000),
  //   []
  // )

  // const handleChange = event => {
  //   const {value: nextValue } = event.target;
  //   setSearch(nextValue);

  //   debounce(nextValue);
  //}

    return (
      <form className={classes.root} noValidate autoComplete="off">
        <WhiteInput placeholder="Search" inputProps={{ 'aria-label': 'description' }} color="primary" onChange={handleChange} />
      </form>
    )
}

export default SearchFilter