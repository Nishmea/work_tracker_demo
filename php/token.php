<?php

  require(dirname(__FILE__).'/../vendor/autoload.php');

  use \Firebase\JWT\JWT;
  use Twilio\Rest\Client;
  use Twilio\Exceptions\TwilioException;

  //Number of seconds token is valid for
  const VALID_TIME = 3600;

////////////////////////////////////////////////////////////////////////////////
  function generateToken($time, $paramsArray){
    require(dirname(__FILE__).'/proxy.php');

    $now = time();
    $exp = $now + $time;
    $nbf = $now - 1;

    $session = session_id();

    $baseArray = array(
        "iss" => "https://pdmartech.com",
        "aud" => "https://pdmartech.com",
        "iat" => $now,
        "nbf" => $nbf,
        "exp" => $exp,
        "length" => $time,
        "session_id" => $session,
        "user_id" => NULL,
        "privilege" => NULL,
        "mode" => NULL,
    );

    $tokenArray = array_merge($baseArray, $paramsArray);

    $jwt = JWT::encode($tokenArray, $jwt_key);

    return $jwt;
  }

////////////////////////////////////////////////////////////////////////////////
  function generatePasswordResetToken($time, $email){
    require(dirname(__FILE__).'/proxy.php');

    $now = time();
    $exp = $now + $time;
    $nbf = $now - 1;

    $session = session_id();

    $tokenArray = array(
        "iss" => "https://pdmartech.com",
        "aud" => "https://pdmartech.com",
        "iat" => $now,
        "nbf" => $nbf,
        "exp" => $exp,
        "length" => $time,
        "email" => $email,
        //"user_id" => $user_id,
        //"assoc_id" => $assoc_id,
        //"dealer_id" => $dealer_id,
        //"privilege" => $priv,
        //"mode" => $mode,
        "session_id" => $session
    );

    $jwt = JWT::encode($tokenArray, $jwt_key);

    return $jwt;
  }

////////////////////////////////////////////////////////////////////////////////
  function validateToken($jwt){
    require(dirname(__FILE__).'/proxy.php');

    try {
      JWT::decode($jwt, $jwt_key, $jwt_algo);
    } catch (\Exception $e) {
      header("HTTP/1.1 401");
      echo 'Invalid Token';
      exit();
    }

    $decoded = JWT::decode($jwt, $jwt_key, $jwt_algo);
    $payload = (array) $decoded;
    $timeNow = time();

    $checkIssuer = (bool) ($payload['iss'] === "https://pdmartech.com");
    if (!$checkIssuer) {
      header("HTTP/1.1 401");
      echo 'Invalid Issuer';
      die();
    }

    $checkExpiry = (bool) ($payload['exp'] > $timeNow);
    if (!$checkExpiry) {
      header("HTTP/1.1 401");
      echo 'Expired Token';
      die();
    }

    $checkNotBefore = (bool) ($payload['nbf'] < $timeNow);
    if (!$checkNotBefore) {
      header("HTTP/1.1 401");
      echo 'Early Token';
      die();
    }

    header('HTTP/1.1 200');
		header("Authenticate:" . $jwt);

  }

////////////////////////////////////////////////////////////////////////////////
  function authorizeAccess($auth){
    require(dirname(__FILE__).'/proxy.php');

    $jwt = preg_replace('/Bearer /', '', $auth);

    try {
      JWT::decode($jwt, $jwt_key, $jwt_algo);
    } catch (\Exception $e) {
      return false;
    }

    $decoded = JWT::decode($jwt, $jwt_key, $jwt_algo);
    $payload = (array) $decoded;
    $timeNow = time();

    $checkIssuer = (bool) ($payload['iss'] === "https://pdmartech.com");
    $checkExpiry = (bool) ($payload['exp'] > $timeNow);
    $checkNotBefore = (bool) ($payload['nbf'] < $timeNow);

    if (!$checkIssuer || !$checkExpiry || !$checkNotBefore) {
      header("HTTP/1.1 401");
      die();
    } else {
      header("HTTP/1.1 200");
    }

  }

////////////////////////////////////////////////////////////////////////////////
  function authorizeAdministrator($auth){
    require(dirname(__FILE__).'/proxy.php');

    $jwt = preg_replace('/Bearer /', '', $auth);

    try {
      JWT::decode($jwt, $jwt_key, $jwt_algo);
    } catch (\Exception $e) {
      return false;
    }

    $decoded = JWT::decode($jwt, $jwt_key, $jwt_algo);
    $payload = (array) $decoded;
    $timeNow = time();

    $checkIssuer = (bool) ($payload['iss'] === "https://pdmartech.com");
    $checkExpiry = (bool) ($payload['exp'] > $timeNow);
    $checkNotBefore = (bool) ($payload['nbf'] < $timeNow);
    $checkAdmin = (bool) ($payload['privilege'] === "A");

    if (!$checkIssuer || !$checkExpiry || !$checkNotBefore || !$checkAdmin) {
      header("HTTP/1.1 401");
      die();
    } else {
      header("HTTP/1.1 200");
    }

  }

////////////////////////////////////////////////////////////////////////////////
  function decodeToken($auth){
    require(dirname(__FILE__).'/proxy.php');

    $jwt = preg_replace('/Bearer /', '', $auth);

    $decoded = JWT::decode($jwt, $jwt_key, $jwt_algo);

    return (array) $decoded;
  }

