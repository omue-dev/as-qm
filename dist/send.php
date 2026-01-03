<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  exit('Method not allowed');
}

$config = require __DIR__ . '/config.php';

$first = trim($_POST['firstName'] ?? '');
$last = trim($_POST['lastName'] ?? '');
$email = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');
$consent = ($_POST['consent'] ?? '') === 'on';
$honeypot = trim($_POST['company'] ?? '');
$formStarted = (int) ($_POST['formStarted'] ?? 0);
$recaptchaResponse = trim($_POST['g-recaptcha-response'] ?? '');

if ($honeypot !== '') {
  exit('Ok');
}

if ($formStarted > 0) {
  $elapsed = time() - $formStarted;
  if ($elapsed < 3) {
    header('Location: kontakt.html?status=error&code=spam');
    exit();
  }
}

if ($first === '' || $last === '' || $email === '' || $message === '' || !$consent) {
  header('Location: kontakt.html?status=error&code=missing');
  exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  header('Location: kontakt.html?status=error&code=email');
  exit();
}

if ($config['recaptcha_secret'] !== '') {
  if ($recaptchaResponse === '') {
    header('Location: kontakt.html?status=error&code=recaptcha');
    exit();
  }
  $payload = http_build_query([
    'secret' => $config['recaptcha_secret'],
    'response' => $recaptchaResponse,
    'remoteip' => $_SERVER['REMOTE_ADDR'] ?? '',
  ]);
  $context = stream_context_create([
    'http' => [
      'method' => 'POST',
      'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
      'content' => $payload,
      'timeout' => 8,
    ],
  ]);
  $verify = file_get_contents('https://www.google.com/recaptcha/api/siteverify', false, $context);
  $result = json_decode($verify, true);
  if (!is_array($result) || empty($result['success'])) {
    header('Location: kontakt.html?status=error&code=recaptcha');
    exit();
  }
}

$mail = new PHPMailer(true);

try {
  $mail->isSMTP();
  $mail->Host = $config['smtp_host'];
  $mail->SMTPAuth = true;
  $mail->Username = $config['smtp_user'];
  $mail->Password = $config['smtp_pass'];

  if ($config['smtp_secure'] === 'ssl') {
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
  } else {
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
  }

  $mail->Port = $config['smtp_port'];

  $mail->setFrom($config['mail_from'], $config['mail_from_name']);
  $mail->addAddress($config['mail_to']);
  $mail->addReplyTo($email, $first . ' ' . $last);

  $mail->Subject = 'Kontaktanfrage von ' . $first . ' ' . $last;
  $mail->Body = "Name: {$first} {$last}\nE-Mail: {$email}\n\nNachricht:\n{$message}\n";

  $mail->send();
  header('Location: danke.html');
  exit();
} catch (Exception $e) {
  http_response_code(500);
  header('Location: kontakt.html?status=error&code=send');
  exit();
}
