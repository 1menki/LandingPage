<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "info@adfleet24.de";
    $subject = "Neue Kontaktanfrage von der Website";

    $name = htmlspecialchars($_POST["name"]);
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars($_POST["phone"]);
    $message = htmlspecialchars($_POST["message"]);

    $body = "Name: $name\n";
    $body .= "E-Mail: $email\n";
    $body .= "Telefon: $phone\n\n";
    $body .= "Nachricht:\n$message\n";

    $headers = "From: info@adfleet24.de\r\n"; // immer eigene Adresse
    $headers .= "Reply-To: $email\r\n";        // damit du antworten kannst

        if (mail($to, $subject, $body, $headers)) {
        header("Location: danke.html");
            exit;
        } else {
         echo "Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.";
        }
    } else {
    http_response_code(403);
    echo "Unzulässiger Zugriff.";
}
?>
