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
  const [search, setSearch] = useState('');
  const classes = useStyles();

  const handleChange = (event) => {
    setSearch(event.target.value);

    //props.handleSearchFilter(search)
    handler();
  };

  const searchFunction = () => {
    console.log('search', search);
    props.handleSearchFilter(search);
    console.log('search happened')
  }

  const handler = useCallback(debounce(searchFunction, 2000), []);

    return (
      <form className={classes.root} noValidate autoComplete="off">
        <WhiteInput placeholder="Search" inputProps={{ 'aria-label': 'description' }} color="primary" onChange={handleChange} />
      </form>
    )
}

export default SearchFilter