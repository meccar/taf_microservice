# Paths to the key files
$privateKeyPath = "./auth/secr.pem"
$publicKeyPath = "./auth/pub.pem"
$secretYamlPath = "./infra/k8s/jwt-secret.yaml"

# Function to encode a key file
function Encode-KeyFile {
    param (
        [string]$keyPath
    )

    # Read the key from the file
    $key = Get-Content -Path $keyPath -Raw

    # Check if the file was read successfully
    if ($null -eq $key) {
        Write-Error "Failed to read the key file: $keyPath"
        return $null
    }

    $bytes = [System.Text.Encoding]::UTF8.GetBytes($key)
    $encoded = [Convert]::ToBase64String($bytes)

    return $encoded
}

# Encode private key
$privateKeyEncoded = Encode-KeyFile -keyPath $privateKeyPath
if ($null -eq $privateKeyEncoded) {
    exit 1
}

# Encode public key
$publicKeyEncoded = Encode-KeyFile -keyPath $publicKeyPath
if ($null -eq $publicKeyEncoded) {
    exit 1
}

# Create the Kubernetes Secret YAML
$secretYaml = @"
apiVersion: v1
kind: Secret
metadata:
  name: jwt-secret
type: Opaque
data:
  secr-key: $privateKeyEncoded
  pub-key: $publicKeyEncoded
"@

# Save the YAML to a file
$secretYaml | Out-File -FilePath $secretYamlPath -Encoding utf8

Write-Host "Kubernetes Secret YAML file created: $secretYamlPath"