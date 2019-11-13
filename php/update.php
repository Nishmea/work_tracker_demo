<?php

  date_default_timezone_set('America/Chicago');

  require('./token.php');
  authorizeAccess($_SERVER['HTTP_AUTHENTICATE']);
  $tokenVars = decodeToken($_SERVER['HTTP_AUTHENTICATE']);
  require('./proxy.php');
  require('./utility.php');

  $connect = mysqli_connect($server, $user_worker, $pass_worker, $schema, $port);

  $tableKey = $tokenVars['table_key'];
  $time_id = $_POST['time'];

  $entry_id = $_POST['entry_id'];
  $status = $_POST['status'];
  $task = $_POST['task'];
  $project = $_POST['project'];

  $hour = toDate($time_id, 'hour');
  $minute = toDate($time_id, 'min');
  $second = toDate($time_id, 'sec');
  $time = $hour . ':' . $minute . ':' . $second;

  $query = "UPDATE `$tableKey` SET `time_id` = '$time_id', `time` = '$time', `task` = '$task', `project` = '$project' WHERE `entry_id` =  '$entry_id'";

  if ($result = mysqli_query($connect, $query)) {
    echo 'OK';
  } else {
    echo mysqli_error($connect);
  }


 ?>
