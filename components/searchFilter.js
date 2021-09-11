import { makeStyles, withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

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
    borderRadius: 6
  }
})((props) => <Input color="default" {...props} />);

const SearchFilter = (props) => {
  const classes = useStyles();

  const handleChange = (event) => {
    event.preventDefault()
    const searchTerms = event.target.value
      props.handleSearchFilter(searchTerms)
  };

    return (
      <form className={classes.root} noValidate autoComplete="off">
        <WhiteInput placeholder="Search Title" inputProps={{ 'aria-label': 'description' }} color="primary" onKeyPress={event => { if (event.key === 'Enter'){handleChange(event)}}} />
      </form>
    )
}

export default SearchFilter