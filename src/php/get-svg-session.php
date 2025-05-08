<?php
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: *");

include 'db-connect.php'; // Ensure proper DB connection

// Get user_id and invite_id from the URL parameters
$user_id = $_GET['user_id'] ?? null;
$invite_id = $_GET['invite_id'] ?? null;

if (!$user_id || !$invite_id) {
  http_response_code(400);
  echo json_encode(["error" => "Missing user_id or invite_id"]);
  exit;
}

// Prepare the SQL query to fetch the latest session data
$sql = "
  SELECT * FROM cutiuta_spatiul_meu
  WHERE user_id = ? AND invite_id = ? 
  AND session_id = (
    SELECT MAX(session_id)
    FROM cutiuta_spatiul_meu
    WHERE user_id = ? AND invite_id = ?
  )
";

// Prepare the statement to avoid SQL injection
$stmt = $conn->prepare($sql);
if (!$stmt) {
  // If statement preparation fails, send a server error response
  http_response_code(500);
  echo json_encode(["error" => "Failed to prepare SQL query: " . $conn->error]);
  exit;
}

// Bind the parameters to the prepared statement
$stmt->bind_param("iiii", $user_id, $invite_id, $user_id, $invite_id);

// Execute the query
$stmt->execute();

// Get the result of the query
$result = $stmt->get_result();

$data = [];

// Fetch all rows into the data array
while ($row = $result->fetch_assoc()) {
  $data[] = $row;
}

// If no data is found, return an error message
if (empty($data)) {
  http_response_code(404);
  echo json_encode(["error" => "No data found for the given user_id and invite_id"]);
} else {
  // Return the data as a JSON response
  echo json_encode($data);
}
?>
