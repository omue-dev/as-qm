<?php
$envPath = __DIR__ . '/.env';
if (file_exists($envPath)) {
  $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
  foreach ($lines as $line) {
    $line = trim($line);
    if ($line === '' || strpos($line, '#') === 0) {
      continue;
    }
    $parts = explode('=', $line, 2);
    if (count($parts) !== 2) {
      continue;
    }
    $key = trim($parts[0]);
    $value = trim($parts[1]);
    $value = trim($value, "\"'");
    putenv($key . '=' . $value);
    $_ENV[$key] = $value;
  }
}

return [
  'smtp_host' => getenv('SMTP_HOST') ?: 'smtp.ionos.de',
  'smtp_port' => (int) (getenv('SMTP_PORT') ?: 587),
  'smtp_user' => getenv('SMTP_USER') ?: 'info@as-qm.de',
  'smtp_pass' => getenv('SMTP_PASS') ?: '',
  'smtp_secure' => getenv('SMTP_SECURE') ?: 'tls',
  'mail_from' => getenv('MAIL_FROM') ?: 'info@as-qm.de',
  'mail_from_name' => getenv('MAIL_FROM_NAME') ?: 'A&S QM Beratung',
  'mail_to' => getenv('MAIL_TO') ?: 'info@as-qm.de',
  'recaptcha_site_key' => getenv('RECAPTCHA_SITE_KEY') ?: '',
  'recaptcha_secret' => getenv('RECAPTCHA_SECRET') ?: '',
];
