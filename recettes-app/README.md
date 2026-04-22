# Recettes Maison 🍽

Plan de repas hebdomadaire + liste de courses intelligente.

## Déploiement sur Vercel (5 min)

### 1. Créer un compte Vercel
→ https://vercel.com (gratuit, connexion avec GitHub ou email)

### 2. Déployer le projet

**Option A — Glisser-déposer (le plus simple)**
1. Va sur https://vercel.com/new
2. Clique sur "Browse" et sélectionne ce dossier `recettes-app`
3. Vercel détecte automatiquement Vite/React
4. Clique "Deploy"

**Option B — Via GitHub**
1. Crée un repo GitHub et push ce dossier
2. Connecte le repo sur vercel.com/new
3. Deploy

### 3. Ajouter ta clé API Anthropic
1. Dans ton projet Vercel → Settings → Environment Variables
2. Ajoute : `VITE_ANTHROPIC_API_KEY` = ta clé (commence par `sk-ant-...`)
3. Redéploie (Deployments → Redeploy)

Ta clé API : https://console.anthropic.com/settings/keys

### 4. Installer sur iPhone
1. Ouvre l'URL Vercel dans Safari
2. Appuie sur le bouton Partager (carré avec flèche)
3. "Sur l'écran d'accueil"
4. L'icône apparaît comme une vraie appli

### 5. Installer sur Android
1. Ouvre l'URL dans Chrome
2. Menu (3 points) → "Ajouter à l'écran d'accueil"

## Développement local

```bash
npm install
cp .env.example .env.local
# Ajoute ta clé API dans .env.local
npm run dev
```

## Notes
- Le plan de la semaine et la liste de courses sont sauvegardés automatiquement (localStorage)
- La liste de courses est générée via l'API Anthropic Claude
