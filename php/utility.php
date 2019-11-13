<?php

  function toDate($unix_time, $mode) {
    date_default_timezone_set('America/Chicago');
    $unix = (int) ($unix_time / 1000);
    $year = date("Y", $unix);
    $month = date("F", $unix);
    $day = date("j", $unix);
    $hour = date("H", $unix);
    $min = date("i", $unix);
    $sec = date("s", $unix);

    switch ($mode) {
      case 'year':
        return $year;
        break;
      case 'month':
        return $month;
        break;
      case 'day':
        return $day;
        break;
      case 'hour':
        return $hour;
        break;
      case 'min':
        return $min;
        break;
      case 'sec':
        return $sec;
        break;

      default:
        return $unix;
        break;
    }
  }

  function makeSureFileExists($filepath, $filename) {
    if (!file_exists($filepath)) {
      mkdir($filepath, 0755, true);
    }
    if (!file_exists($filepath . $filename)) {
      $fp = fopen($filepath . $filename, 'w');
      fwrite($fp, '{}');
      fclose($fp);
    }
  }

  function standardReturn($status, $kind, $message, $payload) {
    $return = array(
      "status" => $status,
      "kind" => $kind,
      "message" => $message,
      "payload" => $payload
    );
    return json_encode($return);
  }

 ?>
