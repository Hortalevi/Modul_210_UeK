# Verwendet das offizielle Python-Basisimage
FROM python:latest

# Setzt das Arbeitsverzeichnis im Container auf /data
WORKDIR /data

# Kopiert die lokale Datei data.txt in den Container nach /data/
COPY data.txt /data/

# Kopiert das Python-Skript in den Container nach /data/
COPY script.py /data/

# Führt beim Start des Containers das Python-Skript aus
CMD ["python", "script.py"]