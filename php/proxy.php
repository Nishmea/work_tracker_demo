<?php

  $server = '127.0.0.1';
  $host = '{{ production_host_url }}';
  $port = '{{ mysql_db_port }}';

  $schema = '{{ mysql_db_schema }}';

  $table_users = '{{ mysqli_users_table_name }}';

  $user_worker = '{{ mysql_user }}';
  $pass_worker = '{{mysql_user_password}}';

  $user_login = '{{ mysqli_user_auth }}';
  $pass_login = '{{ mysqli_user_auth_password }}';


  $jwt_key = '{{ jwt_key }}';
  $jwt_algo = '{{ jwt_algorithm_array }}';
  $devHosts = '{{ hosts_array_for_sso }}';

  $salt = '{{ password_hash_salt }}';


 ?>
