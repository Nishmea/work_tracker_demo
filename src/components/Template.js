/*Material UI*/
import Typography from '@material-ui/core/Typography';

/*Components*/

/*Actions*/

/*Styles*/
import { palette } from '../theme';
const styles = {

};

class Template extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return(
      <React.Fragment>
        <Typography>Template</Typography>
      </React.Fragment>
    )
  }
}

const mapStatetoProps = (state) => {
  return{
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
  }
}

Template.propTypes = {
}

Template.defaultProps = {
}

export default Redux.connect(mapStatetoProps, mapDispatchToProps)(Template);
