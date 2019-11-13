<?php

  $id = $_POST['id'];

  date_default_timezone_set('America/Chicago');

  $date = getdate();

  $filename = $date['mday'] . '_' . $date['month'] . '_' . $date['year'] . '.json';
  $filepath = $date['year'] . '/' . $date['month'] . '/';

  $file = file_get_contents($filepath . $filename);
  $json = json_decode($file, true);

  unset($json[$id]);

  $fp = fopen($filepath . $filename, 'w');
  fwrite($fp, json_encode($json));
  fclose($fp);

  echo 'OK';
?>
