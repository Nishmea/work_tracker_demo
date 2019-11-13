<?php

  require('./token.php');
  authorizeAccess($_SERVER['HTTP_AUTHENTICATE']);
  $tokenVars = decodeToken($_SERVER['HTTP_AUTHENTICATE']);
  require('./proxy.php');
  require('./utility.php');

  $user_id = $tokenVars['user_id'];

  $connect = mysqli_connect($server, $user_worker, $pass_worker, $schema, $port);

  $query = "SELECT `user_id`, `username`, `projects`, `table_key` FROM `$table_users` WHERE `user_id` = '$user_id'";

  $user = array();
  if ($result = mysqli_query($connect, $query)) {
    while ($row = mysqli_fetch_assoc($result)) {

      $user = array(
        'user_id' => $row['user_id'],
        'username' => $row['username'],
        'table_key' => $row['table_key'],
        'projects' => json_decode($row['projects'], TRUE)
      );

    }
    echo standardReturn(200, 'n', '', $user);
    
  } else {
    echo standardReturn(500, 'e', mysqli_error($connect), NULL);
  }

 ?>
