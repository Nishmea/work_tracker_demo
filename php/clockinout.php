<?php

  require('./token.php');
  authorizeAccess($_SERVER['HTTP_AUTHENTICATE']);
  $tokenVars = decodeToken($_SERVER['HTTP_AUTHENTICATE']);
  require('./proxy.php');
  require('./utility.php');

  $connect = mysqli_connect($server, $user_worker, $pass_worker, $schema, $port);

  $tableKey = $tokenVars['table_key'];
  $timestamp = $_POST['time'];

  $entry_id = hash('md5', microtime());

  $status = $_POST['status'];
  $task = $_POST['task'];
  $project = $_POST['project'];

  $hour = toDate($timestamp, 'hour');
  $minute = toDate($timestamp, 'min');
  $second = toDate($timestamp, 'sec');
  $time = $hour . ':' . $minute . ':' . $second;

  $query = "INSERT INTO `$tableKey` (`time_id`, `entry_id`, `status`, `time`, `task`, `project`) VALUES ('$timestamp', '$entry_id', '$status', '$time', '$task', '$project')";

  if ($result = mysqli_query($connect, $query)) {
    echo 'OK';
  } else {
    echo 'FAIL';
  }

  mysqli_close($connect);

?>