////////////////////////////////////////////////////////////////////////////////
  function refreshToken($oldToken){
    require(dirname(__FILE__).'/proxy.php');

    $decoded = JWT::decode($oldToken, $jwt_key, $jwt_algo);
    $decodedArray = (array) $decoded;

    $now = time();
    $nbf = $now - 1;
    $exp = $now + $decodedArray['length'];

    $tokenArray = array(
        "iss" => $decodedArray['iss'],
        "aud" => $decodedArray['aud'],
        "iat" => $now,
        "nbf" => $nbf,
        "exp" => $exp,
        "length" => $decodedArray['length'],
        "user_id" => $decodedArray['user_id'],
        "assoc_id" => $decodedArray['assoc_id'],
        "dealer_id" => $decodedArray['dealer_id'],
        "privilege" => $decodedArray['privilege'],
        "mode" => $decodedArray['mode'],
        "session_id" => $decodedArray['session_id']
    );

    $newToken = JWT::encode($tokenArray, $jwt_key);

    return $newToken;
  }

////////////////////////////////////////////////////////////////////////////////
  function validateDevToken($jwt){
    require(dirname(__FILE__).'/proxy.php');

    try {
      JWT::decode($jwt, $jwt_key_dev, $jwt_algo);
    } catch (\Exception $e) {
      header("HTTP/1.1 401");
      die();
    }

    $decoded = JWT::decode($jwt, $jwt_key_dev, $jwt_algo);
    $payload = (array) $decoded;
    $timeNow = time();

    $checkIssuer = (bool) ($payload['iss'] === "https://truckmark.co");
    $checkExpiry = (bool) ($payload['exp'] > $timeNow);
    $checkNotBefore = (bool) ($payload['nbf'] < $timeNow);

    if (!$checkIssuer || !$checkExpiry || !$checkNotBefore) {
      header("HTTP/1.1 401");
      die();
    } else {
      header("HTTP/1.1 200");
    }

  }

////////////////////////////////////////////////////////////////////////////////
  function decodeDevToken($auth){
    require(dirname(__FILE__).'/proxy.php');

    $jwt = preg_replace('/Bearer /', '', $auth);

    $decoded = JWT::decode($jwt, $jwt_key_dev, $jwt_algo);

    return (array) $decoded;
  }

////////////////////////////////////////////////////////////////////////////////
  function sendPurchaseCode_pushbullet($code, $phone){
    require(dirname(__FILE__).'/proxy.php');

    Pushbullet\Connection::setCurlCallback(function ($curl) {
    	// Get a CA certificate bundle here:
        // https://raw.githubusercontent.com/bagder/ca-bundle/master/ca-bundle.crt
        // curl_setopt($curl, CURLOPT_CAINFO, 'C:/path/to/ca-bundle.crt');

    	// Not recommended! Makes communication vulnerable to MITM attacks:
      curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    });

    $pb_1 = new Pushbullet\Pushbullet($push_token_1);
    $pb_2 = new Pushbullet\Pushbullet($push_token_2);

    $pb_1->device($push_device_1)->pushNote("PortalPay Purchase Code", $code);
    $pb_2->device($push_device_2)->pushNote("PortalPay Purchase Code", $code);
  }

  function sendPurchaseCode($code, $phone){
    require(dirname(__FILE__).'/proxy.php');

    $client = new Client($twilio_sid, $twilio_token);

    $message = "PortalPay Purchase Code \n";
    $message .= $code;

    try {
      $client->messages->create(
        $phone,
        array(
          'from' => $twilio_number,
          'body' => $message
        )
      );
      //echo 'Text Sent';
    } catch (TwilioException $e)  {
      echo  $e;
    }
  }

////////////////////////////////////////////////////////////////////////////////
  function logPurchaseCode($member_id, $assoc_id, $seller_id, $dealer_id, $token){
    require('./proxy.php');
    $connect = mysqli_connect($server, $user, $pass, $schema, $port);
    $decoded = decodeToken($token);
    $issued = $decoded['iat'];
    $expires = $decoded['exp'];
    $code = $decoded['code'];

    $query = "INSERT INTO
              `$table_codes`
              (`code`, `member_id`, `assoc_id`, `seller_id`, `dealer_id`, `issued`, `expires`, `token`, `status`)
              VALUES ('$code', '$member_id', '$assoc_id', '$seller_id', '$dealer_id', '$issued', '$expires', '$token', '1')";

    if (!mysqli_query($connect, $query)) {
      throw new Exception('Could not log code.');
    }

  }

////////////////////////////////////////////////////////////////////////////////
  function invalidatePurchaseCode($user_id, $token){
    require('./proxy.php');
    $connect = mysqli_connect($server, $user, $pass, $schema, $port);
    $decoded = decodeToken($token);
    $code = $decoded['code'];

    $query = "UPDATE `$table_codes` SET `status` = 0 WHERE `code` = '$code' AND `member_id` = '$user_id'";

    if (!mysqli_query($connect, $query)) {
      throw new Exception('Could not invalidate code.');
    }
  }

////////////////////////////////////////////////////////////////////////////////
  function redeemPurchaseCode($user_id, $code){
    require('./proxy.php');
    $connect = mysqli_connect($server, $user, $pass, $schema, $port);
    //$decoded = decodeToken($token);
    //$code = $decoded['code'];

    $query = "UPDATE `$table_codes` SET `status` = 0 WHERE `code` = '$code' AND `member_id` = '$user_id'";

    if (!mysqli_query($connect, $query)) {
      throw new Exception('Could not redeem code.');
    }
  }

////////////////////////////////////////////////////////////////////////////////
  function generateRegistrationCode() {
    $possible = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
    $length = 8;

    $i = 0;
    $sum = 0;
    $password = "";
    while ($i < $length) {
    $char = substr($possible, rand(0, strlen($possible)-1), 1);
    if (!strstr($password, $char)) {
      $password .= $char;
      $sum += ord($char);
      $i++;
      }
    }

    $reg_code = '';
    if ($sum % 2 == 0) {
      $reg_code = '0' . $password;
    } else {
      $reg_code = '1' . $password;
    }

    return $reg_code;

  }


 ?>
