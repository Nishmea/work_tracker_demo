<?php
  //Set Timezone
  date_default_timezone_set('America/Chicago');
  //Get Todays Date
  $date = getdate();

  //Set Filename and Filepath
  $filename = $date['mday'] . '_' . $date['month'] . '_' . $date['year'] . '.json';
  $filepath = $date['year'] . '/' . $date['month'] . '/';

  //Makes sure file exists, makes file if necessary
  makeSureFileExists($filename, $filepath);

  //Loads file to JSON
  $file = file_get_contents($filepath . $filename);
  $json = json_decode($file, true);
  ksort($json);

  checkIfRememberLogout($json);

  $keys = array_keys($json);
  $size = count($keys) - 1;
  if ($size < 0) {
    echo json_encode('');
  } else {
    $last = $keys[$size];
    echo json_encode($json[$last]);
  }

  function makeSureFileExists($filename, $filepath) {
    $file = @file_get_contents($filepath . $filename);
    if($file === FALSE) {
      $fp = fopen($filepath . $filename, 'w');
      fwrite($fp, '{}');
      fclose($fp);
    }
  }


  function checkIfRememberLogout($sorted) {
    $keys = array_keys($sorted);
    if (count($keys) > 0) {
      if($sorted[$keys[0]]['status'] != 'IN'){
        $dateIn = getdate();
        $startOfDay = date('U', mktime(0,0,0,date('m', strtotime($dateIn['month'])), $dateIn['mday'], $dateIn['year'])) . '000';
        $endOfDay = intval($startOfDay) - 1000;
        $dateOut = getdate($endOfDay);

        $sorted[$startOfDay] = array(
          "status" => "IN",
          "time" => "00:00:00",
          "task" => "AUTO CLOCK IN"
        );
      }
      ksort($sorted);
    }

  }


 ?>
