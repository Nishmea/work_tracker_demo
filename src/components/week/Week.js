import { Chart } from 'react-google-charts';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';

/*Actions*/
import {fetchWeekly} from '../../actions';
import {mapObject} from '../../actions/utility';

/*Styles*/
import {palette} from '../../theme';
const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: palette.secondary,
    //backgroundColor: '#AAA',
  },
  dateWrapper: {
    width: '100%',
    height: '60px',
    paddingTop: '25px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  chartWrapper: {
    width: 'calc(100% - 50px)',
    margin: '25px',
  },
}



class Week extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dateChosen: new Date(),
      rows: [],
      chartReady: false,
    }
  }

  chooseDate(date){
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let dateObj = {
      'year': String(date.getFullYear()),
      'month': String(months[date.getMonth()]),
      'date': String(date.getDate()),
    };
    this.props.fetchWeekly(dateObj);
    this.setState({dateChosen: date});
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    let weekly = nextProps.weeklyRecords;
    if(nextProps.weeklyRecords){
      let tempRows = [];

      mapObject(weekly, (key, val) => {
        if (val !== null) {

          console.log(new Date(key));

          mapObject(val, (subKey, subVal, subInd) => {

            let logNum = Object.keys(val).length;
            let currentDate = new Date(Number(subKey));


            if (subVal['status'] === 'IN') {

              let timeIN = subVal['time'].split(':');

              //tempRows.push([key, subVal['task'], new Date(0, 0, 0, timeIN[0], timeIN[1], timeIN[2])])
              tempRows.push([key, subVal['task'], new Date(Number(subKey))])

            } else if (subVal['status'] === 'OUT') {
              let timeOUT = subVal['time'].split(':');

              //tempRows[tempRows.length - 1].push(new Date(0, 0, 0, timeOUT[0], timeOUT[1], timeOUT[2]))
              tempRows[tempRows.length - 1].push(new Date(Number(subKey)))
            }

            if (logNum % 2 === 1 && subInd === (logNum - 1)) {
              let autoOut = currentDate.setHours(23, 59, 0);
              tempRows[tempRows.length - 1].push(autoOut)
            }

          })

        } else {
          let noWork = currentDate.setHours(0, 0, 0);
          tempRows.push([key, '', noWork, noWork])
        }

      })

      console.log(tempRows);

      this.setState({rows: tempRows, chartReady: true}, () => {console.log('Chart Happened')})
    }
  }

  renderChart(){
    if(this.state.chartReady){
      console.log('Chart Ready');
      return(
        <Chart
          chartType="Timeline"
          columns={[
            {type: 'string', label: 'Day'},
            {type: 'string', label: 'Task'},
            {type: 'date', label: 'Start'},
            {type: 'date', label: 'End'},
          ]}
          rows={this.state.rows}
          options={{
            timeline: {
              colorByRowLabel: true,
              barLabelStyle: {
                color: '#FFF',
                fontSize: 16,
              },
              rowLabelStyle: {
                color: '#000',
                bold: true,
                fontSize: '20',
              },
            },
            backgroundColor: '#FFF',
            avoidOverlappingGridLines: true,
            colors: ['#B00', '#00B', '#FD0', '#B0D', '#0A0', '#B60', '#333'],

          }}
          graph_id="Timeline"
          width={'100%'}
          height={'1000px'}
        />
      )
    }
  }

  render(){
    return(
      <div className={'wrapper'} style={styles.wrapper}>
        <div style={styles.dateWrapper}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              label="Choose Date"
              ampm={false}
              style={{width: '250px'}}
              value={this.state.dateChosen}
              onChange={(e) => this.chooseDate(e)}
            />
          </MuiPickersUtilsProvider>
          {/*
          <DatePicker
            id={'date-chosen'}
            errorText={'Week Starting'}
            errorStyle={{color: '#FFF'}}
            mode="landscape"
            autoOk={true}
            disableYearSelection={false}
            textFieldStyle={{width: '100%'}}
            inputStyle={{color: '#000', fontSize: '2em', fontWeight: 'bold', textAlign: 'center', cursor: 'pointer'}}
            style={{width: '50%'}}
            value={this.state.dateChosen}
            onChange={(e, v) => this.chooseDate(v)}
          />
          */}
        </div>
        <div style={styles.chartWrapper}>
          {this.renderChart()}
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    weeklyRecords: state.log.weekly,
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
    fetchWeekly: (payload) => dispatch(fetchWeekly(payload)),
	}
}

export default Redux.connect(mapStateToProps, mapDispatchToProps)(Week);
