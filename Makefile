config:
	@powershell -Command "if ((Get-Service -Name 'com.docker.service').Status -ne 'Running') { Start-Service -Name 'com.docker.service' }"
	@powershell -Command "Start-Process -FilePath 'C:\\Program Files\\Docker\\Docker\\Docker Desktop.exe'; Start-Sleep -Seconds 30"
	@powershell -Command "minikube start --profile docker-desktop"
	@powershell -Command "skaffold config set --global local-cluster true"
	@powershell -Command "& minikube -p docker-desktop docker-env | Invoke-Expression"
run:
	skaffold dev --auto-build --auto-sync --auto-deploy