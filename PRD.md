# Travel Website CMS - Product Requirements Document

## Project Overview
**Project Name:** Focus WTV Travel Website with Admin CMS  
**Current Status:** Backend initialization complete ✅  
**Production URL:** https://reizen.focus-wtv.be  
**Admin Panel URL:** https://reizen.focus-wtv.be/admin (future)  

**📋 For detailed progress tracking, see [TODO.md](./TODO.md)**

## Current Architecture
- **Frontend:** React + Vite (existing, hardcoded content) - **IN ROOT FOLDER**
- **Backend:** Node.js + Express + Firebase (in development) - **IN /backend FOLDER**
- **Database:** Firebase Firestore ✅
- **File Storage:** Firebase Storage (to be integrated)
- **External API:** Craft CMS GraphQL (videos only)

## Project Goals
Transform the hardcoded React travel website into a dynamic CMS-driven site where administrators can:
1. Manage travel packages (reizen) content
2. Upload and manage images via Firebase
3. Edit homepage content
4. Manage info events
5. Pull videos from existing Craft CMS

## Technical Stack

### Backend Stack ✅
- **Runtime:** Node.js ✅
- **Framework:** Express.js ✅
- **Database:** Firebase Firestore ✅
- **Authentication:** Firebase Auth (planned)
- **File Storage:** Firebase Storage (planned)
- **External API:** Axios for Craft CMS integration (planned)

### Firestore Collections Structure
```javascript
Collections:
- reizen (travel packages) - planned
- homepage_content (homepage text/content) - planned
- info_events (info evening events) - planned
- admin_users (admin authentication) - planned
