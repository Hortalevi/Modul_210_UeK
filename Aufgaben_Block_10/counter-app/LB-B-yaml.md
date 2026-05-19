Kubernetes / OpenShift Spickzettel (kommentiert)
================================================

* * * * *

1\. SECRET (Passwörter speichern)
=================================

```
apiVersion: v1                 # Kubernetes API Versionkind: Secret                   # Typ = Secret (sensible Daten)metadata:  name: counter-database       # Name des Secretstype: Opaque                   # Standard Secret TypstringData:                    # Klartext Werte (werden intern encoded)  database-host: counter-database  database-name: counter  database-user: counteruser  database-password: einSicheresPasswort123
```

Zweck
-----

Speichert:

-   Datenbank Host
-   Datenbank Name
-   Benutzer
-   Passwort

Damit Passwörter NICHT direkt im Deployment stehen.

* * * * *

2\. PERSISTENT VOLUME CLAIM (Speicher)
======================================

```
apiVersion: v1kind: PersistentVolumeClaim    # Speicheranforderungmetadata:  name: counter-database-dataspec:  accessModes:    - ReadWriteOnce            # Nur ein Pod darf schreiben  storageClassName: rbd-storagepool-cluster                                # Storage Klasse  volumeMode: Filesystem       # Normales Filesystem  resources:    requests:      storage: 1Gi             # 1 Gigabyte Speicher
```

Zweck
-----

Die PostgreSQL Daten bleiben erhalten, auch wenn der Pod neu startet.

OHNE PVC:\
→ Daten wären weg.

* * * * *

3\. POSTGRESQL DEPLOYMENT
=========================

```
apiVersion: apps/v1kind: Deploymentmetadata:  name: counter-databaselabels:  app: counter-database
```

Deployment startet Datenbank Pods.
----------------------------------

* * * * *

Replica Anzahl
--------------

```
spec:  replicas: 1
```

Eine Datenbank Instanz.

* * * * *

Pod Auswahl
-----------

```
selector:  matchLabels:    app: counter-database
```

Deployment verwaltet Pods mit diesem Label.

* * * * *

Pod Template
------------

```
template:  metadata:    labels:      app: counter-database
```

Label wird dem Pod gegeben.

* * * * *

Container
---------

```
containers:  - name: counter-database
```

Container Name.

* * * * *

Docker Image
------------

```
image: registry.redhat.io/rhel8/postgresql-15:latest
```

PostgreSQL 15 Image.

* * * * *

Datenbank Port
--------------

```
ports:  - containerPort: 5432
```

5432 = PostgreSQL Standardport.

* * * * *

Environment Variablen
---------------------

```
env:
```

Variablen für DB Konfiguration.

* * * * *

### Benutzer

```
- name: POSTGRESQL_USER
```

DB Username.

```
valueFrom:  secretKeyRef:
```

Wert aus Secret holen.

* * * * *

Volume Mount
------------

```
volumeMounts:  - name: counter-database-data    mountPath: /var/lib/pgsql/data
```

Datenbank speichert Daten dort.

* * * * *

4\. DATABASE SERVICE
====================

```
kind: Service
```

Macht die Datenbank im Cluster erreichbar.

* * * * *

```
port: 5432
```

Andere Pods können verbinden.

* * * * *

5\. BACKEND DEPLOYMENT
======================

```
kind: Deploymentmetadata:  name: counter-backend
```

Backend API Server.

* * * * *

Replikas
--------

```
replicas: 2
```

2 Backend Pods für Hochverfügbarkeit.

* * * * *

Image
-----

```
image: ghcr.io/hortalevi/counter-backend:v1
```

Backend Docker Image.

* * * * *

Backend Port
------------

```
containerPort: 8080
```

REST API läuft auf 8080.

* * * * *

Backend Umgebungsvariablen
==========================

```
DB_USERDB_PASSWORDDB_NAMEDB_HOST
```

Backend verbindet sich damit zur PostgreSQL Datenbank.

* * * * *

Ressourcen Limits
=================

```
resources:
```

Begrenzt CPU und RAM.

* * * * *

Requests
--------

```
requests:
```

Garantierte Ressourcen.

* * * * *

Limits
------

```
limits:
```

Maximal erlaubte Ressourcen.

* * * * *

6\. BACKEND SERVICE
===================

```
kind: Service
```

Interner Zugriff auf Backend.

* * * * *

7\. OPENSHIFT ROUTE (Backend öffentlich)
========================================

```
kind: Route
```

OpenShift eigene externe URL.

* * * * *

TLS
---

```
tls:  termination: edge
```

HTTPS wird am Router beendet.

* * * * *

Redirect
--------

```
insecureEdgeTerminationPolicy: Redirect
```

HTTP → HTTPS Weiterleitung.

* * * * *

8\. FRONTEND DEPLOYMENT
=======================

```
name: counter-frontend
```

React/Vue/Angular Frontend.

* * * * *

Frontend Image
--------------

```
image: ghcr.io/hortalevi/counter-frontend:v1
```

Frontend Docker Image.

* * * * *

Port
----

```
containerPort: 3000
```

Frontend läuft auf Port 3000.

* * * * *

Backend URL
-----------

```
BACKEND_URL
```

Frontend weiß dadurch:\
„Wohin soll ich API Requests senden?"

* * * * *

9\. FRONTEND SERVICE
====================

Service für Frontend Pods.

* * * * *

10\. FRONTEND ROUTE
===================

Öffentliche URL für die Webseite.

* * * * *

11\. HORIZONTAL POD AUTOSCALER (HPA)
====================================

Automatische Skalierung.

* * * * *

Backend Autoscaling
===================

```
minReplicas: 2maxReplicas: 3
```

Backend skaliert zwischen 2--3 Pods.

* * * * *

CPU Ziel
--------

```
averageUtilization: 80
```

Wenn CPU > 80%:\
→ neuer Pod wird gestartet.

* * * * *

Frontend Autoscaling
====================

```
minReplicas: 2maxReplicas: 4
```

Frontend kann bis auf 4 Pods skalieren.

* * * * *

Gesamtarchitektur
=================

```
Browser   ↓Frontend Route (HTTPS)   ↓Frontend Service   ↓Frontend Pods   ↓ API CallsBackend Route   ↓Backend Service   ↓Backend Pods   ↓PostgreSQL Service   ↓PostgreSQL Pod   ↓Persistent Storage
```

* * * * *

Wichtige Kubernetes Begriffe
============================

| Begriff | Bedeutung |
| --- | --- |
| Pod | Laufender Container |
| Deployment | Verwaltet Pods |
| Service | Interne Netzwerkadresse |
| Route | Öffentliche URL (OpenShift) |
| Secret | Passwörter |
| PVC | Permanenter Speicher |
| HPA | Automatische Skalierung |

* * * * *

Kurz zusammengefasst
====================

Die App besteht aus:

-   Frontend
-   Backend API
-   PostgreSQL Datenbank

Features:

-   Use Cases erstellen
-   Eigene Messbuttons definieren
-   Klicks speichern
-   Zeitstempel speichern
-   Exportieren
-   Skalierbar durch Kubernetes/OpenShift