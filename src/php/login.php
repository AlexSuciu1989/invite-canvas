<?php
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: *");

include 'db-connect.php'; // Ensure proper DB connection

$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = trim($data["email"]);
    $password = trim($data["password"]);

    if (empty($email) || empty($password)) {
        echo json_encode(["error" => "Email and password are required"]);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["error" => "Invalid email format"]);
        exit;
    }

    $stmt = $conn->prepare("SELECT id, username, password FROM cutiuta_users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 0) {
        echo json_encode(["error" => "Invalid email or password"]);
        exit;
    }

    $stmt->bind_result($userId, $username, $hashedPassword);
    $stmt->fetch();

    if (password_verify($password, $hashedPassword)) {
        // Set cookie for 7 days
        setcookie("username", $username, time() + (7 * 24 * 60 * 60), "/", "", false, true);

        echo json_encode(["message" => "Login successful", "username" => $username]);
        exit;
    } else {
        echo json_encode(["error" => "Invalid email or password"]);
        exit;
    }

    $stmt->close();
    $conn->close();
}
?>
