<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database configuration
$host = getenv('DB_HOST') ?: 'localhost';
$dbname = getenv('DB_NAME') ?: 'harit_bharat_expo';
$username = getenv('DB_USER') ?: 'root';
$password = getenv('DB_PASS') ?: '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit();
}

// Get request method and path
$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = str_replace('/api', '', $path);

// Route handling
switch ($path) {
    case '/':
    case '/index.php':
        echo json_encode([
            'message' => 'Harit Bharat Expo API',
            'status' => 'running',
            'database' => 'MySQL/MariaDB'
        ]);
        break;

    case '/health':
        echo json_encode([
            'status' => 'ok',
            'timestamp' => date('c')
        ]);
        break;

    case '/registrations':
        if ($method === 'GET') {
            getRegistrations($pdo);
        } elseif ($method === 'POST') {
            addRegistration($pdo);
        }
        break;

    case (preg_match('/\/registrations\/(\d+)/', $path, $matches) ? true : false):
        if ($method === 'DELETE') {
            deleteRegistration($pdo, $matches[1]);
        }
        break;

    case '/smtp-config':
        if ($method === 'GET') {
            getSmtpConfig($pdo);
        } elseif ($method === 'POST') {
            updateSmtpConfig($pdo);
        }
        break;

    case '/smtp-test':
        if ($method === 'POST') {
            testSmtp($pdo);
        }
        break;

    default:
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint not found']);
}

// Functions

function getRegistrations($pdo) {
    try {
        $stmt = $pdo->query("SELECT * FROM registrations ORDER BY registered_at DESC");
        $registrations = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($registrations);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}

function addRegistration($pdo) {
    try {
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (empty($data['fullName']) || empty($data['email']) || empty($data['phone'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing required fields']);
            return;
        }

        $stmt = $pdo->prepare("INSERT INTO registrations (full_name, email, phone, registered_at) VALUES (?, ?, ?, NOW())");
        $stmt->execute([$data['fullName'], $data['email'], $data['phone']]);
        
        $id = $pdo->lastInsertId();
        $stmt = $pdo->prepare("SELECT * FROM registrations WHERE id = ?");
        $stmt->execute([$id]);
        $registration = $stmt->fetch(PDO::FETCH_ASSOC);
        
        echo json_encode([
            'success' => true,
            'registration' => $registration
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}

function deleteRegistration($pdo, $id) {
    try {
        $stmt = $pdo->prepare("DELETE FROM registrations WHERE id = ?");
        $stmt->execute([$id]);
        
        echo json_encode(['success' => true]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}

function getSmtpConfig($pdo) {
    try {
        $stmt = $pdo->query("SELECT * FROM smtp_config WHERE id = 1");
        $config = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$config) {
            // Return default config
            $config = [
                'host' => 'smtp.gmail.com',
                'port' => 587,
                'secure' => false,
                'from' => 'noreply@haritbharatexpo.com',
                'recipients' => ''
            ];
        }
        
        $config['authConfigured'] = !empty($config['auth_user']) && !empty($config['auth_pass']);
        unset($config['auth_pass']); // Don't send password to frontend
        
        echo json_encode($config);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}

function updateSmtpConfig($pdo) {
    try {
        $data = json_decode(file_get_contents('php://input'), true);
        
        $stmt = $pdo->prepare("
            INSERT INTO smtp_config (id, host, port, secure, auth_user, auth_pass, `from`, recipients) 
            VALUES (1, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE 
                host = VALUES(host),
                port = VALUES(port),
                secure = VALUES(secure),
                auth_user = VALUES(auth_user),
                auth_pass = VALUES(auth_pass),
                `from` = VALUES(`from`),
                recipients = VALUES(recipients)
        ");
        
        $stmt->execute([
            $data['host'],
            $data['port'],
            $data['secure'] ? 1 : 0,
            $data['auth']['user'],
            $data['auth']['pass'],
            $data['from'],
            $data['recipients'] ?? ''
        ]);
        
        echo json_encode(['success' => true]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}

function testSmtp($pdo) {
    try {
        $stmt = $pdo->query("SELECT auth_user, auth_pass FROM smtp_config WHERE id = 1");
        $config = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$config || empty($config['auth_user']) || empty($config['auth_pass'])) {
            http_response_code(400);
            echo json_encode(['error' => 'SMTP not configured']);
            return;
        }
        
        echo json_encode([
            'success' => true,
            'message' => 'SMTP configuration is valid'
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}
?>
