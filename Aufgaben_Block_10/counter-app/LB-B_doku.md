Counter App -- Spickzettel
=========================

App Erklärung
-------------

Die App ist ein Counter-/Measurement-Tool.

Man kann:

-   Use Cases erstellen
-   Measurement Options definieren
-   Buttons klicken
-   Zeitstempel speichern
-   Daten exportieren

Architektur
-----------

```
Frontend (React)        ↓ HTTPSBackend (Node.js / Express API)        ↓ TCP 5432PostgreSQL Datenbank
```

Kommunikation
-------------

### Frontend

-   React App
-   Läuft auf Port 3000
-   Nutzt `BACKEND_URL`

### Backend

-   Node.js API
-   Läuft auf Port 3000
-   Nutzt PostgreSQL

### Datenbank

-   PostgreSQL 15
-   Läuft auf Port 5432
-   Daten persistent über PVC

* * * * *

Reihenfolge
===========

Vorbereitung
------------

```
git clone <repo>cd counter-app
```

* * * * *

Images bauen
============

Backend
-------

```
docker build -t counter-backend:v1 -f Dockerfile.backend .
```

```
docker tag counter-backend:v1 ghcr.io/hortalevi/counter-backend:v1
```

```
docker push ghcr.io/hortalevi/counter-backend:v1
```

* * * * *

Frontend
--------

```
docker build -t counter-frontend:v1 -f Dockerfile.frontend .
```

```
docker tag counter-frontend:v1 ghcr.io/hortalevi/counter-frontend:v1
```

```
docker push ghcr.io/hortalevi/counter-frontend:v1
```

* * * * *

Alle Ressourcen löschen
=======================

```
oc delete deployment counter-backend counter-frontend counter-database
```

```
oc delete svc counter-backend counter-frontend counter-database
```

```
oc delete route counter-backend counter-frontend
```

```
oc delete hpa counter-backend counter-frontend
```

```
oc delete pvc counter-database-data
```

```
oc delete secret counter-database
```

* * * * *

Apply Reihenfolge
=================

```
oc apply -f 01-secret.yaml
```

```
oc apply -f 02-pvc.yaml
```

```
oc apply -f 03-database.yaml
```

```
oc apply -f 04-backend.yaml
```

```
oc apply -f 05-frontend.yaml
```

```
oc apply -f 06-hpa.yaml
```

* * * * *

Prüfen
======

Pods
----

```
oc get pods
```

Services
--------

```
oc get svc
```

Routes
------

```
oc get routes
```

HPA
---

```
oc get hpa
```

* * * * *

HTTPS URLs
==========

Frontend
--------

```
https://counter-frontend-264574-levago.apps.exoscale-ch-gva-2-0.appuio.cloud
```

Backend
-------

```
https://counter-backend-264574-levago.apps.exoscale-ch-gva-2-0.appuio.cloud
```

* * * * *

01-secret.yaml
==============

Zweck
-----

Speichert DB Zugangsdaten.

Inhalt
------

```
apiVersion: v1kind: Secretmetadata:  name: counter-databasetype: OpaquestringData:  database-host: counter-database  database-name: counter  database-user: counter  database-password: counter123
```

* * * * *

02-pvc.yaml
===========

Zweck
-----

Persistenter Speicher für PostgreSQL.

Inhalt
------

```
apiVersion: v1kind: PersistentVolumeClaimmetadata:  name: counter-database-dataspec:  accessModes:    - ReadWriteOnce  storageClassName: rbd-storagepool-cluster  volumeMode: Filesystem  resources:    requests:      storage: 1Gi
```

* * * * *

03-database.yaml
================

Zweck
-----

PostgreSQL Deployment + Service.

Wichtig
-------

-   Port 5432
-   Nutzt Secret
-   Nutzt PVC

Wichtigste Punkte
-----------------

```
image: registry.redhat.io/rhel8/postgresql-15:latest
```

```
mountPath: /var/lib/pgsql/data
```

```
claimName: counter-database-data
```

* * * * *

04-backend.yaml
===============

Zweck
-----

Backend API Deployment + Service + Route.

Wichtig
-------

### Image

```
image: ghcr.io/hortalevi/counter-backend:v1
```

### DB Verbindung

```
DB_HOSTDB_NAMEDB_USERDB_PASSWORD
```

### npm Cache

```
- name: npm_config_cache  value: ./.npm-cache
```

### HTTPS Redirect

```
haproxy.router.openshift.io/redirect-to-https: "true"
```

* * * * *

05-frontend.yaml
================

Zweck
-----

Frontend Deployment + Service + Route.

Wichtig
-------

### Image

```
image: ghcr.io/hortalevi/counter-frontend:v1
```

### Backend Verbindung

```
BACKEND_URL
```

### Namespace

```
NAMESPACE
```

### npm Cache

```
npm_config_cache
```

### HTTPS Redirect

```
insecureEdgeTerminationPolicy: Redirect
```

* * * * *

06-hpa.yaml
===========

Zweck
-----

Autoscaling.

Backend
-------

```
minReplicas: 2maxReplicas: 3
```

Frontend
--------

```
minReplicas: 2maxReplicas: 4
```

* * * * *

Häufige Fehler
==============

InvalidImageName
----------------

Falscher GitHub Image Name.

CrashLoopBackOff
----------------

Falsche ENV Variablen.

CORS Fehler
-----------

Frontend und Backend unterschiedliche Domains.

503 Service Unavailable
-----------------------

