module.exports = {
  HOST: 'localhost',
  SCHEMA: '{{ mysql_db_schema }}',
  DB_PORT: '{{ mysql_db_port }}',
  ISSUER: '{{ production_host_url }}',
  DB_USER: '{{ mysql_user }}',
  DB_PASS: '{{mysql_user_password}}',
  DB_USER_LOGIN: '{{ mysqli_user_auth }}',
  DB_PASS_LOGIN: '{{ mysqli_user_auth_password }}',
  TABLE_USERS: '{{ mysqli_users_table_name }}',
  SALT: '{{ password_hash_salt }}',
  JWT_KEY: '{{ jwt_key }}',
  COOKIE: '{{ jwt_cookie_name }}',
}