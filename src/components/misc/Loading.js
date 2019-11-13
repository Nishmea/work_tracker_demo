/*Material UI*/
import CircularProgress from '@material-ui/core/CircularProgress';

/*Styles*/
const styles = {
  wrapper: {
    width: '100%',
    height: '100%',
    padding: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default class Loading extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div style={styles.wrapper}>
        <CircularProgress
          size={50}
          thickness={4}
          color="primary"
        />
      </div>
    )
  }
}
