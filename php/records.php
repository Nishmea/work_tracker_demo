<?php

  date_default_timezone_set('America/Chicago');

  require('./token.php');
  authorizeAccess($_SERVER['HTTP_AUTHENTICATE']);
  $tokenVars = decodeToken($_SERVER['HTTP_AUTHENTICATE']);
  require('./proxy.php');
  require('./utility.php');

  $tableKey = $tokenVars['table_key'];

  $connect = mysqli_connect($server, $user_worker, $pass_worker, $schema, $port);

  $date = getdate();

  if (isset($_POST['year'])) {
    $year = $_POST['year'];
  } else {
    $year = $date['year'];
  }

  if (isset($_POST['month'])) {
    $month = $_POST['month'];
  } else {
    $month = $date['mon'];
  }

  if (isset($_POST['date'])) {
    $day = $_POST['date'];
  } else {
    $day = $date['mday'];
  }

  $startTime = strtotime($month . '/' . $day . '/' . $year) * 1000;
  $endTime = $startTime + 86400000;

  $query = "SELECT * FROM `$tableKey` WHERE `time_id` >= $startTime AND `time_id` <= $endTime AND `deleted` = 0 ORDER BY `time_id` ASC";

  $return = array();
  if ($result = mysqli_query($connect, $query)) {
    while ($row = mysqli_fetch_assoc($result)) {
      $event = array(
        'entry_id' => $row['entry_id'],
        'time_id' => $row['time_id'],
        'status' => $row['status'],
        'time' => $row['time'],
        'task' => $row['task'],
        'project' => $row['project']
      );
      array_push($return, $event);
    }
    echo standardReturn(200, 'n', 'Success', array('records' => $return, 'start' => $startTime, 'end' => $endTime));

  } else {
    echo mysqli_error($connect);
  }

 ?>
