# Calcetto Cards

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=g-parrone-org_app1-calcetto&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=g-parrone-org_app1-calcetto)

**Breve descrizione**  
Calcetto Cards è un'app per gestire partite di calcetto in cui ogni giocatore viene rappresentato tramite una “carta stile FIFA”. Più giochi e vinci, più aumenta l’overall della tua carta: da Bronze fino ad arrivare a Gold.

Ogni carta ha attributi individuali (Velocità, Dribbling, Tiro, Difesa, Passaggi, Fisico) che determinano l’overall del giocatore.

---

## 📌 Sommario
- [Caratteristiche](#caratteristiche)
- [Tecnologie](#tecnologie)
- [Installazione](#installazione)
- [Uso](#uso)
- [Struttura dati carta giocatore](#struttura-dati-carta-giocatore)
- [Incremento dell’overall](#incremento-delloverall)
- [Test](#test)
- [Contributi](#contributi)
- [Licenza](#licenza)

---

## 🚀 Caratteristiche
- Gestione iscritti alle partite di calcetto
- Visualizzazione “carta giocatore” in stile FIFA
    - Bronze, Silver, Gold in base all’esperienza e vittorie
- Incremento automatico dell’overall della carta
- Statistiche personalizzate per ogni giocatore
- Login/Registrazione utenti con Firebase
- Interfaccia responsive e moderna
- Slider carte giocatore con Swiper
- Supporto social login (Google, Facebook)

---

## 🛠 Tecnologie
- **Frontend:** React 18, Bootstrap 5
- **Gestione stato:** Redux Toolkit
- **Autenticazione e Database:** Firebase Auth & Firestore
- **Storage:** Firebase Storage (foto giocatori)
- **UI:** Swiper (slider carte), Animazioni leggere
- **Testing:** Jest, React Testing Library

---

## 💻 Installazione
1. Clona il repository:
```bash
git clone https://github.com/tuo-utente/calcetto-cards.git
