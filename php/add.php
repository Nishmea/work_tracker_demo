<?php

  date_default_timezone_set('America/Chicago');

  require('./token.php');
  authorizeAccess($_SERVER['HTTP_AUTHENTICATE']);
  $tokenVars = decodeToken($_SERVER['HTTP_AUTHENTICATE']);
  require('./proxy.php');
  require('./utility.php');

  $table_key = $tokenVars['table_key'];

  $task = $_POST['task'];
  $project = $_POST['project'];

  $connect = mysqli_connect($server, $user_worker, $pass_worker, $schema, $port);

  $entry_id_in = hash('md5', $_POST['time_in']);
  $time_id_in = $_POST['time_in'];
  $hour_in = toDate($time_id_in, 'hour');
  $minute_in = toDate($time_id_in, 'min');
  $second_in = toDate($time_id_in, 'sec');
  $time_in = $hour_in . ':' . $minute_in . ':' . $second_in;

  $entry_id_out = hash('md5', $_POST['time_out']);
  $time_id_out = $_POST['time_out'];
  $hour_out = toDate($time_id_out, 'hour');
  $minute_out = toDate($time_id_out, 'min');
  $second_out = toDate($time_id_out, 'sec');
  $time_out = $hour_out . ':' . $minute_out . ':' . $second_out;

  $query_in = "INSERT INTO `$table_key` (`entry_id`, `time_id`, `status`, `time`, `task`, `project`) VALUES ('$entry_id_in', '$time_id_in', 'IN', '$time_in', '$task', '$project')";
  $query_out = "INSERT INTO `$table_key` (`entry_id`, `time_id`, `status`, `time`, `task`, `project`) VALUES ('$entry_id_out', '$time_id_out', 'OUT', '$time_out', '$task', '$project')";

  try {
    mysqli_query($connect, $query_in);
    mysqli_query($connect, $query_out);
    echo 'OK';
  } catch (\Exception $e) {
    echo 'FAIL';
  }

 ?>
