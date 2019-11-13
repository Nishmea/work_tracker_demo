<?php

	session_start();

	require('./proxy.php');
	require('./token.php');
	require('./utility.php');

	$method = $_SERVER['REQUEST_METHOD'];

	switch ($method) {
		/*
		case 'GET':
			validateDevToken($_GET['devToken']);
			$decoded = decodeDevToken($_GET['devToken']);

			var_dump($decoded);
			die();

			break;
		*/

		case 'POST':
			$username = $_POST['user_id'];
			$password = hash('md5', $_POST['password'] . $salt);
			$query = "SELECT * FROM `$table_users` WHERE `username` = '$username' AND `password` = '$password' AND `blacklist` = 0";

			break;

		default:
			header('HTTP/1.1 401');
			die();
	}

	//Number of secondas token is valid for (30 days)
	$time = 2592000;

	$connect = mysqli_connect($server, $user_login, $pass_login, $schema, $port);

	if($result = mysqli_query($connect, $query)) {
	  if (mysqli_num_rows($result) == 1) {

			$row = mysqli_fetch_assoc($result);

			$table_key = $row['table_key'];
			$user_id = $row['user_id'];
			$username = $row['username'];

			$params = array(
				'table_key' => $row['table_key'],
				'user_id' => $row['user_id'],
				//'username' => $row['username'],
			);

			$jwt = generateToken(
				$time,
				$params
			);

			$_SESSION['jwt'] = $jwt;

			header("Authenticate:" . $jwt);
			header('HTTP/1.1 200');
			//header('Location: /#/');

	  } else {
			header('HTTP/1.1 403');
	  }
	} else {
		header('HTTP/1.1 404');
		echo 'Error: ' . mysqli_error($connect);
	}

	mysqli_close($connect);

?>
