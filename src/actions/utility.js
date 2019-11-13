export const mapObject = (obj, callback) => {
	if (typeof obj === 'undefined') {
		return false
	} else {
		return Object.keys(obj).map((key, ind) => {
			return callback(key, obj[key], ind)
		})
	}
}

export const toDate = (unixTime, mode) => {
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const months_full = ['January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'];
  const days_full = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	let a = new Date(Number(unixTime));
	let year = a.getFullYear();
	let year_num = String(a.getFullYear()).slice(-2);
	let month = months[a.getMonth()];
	let month_full = months_full[a.getMonth()];
	let month_num = a.getMonth() + 1;
	let date = a.getDate();
	let day = days_full[a.getDay()];
	let hour = String('0' + String(a.getHours())).substr(-2);
	let min = String('0' + String(a.getMinutes())).substr(-2);
	let sec = String('0' + String(a.getSeconds())).substr(-2);

	let returnDate = '';
	switch (mode) {
		case 'date':
			returnDate =  date + ' - ' + month_full + ' - ' + year;
			break;
		case 'day':
			returnDate =  day;
			break;
		case 'time':
			returnDate =  hour + ':' + min;
			break;
		case 'sec':
			returnDate =  sec;
			break;
		case 'long':
			returnDate =  month_full + ' ' + date + ', ' + year;
			break;
		case 'short':
			returnDate =  month_num + '/' + date + '/' + year_num;
			break;
		default:
			returnDate =  month + ' ' + date + ', ' + year + ' @ ' + hour + ':' + min + ':' + sec + ' PST';
			break;
	}
	return returnDate;
}

export const timeCalc = (timeArray, mode) => {

	//Sort time array increasing
	timeArray.sort((a, b) => (a.time_id > b.time_id) ? 1 : -1);

  //Separates IN and OUT Times
  let inTimes = [];
  let outTimes = [];
	timeArray.map((val, ind) => {
    if (val.status === 'IN') {
      inTimes.push(Number(val.time_id));
    } else if (val.status === 'OUT') {
      outTimes.push(Number(val.time_id));
    }
	})

  //Finds start time
  let startTime = '';
  if (Boolean((inTimes.length === outTimes.length) && (inTimes[0] < outTimes[0])) || Boolean(inTimes.length > outTimes.length)) {
    let dateObj = new Date(inTimes[0]);
    let hour = dateObj.getHours();
    let minute = dateObj.getMinutes()
    if (hour < 10) {
      hour = String(0) + String(hour);
    }
    if (minute < 10) {
      minute = String(0) + String(minute);
    }
    startTime = String(hour) + ':' + String(minute);
  } else {
    startTime = 'N/A';
  }

  //Finds end time
  let endTime = '';
  if (Boolean((inTimes.length === outTimes.length) && (outTimes[outTimes.length - 1] > inTimes[outTimes.length - 1])) || Boolean(outTimes.length > inTimes.length)) {
    let dateObj = new Date(outTimes[outTimes.length - 1]);
    let hour = dateObj.getHours();
    let minute = dateObj.getMinutes()
    if (hour < 10) {
      hour = String(0) + String(hour);
    }
    if (minute < 10) {
      minute = String(0) + String(minute);
    }
    endTime = String(hour) + ':' + String(minute);
  } else {
    //endTime = '23:59';
		endTime = 'N/A';
  }

  //Creates array of work time durations
  let workHours = [];
	let totalWorkHours = '';
  if (inTimes.length === outTimes.length) {
    for (let i = 0; i < inTimes.length; i++) {
      let duration = outTimes[i] - inTimes[i];
      workHours.push(Number(duration));
    }
		totalWorkHours = Number(workHours.reduce((a, b) => a + b, 0) / 3600000).toFixed(2);
  } else {
    for (let i = 0; i < outTimes.length; i++) {
      let duration = outTimes[i] - inTimes[i];
      workHours.push(Number(duration));
    }
    totalWorkHours = '>' + Number(workHours.reduce((a, b) => a + b, 0) / 3600000).toFixed(2);
  }

  //Creates array of break time durations
  let breakHours = [];
	let totalBreakHours = Number(breakHours.reduce((a, b) => a + b, 0) / 3600000).toFixed(2);
  if (outTimes.length > 1) {
    for (let i = 0; i < outTimes.length - 1; i++) {
      let duration = inTimes[i + 1] - outTimes[i];
      breakHours.push(Number(duration));
    }
		totalBreakHours = Number(breakHours.reduce((a, b) => a + b, 0) / 3600000).toFixed(2);
  } else {
    totalBreakHours = 'N/A';
  }


  switch (mode) {
    case 'workHours':
      return totalWorkHours;
      break;
    case 'periods':
      return workHours.length;
      break;
    case 'breakHours':
      return totalBreakHours;
      break;
    case 'numberBreaks':
      return breakHours.length;
      break;
    case 'startTime':
      return startTime;
      break;
    case 'endTime':
      return endTime;
      break;
    default:
      return 0;
  }

}
