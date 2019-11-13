<?php

  session_start();
  require(dirname(__FILE__).'/token.php');

  if (isset($_SESSION['jwt'])) {
    validateToken($_SESSION['jwt']);
  } else {
    header('HTTP/1.1 403');
    die();
  }

?>
