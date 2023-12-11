#!/bin/bash
# build-docker.sh

# Hier definieren Sie den Namen Ihres Docker-Images
IMAGE_NAME="planqk"

# Erstellt das Docker-Image
docker build -t $IMAGE_NAME .

# Überprüfen, ob das Image erfolgreich erstellt wurde
if [ $? -eq 0 ]
then
  echo "Docker Image wurde erfolgreich erstellt."

  # Startet das erstellte Docker-Image
  docker run -d -p 8085:8080 $IMAGE_NAME
else
  echo "Fehler beim Erstellen des Docker-Images, bitte überprüfen Sie Ihre Dockerfile."
fi