Falscher Service-Port.Counter App -- Spickzettel
=========================

App Erklärung
-------------

Die App ist ein Counter-/Measurement-Tool.

Man kann:

-   Use Cases erstellen
-   Measurement Options definieren
-   Buttons klicken
-   Zeitstempel speichern
-   Daten exportieren

Architektur
-----------

```
Frontend (React)        ↓ HTTPSBackend (Node.js / Express API)        ↓ TCP 5432PostgreSQL Datenbank
```

Kommunikation
-------------

### Frontend

-   React App
-   Läuft auf Port 3000
-   Nutzt `BACKEND_URL`

### Backend

-   Node.js API
-   Läuft auf Port 3000
-   Nutzt PostgreSQL

### Datenbank

-   PostgreSQL 15
-   Läuft auf Port 5432
-   Daten persistent über PVC

* * * * *

Reihenfolge
===========

Vorbereitung
------------

```
git clone <repo>cd counter-app
```

* * * * *

Images bauen
============

Backend
-------

```
docker build -t counter-backend:v1 -f Dockerfile.backend .
```

```
docker tag counter-backend:v1 ghcr.io/hortalevi/counter-backend:v1
```

```
docker push ghcr.io/hortalevi/counter-backend:v1
```

* * * * *

Frontend
--------

```
docker build -t counter-frontend:v1 -f Dockerfile.frontend .
```

```
docker tag counter-frontend:v1 ghcr.io/hortalevi/counter-frontend:v1
```

```
docker push ghcr.io/hortalevi/counter-frontend:v1
```

* * * * *

Alle Ressourcen löschen
=======================

```
oc delete deployment counter-backend counter-frontend counter-database
```

```
oc delete svc counter-backend counter-frontend counter-database
```

```
oc delete route counter-backend counter-frontend
```

```
oc delete hpa counter-backend counter-frontend
```

```
oc delete pvc counter-database-data
```

```
oc delete secret counter-database
```

* * * * *

Apply Reihenfolge
=================

```
oc apply -f 01-secret.yaml
```

```
oc apply -f 02-pvc.yaml
```

```
oc apply -f 03-database.yaml
```

```
oc apply -f 04-backend.yaml
```

```
oc apply -f 05-frontend.yaml
```

```
oc apply -f 06-hpa.yaml
```

* * * * *

Prüfen
======

Pods
----

```
oc get pods
```

Services
--------

```
oc get svc
```

Routes
------

```
oc get routes
```

HPA
---

```
oc get hpa
```

* * * * *

HTTPS URLs
==========

Frontend
--------

```
https://counter-frontend-264574-levago.apps.exoscale-ch-gva-2-0.appuio.cloud
```

Backend
-------

```
https://counter-backend-264574-levago.apps.exoscale-ch-gva-2-0.appuio.cloud
```

* * * * *

01-secret.yaml
==============

Zweck
-----

Speichert DB Zugangsdaten.

Inhalt
------

```
apiVersion: v1kind: Secretmetadata:  name: counter-databasetype: OpaquestringData:  database-host: counter-database  database-name: counter  database-user: counter  database-password: counter123
```

* * * * *

02-pvc.yaml
===========

Zweck
-----

Persistenter Speicher für PostgreSQL.

Inhalt
------

```
apiVersion: v1kind: PersistentVolumeClaimmetadata:  name: counter-database-dataspec:  accessModes:    - ReadWriteOnce  storageClassName: rbd-storagepool-cluster  volumeMode: Filesystem  resources:    requests:      storage: 1Gi
```

* * * * *

03-database.yaml
================

Zweck
-----

PostgreSQL Deployment + Service.

Wichtig
-------

-   Port 5432
-   Nutzt Secret
-   Nutzt PVC

Wichtigste Punkte
-----------------

```
image: registry.redhat.io/rhel8/postgresql-15:latest
```

```
mountPath: /var/lib/pgsql/data
```

```
claimName: counter-database-data
```

* * * * *

04-backend.yaml
===============

Zweck
-----

Backend API Deployment + Service + Route.

Wichtig
-------

### Image

```
image: ghcr.io/hortalevi/counter-backend:v1
```

### DB Verbindung

```
DB_HOSTDB_NAMEDB_USERDB_PASSWORD
```

### npm Cache

```
- name: npm_config_cache  value: ./.npm-cache
```

### HTTPS Redirect

```
haproxy.router.openshift.io/redirect-to-https: "true"
```

* * * * *

05-frontend.yaml
================

Zweck
-----

Frontend Deployment + Service + Route.

Wichtig
-------

### Image

```
image: ghcr.io/hortalevi/counter-frontend:v1
```

### Backend Verbindung

```
BACKEND_URL
```

### Namespace

```
NAMESPACE
```

### npm Cache

```
npm_config_cache
```

### HTTPS Redirect

```
insecureEdgeTerminationPolicy: Redirect
```

* * * * *

06-hpa.yaml
===========

Zweck
-----

Autoscaling.

Backend
-------

```
minReplicas: 2maxReplicas: 3
```

Frontend
--------

```
minReplicas: 2maxReplicas: 4
```

* * * * *

Häufige Fehler
==============

InvalidImageName
----------------

Falscher GitHub Image Name.

CrashLoopBackOff
----------------

Falsche ENV Variablen.

CORS Fehler
-----------

Frontend und Backend unterschiedliche Domains.

503 Service Unavailable
-----------------------

Falscher Service-Port.