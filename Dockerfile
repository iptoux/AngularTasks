FROM FROM node:23.9.0-bullseye
LABEL authors="iptoux"

# Setze das Arbeitsverzeichnis im Container
WORKDIR /app

# Installiere Git und bereinige den apt-Cache in einem einzigen Layer
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y git && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Installiere Angular CLI global
RUN npm install -g @angular/cli

# Klone das Repository
RUN git clone https://github.com/iptoux/AngularTasks

# Setze das Arbeitsverzeichnis auf das Angular-Projekt
WORKDIR /app/AngularTasks

RUN npm install

# Erstelle das Start-Skript während des Builds
RUN cat << 'EOF' > start-servers.sh
#!/bin/bash

# Starte den Webhook-Server im Hintergrund
cd /app/AngularTasks
node updater.js &

# Warte kurz, damit der Webhook-Server starten kann
sleep 2

# Starte den Angular-Server
ng serve --host 0.0.0.0 --disable-host-check --poll 2000
EOF

# Mache das Start-Skript ausführbar
RUN chmod +x start-servers.sh

# Exponiere die Ports
EXPOSE 4200

# Setze den Standardbefehl
CMD ["./start-servers.sh"]
