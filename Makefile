.PHONY: secret-key clean

# Directory to store the keys
KEY_DIR = ./auth

# Private key file
PRIVATE_KEY = $(KEY_DIR)/secr.pem

# Public key file
PUBLIC_KEY = $(KEY_DIR)/pub.pem

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