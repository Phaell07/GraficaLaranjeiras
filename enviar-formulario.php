<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

  // Sanitização
  $name = htmlspecialchars(trim($_POST['name'] ?? ''));
  $email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
  $phone = htmlspecialchars(trim($_POST['phone'] ?? ''));
  $orcamento = htmlspecialchars(trim($_POST['orcamento'] ?? ''));
  $message = htmlspecialchars(trim($_POST['message'] ?? ''));

  // Validação
  if (!$name || !$email || !$phone || !$orcamento || !$message) {
    http_response_code(400);
    echo "Preencha todos os campos.";
    exit;
  }

  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo "E-mail inválido.";
    exit;
  }

  // Corpo
  $body = "Novo contato recebido:\n\n";
  $body .= "Nome: $name\n";
  $body .= "Email: $email\n";
  $body .= "Telefone: $phone\n";
  $body .= "Orçamento: $orcamento\n";
  $body .= "Mensagem:\n$message\n";

  $mail = new PHPMailer(true);
  
  $mail->CharSet = 'UTF-8';

  try {
    // CONFIG SMTP (GOOGLE)
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'atendimento@graficalaranjeiras.com.br'; // SEU EMAIL
    $mail->Password   = ''; // ⚠️ SENHA DE APP DO GOOGLE
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    // Remetente e destino
    $mail->setFrom('atendimento@graficalaranjeiras.com.br', 'Site Grafica');
    $mail->addAddress('atendimento@graficalaranjeiras.com.br');

    // Reply do cliente
    $mail->addReplyTo($email, $name);

    // Conteúdo
    $mail->isHTML(false);
    $mail->Subject = 'Novo orçamento - Site';
    $mail->Body    = $body;

    $mail->send();

    http_response_code(200);
    echo "OK";

  } catch (Exception $e) {
    http_response_code(500);
    echo "Erro ao enviar: {$mail->ErrorInfo}";
  }
}

?>