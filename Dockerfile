FROM node:23.9.0-bullseye
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

COPY entrypoint.sh .

# Mache das Start-Skript ausführbar
RUN chmod +x entrypoint.sh

# Exponiere die Ports
EXPOSE 4200

# Setze den Standardbefehl
CMD ["./entrypoint.sh"]
