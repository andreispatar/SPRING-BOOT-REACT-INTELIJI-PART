# Billing Software

Aplicatie full-stack pentru facturare/retail, cu front-end React si back-end Spring Boot. Integreaza autentificare JWT, gestionare produse, comenzi si plati online (Razorpay), plus stocare fisiere pe AWS S3.

## Date de conectare (demo)
- Admin: `andrei2@example.com` / `654321`
- User: `andreiuser@example.com` / `654321`

## Tehnologii folosite
- Front-end: React 19 (Vite), React Router, Axios, Bootstrap 5 + Bootstrap Icons, React Hot Toast.
- Back-end: Java 21, Spring Boot 4 (Web MVC, Security, Data JPA), JWT (jjwt), Lombok.
- Baza de date: MySQL (gestionata si inspectata in MySQL Workbench).
- Cloud/servicii: AWS S3 (upload fisiere), Razorpay (intentii de plata).
- Tooling & testare: Maven, Node/NPM, Postman pentru exercitii de testare a API-urilor.

## Structura pe scurt
- `src/main/java/...`: codul Spring Boot (configurari de securitate/JWT, controllere pentru autentificare, utilizatori, categorii, produse, comenzi, plati, upload fisier).
- `src/main/resources/application.properties`: configurari DB, JWT, AWS S3, chei Razorpay (inlocuieste cu valorile tale in productie).
- `client/`: aplicatia React (pagini pentru login, dashboard, gestiune utilizatori, categorii, produse, cos/comenzi, istoric, ecrane de plata).

## Pornire back-end (Spring Boot)
1) Prerechizite: JDK 21, Maven, MySQL in rulare; actualizeaza `spring.datasource.*` si cheile AWS/Razorpay in `src/main/resources/application.properties` dupa nevoie.
2) Din radacina proiect:
```bash
mvn clean install
mvn spring-boot:run
```
3) Serverul porneste pe `http://localhost:8080` (endpoints sub contextul configurat in app properties).

## Pornire front-end (React + Vite)
1) Prerechizite: Node.js (>=18 recomandat).
2) Din `client/`:
```bash
npm install
npm run dev -- --host
```
3) Acceseaza URL-ul indicat in terminal (implicit `http://localhost:5173`).

## Note despre plati si storage
- Razorpay: folosim SDK-ul oficial (`com.razorpay:razorpay-java`) pentru generarea comenzilor de plata; seteaza `razorpay.key.id` si `razorpay.key.secret` cu chei proprii.
- AWS S3: upload/servire fisiere prin `software.amazon.awssdk:s3`; configureaza `aws.access.key`, `aws.secret.key`, `aws.region`, `aws.bucket.name`.

## Testare API
- Foloseste Postman pentru a exercita flow-urile de login (JWT), gestionare utilizatori/categorii/produse/comenzi si verificare plati.
- Verifica raspunsurile si token-urile JWT returnate de `AuthController`, apoi trimite-le in headerul `Authorization: Bearer <token>` la rutele protejate.

## Functionalitati cheie
- Autentificare/roluri: utilizatori cu rol admin/user; admin poate gestiona utilizatori, categorii, produse; user poate explora, adauga in cos si plati.
- Gestiune catalog: CRUD pentru categorii si produse, cautare si filtrare.
- Comenzi si cos: creare/actualizare cos, generare comenzi, afisare istoric.
- Plati: integrare Razorpay pentru intentii de plata (server) + handling client.
- Upload fisiere: upload imagini catre AWS S3 (serviciul de upload).

## Note finale
- Inlocuieste toate cheile sensibile din `application.properties` cu variabile de mediu in productie.
- Pentru inspectarea bazei de date si migrare structura foloseste MySQL Workbench; pentru testare rapida a endpoint-urilor, pastreaza colectiile Postman sincronizate cu versiunile curente ale API-ului.
