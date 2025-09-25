
# Focus WTV - Project TODO

## ✅ VOLTOOID

### Admin Systeem - Basis Setup
- [x] Admin layout component gemaakt
- [x] Admin navigatie sidebar
- [x] Admin dashboard pagina
- [x] Admin login systeem met authenticatie
- [x] ProtectedRoute component voor beveiliging
- [x] Logout functionaliteit
- [x] Responsive admin interface
- [x] Duplicate login components opgeruimd

### Admin Pagina's - Basis Structuur
- [x] AdminHomepage - placeholder
- [x] AdminReizen - placeholder  
- [x] AdminEvents - placeholder
- [x] AdminDashboard - overzicht

### Routing & Beveiliging
- [x] Admin routes geïntegreerd in App.jsx
- [x] Login/logout flow werkend
- [x] Automatische redirect naar login bij ongeautoriseerde toegang
- [x] Token-based authenticatie (localStorage)

## 🚧 IN UITVOERING

### Admin Functionaliteiten
- [ ] **AdminHomepage**: Homepage content beheer
  - [ ] Hero sectie editor
  - [ ] Reizen grid beheer
  - [ ] Video sectie beheer
  - [ ] Contact informatie editor

- [ ] **AdminReizen**: Reizen beheer systeem
  - [ ] Lijst van alle reizen
  - [ ] Reis toevoegen/bewerken/verwijderen
  - [ ] Foto upload functionaliteit
  - [ ] Prijs en datum beheer
  - [ ] Status beheer (beschikbaar/vol/geannuleerd)

- [ ] **AdminEvents**: Evenementen beheer
  - [ ] Infoavonden beheer
  - [ ] Event kalender
  - [ ] Aanmeldingen overzicht

## 📋 VOLGENDE STAPPEN

### Prioriteit 1 - Content Management
1. **Data Structuur**
   - [ ] JSON bestanden maken voor reizen data
   - [ ] Centralized data management systeem
   - [ ] Image management systeem

2. **AdminReizen Uitwerken**
   - [ ] Reizen lijst component
   - [ ] Reis detail editor
   - [ ] Foto gallery manager
   - [ ] Route editor

3. **AdminHomepage Uitwerken**
   - [ ] Homepage sections editor
   - [ ] Live preview functionaliteit

### Prioriteit 2 - Geavanceerde Features
1. **File Upload Systeem**
   - [ ] Image upload component
   - [ ] File browser
   - [ ] Image optimization

2. **Form Builders**
   - [ ] Dynamic form creator
   - [ ] Validation systeem
   - [ ] Data export functionaliteit

### Prioriteit 3 - Production Deployment
1. **Vercel Configuratie voor Admin Routes**
   - [ ] `vercel.json` toevoegen voor SPA routing support:
     ```json
     {
       "rewrites": [
         {
           "source": "/(.*)",
           "destination": "/index.html"
         }
       ]
     }
     ```
   - [ ] Admin routes testen op productie
   - [ ] Error handling voor productie omgeving

2. **Beveiliging voor Productie**
   - [ ] Vervang hardcoded credentials door echte API
   - [ ] JWT tokens implementeren
   - [ ] Session management verbeteren
   - [ ] Rate limiting voor login attempts

3. **Performance Optimalisaties**
   - [ ] Lazy loading voor admin components
   - [ ] Image optimization
   - [ ] Caching strategie

## 🚨 BELANGRIJK - PRODUCTIE DEPLOYMENT

**⚠️ Admin panel is nog NIET klaar voor productie:**
- Admin routes werken lokaal maar niet op Vercel (SPA routing issue)
- Hardcoded credentials zijn tijdelijk
- Geen echte data management nog
- Placeholder functionaliteiten

**🎯 Voor productie deployment:**
1. Eerst alle admin functionaliteiten afwerken
2. Dan `vercel.json` toevoegen voor routing
3. Echte authenticatie implementeren
4. Testen op staging omgeving
5. Dan pas live zetten

**🔒 Huidige Login Credentials (development only):**
- Username: `admin`
- Password: `focuswtv2025`

## 🎯 LANGE TERMIJN DOELEN

### Backend Integratie
- [ ] API endpoints voor data management
- [ ] Database integratie
- [ ] User management systeem
- [ ] Backup & restore functionaliteit

### Advanced Features
- [ ] Multi-language support
- [ ] SEO management tools
- [ ] Analytics dashboard
- [ ] Email marketing integratie

## 📝 NOTITIES

### Tech Stack
- **Frontend**: React + Vite
- **Styling**: Tailwind CSS + Bootstrap
- **Routing**: React Router DOM
- **Animations**: GSAP
- **State**: React useState/useEffect
- **Auth**: localStorage (tijdelijk)

### Bestandsstructuur Admin


### Volgende Sprint Focus
1. **AdminReizen** volledig uitwerken
2. **Data management** systeem opzetten
3. **File upload** functionaliteit toevoegen
4. **Productie deployment** voorbereiden

---

### Volgende Sprint Focus
1. **AdminReizen** volledig uitwerken
2. **Data management** systeem opzetten
3. **File upload** functionaliteit toevoegen
4. **Productie deployment** voorbereiden

---
*Laatste update: [25/09/2025]*
*Status: Admin basis systeem voltooid (development), productie deployment uitgesteld tot admin functionaliteiten compleet zijn*