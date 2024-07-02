.PHONY: secret-key clean

# Directory to store the keys
KEY_DIR = ./auth

# Private key file
PRIVATE_KEY = $(KEY_DIR)/secr.pem

# Public key file
PUBLIC_KEY = $(KEY_DIR)/pub.pem

# Secret YAML file
SECRET_YAML = ./infra/k8s/jwt-secret.yaml

config-win:
	@powershell -Command "if ((Get-Service -Name 'com.docker.service').Status -ne 'Running') { Start-Service -Name 'com.docker.service' }"
	@powershell -Command "Start-Process -FilePath 'C:\\Program Files\\Docker\\Docker\\Docker Desktop.exe'; Start-Sleep -Seconds 30"
	@powershell -Command "minikube start --profile docker-desktop"
	@powershell -Command "skaffold config set --global local-cluster true"
	@powershell -Command "& minikube -p docker-desktop docker-env | Invoke-Expression"
run:
	skaffold dev --auto-build --auto-sync --auto-deploy

# Generate the secret key
secret-key: $(PRIVATE_KEY) $(PUBLIC_KEY)

# Rule to generate the private key
$(PRIVATE_KEY):
	openssl genpkey -algorithm RSA -out $(PRIVATE_KEY) -pkeyopt rsa_keygen_bits:2048

# Rule to generate the public key
$(PUBLIC_KEY): $(PRIVATE_KEY)
	openssl rsa -in $(PRIVATE_KEY) -pubout -out $(PUBLIC_KEY)

encode-keys: $(PRIVATE_KEY) $(PUBLIC_KEY)
	powershell -ExecutionPolicy Bypass -File encodeSecr.ps1

# Clean up generated files
clean:
	@powershell -Command "if (Test-Path $(PRIVATE_KEY)) { Remove-Item -Force $(PRIVATE_KEY) }"
	@powershell -Command "if (Test-Path $(PUBLIC_KEY)) { Remove-Item -Force $(PUBLIC_KEY) }"
	@powershell -Command "if (Test-Path $(SECRET_YAML)) { Remove-Item -Force $(SECRET_YAML) }"	
	@powershell -Command "if (Test-Path encoded_private_key.txt) { Remove-Item -Force encoded_private_key.txt }"	
	@powershell -Command "if (Test-Path encoded_pub_key.txt) { Remove-Item -Force encoded_pub_key.txt }"	