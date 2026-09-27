# Ecom Microservices App

Application e-commerce en architecture **microservices** avec Spring Boot (backend) et Angular (frontend). Réalisée dans le cadre du module Microservices — Pr. Mohamed Youssfi, ENSET Mohammedia.

---

## Présentation

Le système est composé de plusieurs micro-services Spring Boot indépendants, coordonnés par un **registre de découverte (Eureka)**, un **serveur de configuration centralisé (Config Server)** et une **passerelle (API Gateway)** qui sert de point d'entrée unique. Un client **Angular** consomme l'ensemble à travers la passerelle.

Chaque micro-service possède sa propre base de données et communique avec les autres uniquement via HTTP (OpenFeign). Le service de facturation illustre la **composition de données** : il agrège des informations provenant des services Customer et Inventory pour construire une facture complète.

---

## Architecture

```
                          ┌─────────────────┐
      Angular (4200) ───► │  Gateway (8888) │ ──► routage dynamique via Eureka
                          └────────┬────────┘
                                   │
        ┌──────────────┬───────────┼───────────────┐
        ▼              ▼           ▼                ▼
  customer-service  inventory-  billing-service   (Feign)
     (8081)         service      (8083) ───────────┐
                    (8082)                          │ compose
        │              │            │               ▼
        └──────────────┴────────────┴──►  Customer + Inventory data

        Discovery / Eureka (8761)   ◄── tous les services s'y enregistrent
        Config Server (9999)        ◄── configuration centralisée (Git/native)
```

---

## Services

| Service | Port | Rôle |
|---------|------|------|
| **discovery-service** | 8761 | Registre Eureka — annuaire des services |
| **config-service** | 9999 | Serveur de configuration centralisé |
| **gateway-service** | 8888 | Point d'entrée unique (routage dynamique) |
| **customer-service** | 8081 | Gestion des clients (Spring Data REST) |
| **inventory-service** | 8082 | Gestion des produits (Spring Data REST) |
| **billing-service** | 8083 | Facturation — compose les données via OpenFeign |
| **ecom-frontend** | 4200 | Client Angular |

---

## Technologies

**Backend :** Java 21 · Spring Boot · Spring Cloud (Eureka, Config, Gateway, OpenFeign) · Spring Data JPA · H2 · Lombok · Maven

**Frontend :** Angular · TypeScript · Bootstrap (standalone components, signals, lazy loading)

---

## Structure du dépôt

```
ecom-ms-app/
├── discovery-service/     # Eureka Server
├── config-service/        # Config Server
├── config-repo/           # Fichiers de configuration centralisés
├── gateway-service/       # API Gateway (WebFlux)
├── customer-service/      # Micro-service Clients
├── inventory-service/     # Micro-service Produits
├── billing-service/       # Micro-service Facturation (Feign)
└── ecom-frontend/         # Client Angular
```

---

## Démarrage

### Prérequis
- JDK 21+, Maven 3.9+
- Node.js + Angular CLI (pour le frontend)

### Ordre de lancement (important)

Les services doivent démarrer dans cet ordre :

```bash
# 1. Registre Eureka (en premier, attendre ~15s)
cd discovery-service && mvn spring-boot:run

# 2. Config Server
cd config-service && mvn spring-boot:run

# 3. Les micro-services métier (dans des terminaux séparés)
cd customer-service  && mvn spring-boot:run
cd inventory-service && mvn spring-boot:run
cd billing-service   && mvn spring-boot:run

# 4. La passerelle
cd gateway-service && mvn spring-boot:run

# 5. Le client Angular
cd ecom-frontend && npm install && ng serve
```

> Démarrer **discovery-service en premier** et le laisser s'initialiser avant les autres, sinon les services ne pourront pas s'enregistrer.

### Vérification
- **Dashboard Eureka** : http://localhost:8761 (tous les services doivent apparaître **UP**)
- **Frontend** : http://localhost:4200

---

## Points d'accès

Toutes les requêtes du frontend passent par la **passerelle** (routage dynamique par nom de service) :

| Ressource | URL (via gateway) |
|-----------|-------------------|
| Clients | `GET http://localhost:8888/CUSTOMER-SERVICE/customers` |
| Produits | `GET http://localhost:8888/INVENTORY-SERVICE/products` |
| Factures | `GET http://localhost:8888/BILLING-SERVICE/bills` |
| Facture complète | `GET http://localhost:8888/BILLING-SERVICE/bills/full/{id}` |

**Consoles H2** (dev) : `http://localhost:{port}/h2-console` pour chaque service.

**Config Server** — vérifier la configuration servie :
```
http://localhost:9999/customer-service/dev
http://localhost:9999/customer-service/prod
```

---

## Fonctionnalités clés

- **Découverte de services** (Eureka) — les services se trouvent par nom, sans adresses codées en dur.
- **Configuration centralisée** (Config Server) — configuration par profil (dev/prod), rafraîchissable via `/actuator/refresh`.
- **Passerelle dynamique** — une route par service enregistré, automatiquement.
- **Composition inter-services** (OpenFeign) — le service billing agrège les données Customer et Inventory.
- **Client Angular moderne** — standalone components, signals, lazy loading, navigation master-detail (liste des factures → facture complète).

---

## Client Angular

Le frontend expose trois pages :
- **Customers** — liste des clients
- **Products** — liste des produits
- **Bills** — liste des factures, avec vue détaillée affichant la facture complète (client + produits composés via Feign)

> Le service Gateway est configuré avec **CORS** pour autoriser les requêtes depuis `http://localhost:4200`.

---

## Auteur

**Yousef ELHAID** — GLSID, ENSET Mohammedia
