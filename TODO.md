
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

### Prioriteit 3 - Optimalisaties
1. **Beveiliging**
   - [ ] Vervang hardcoded credentials door echte API
   - [ ] JWT tokens implementeren
   - [ ] Session management verbeteren

2. **User Experience**
   - [ ] Loading states verbeteren
   - [ ] Error handling uitbreiden
   - [ ] Success notifications

3. **Performance**
   - [ ] Lazy loading voor admin components
   - [ ] Image optimization
   - [ ] Caching strategie

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

### Deployment
- [ ] Production build optimalisatie
- [ ] CI/CD pipeline
- [ ] Monitoring & logging
- [ ] Security audit

## 📝 NOTITIES

### Huidige Login Credentials
- Username: `admin`
- Password: `focuswtv2025`

### Tech Stack
- **Frontend**: React + Vite
- **Styling**: Tailwind CSS + Bootstrap
- **Routing**: React Router DOM
- **Animations**: GSAP
- **State**: React useState/useEffect
- **Auth**: localStorage (tijdelijk)

### Bestandsstructuur Admin
