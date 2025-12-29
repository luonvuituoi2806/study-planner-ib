# 🚀 Complete Deployment Guide

## Step 1: Firebase Setup (15 minutes)

### 1.1 Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Name: "study-planner-ib" (or your choice)
4. Disable Google Analytics (optional)
5. Click "Create project"

### 1.2 Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click "Get started"
3. Enable **Email/Password**:
   - Click "Email/Password"
   - Toggle "Enable"
   - Click "Save"
4. Enable **Google Sign-In**:
   - Click "Google"
   - Toggle "Enable"
   - Select support email
   - Click "Save"

### 1.3 Create Firestore Database

1. Go to **Firestore Database**
2. Click "Create database"
3. Choose **Start in production mode**
4. Select location: asia-southeast1 (Singapore) or nearest
5. Click "Enable"

### 1.4 Configure Firestore Rules

1. Go to **Firestore Database → Rules**
2. Replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function
    function isOwner() {
      return request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // Tasks
    match /tasks/{taskId} {
      allow read, update, delete: if isOwner();
      allow create: if request.auth != null;
    }
    
    // Exams
    match /exams/{examId} {
      allow read, update, delete: if isOwner();
      allow create: if request.auth != null;
    }
    
    // Sessions
    match /sessions/{sessionId} {
      allow read, update, delete: if isOwner();
      allow create: if request.auth != null;
    }
    
    // Schedule Logs
    match /scheduleLogs/{logId} {
      allow read, delete: if isOwner();
      allow create: if request.auth != null;
    }
  }
}
```

3. Click "Publish"

### 1.5 Get Firebase Configuration

1. Go to **Project Settings** (gear icon)
2. Scroll to "Your apps"
3. Click Web icon (</>) 
4. Register app: "Study Planner Web"
5. Copy the config object:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "study-planner-xxx.firebaseapp.com",
  projectId: "study-planner-xxx",
  storageBucket: "study-planner-xxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc..."
};
```

## Step 2: Local Development Setup

### 2.1 Clone and Install

```bash
# Navigate to your project folder
cd study-planner

# Install dependencies
npm install
```

### 2.2 Configure Environment Variables

Create `.env` file in root:

```env
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=study-planner-xxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=study-planner-xxx
VITE_FIREBASE_STORAGE_BUCKET=study-planner-xxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc...
VITE_APP_NAME=Study Planner
VITE_MAX_DAILY_STUDY_HOURS=8
```

### 2.3 Test Locally

```bash
npm run dev
```

Visit: http://localhost:5173

Test:
- ✅ Create account
- ✅ Login
- ✅ Add task
- ✅ Add exam
- ✅ Generate schedule
- ✅ Mark sessions complete/missed

## Step 3: Deploy to Vercel

### Option A: Vercel Website (Recommended for beginners)

#### 3.1 Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/study-planner.git
git push -u origin main
```

#### 3.2 Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign up" (use GitHub)
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

6. Add Environment Variables (click "Environment Variables"):
   ```
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   ```

7. Click "Deploy"

#### 3.3 Update Firebase Authorized Domains

1. Go to Firebase Console → Authentication → Settings
2. Add your Vercel domain: `your-app.vercel.app`
3. Save

### Option B: Vercel CLI (For advanced users)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Set environment variables
vercel env add VITE_FIREBASE_API_KEY
vercel env add VITE_FIREBASE_AUTH_DOMAIN
# ... add all variables

# Deploy to production
vercel --prod
```

## Step 4: Post-Deployment Setup

### 4.1 Configure Custom Domain (Optional)

In Vercel Dashboard:
1. Go to your project
2. Settings → Domains
3. Add your domain
4. Update DNS records as instructed

### 4.2 Test Production App

Visit your deployed URL and test:

1. **Authentication**
   - Register new account
   - Login with email
   - Login with Google
   - Logout

2. **Task Management**
   - Add task with valid data
   - Try invalid inputs (past deadline, negative time)
   - Edit task
   - Delete task

3. **Exam Management**
   - Add exam
   - Set revision time
   - Delete exam

4. **Scheduling**
   - Generate schedule
   - Verify tasks appear before deadlines
   - Check exam distribution (3+ days)
   - Time generation (<5s)

5. **Session Management**
   - Mark session complete
   - Mark session missed
   - Verify rescheduling

6. **Cross-device Sync**
   - Login from different browser
   - Verify data syncs

## Step 5: Monitoring & Maintenance

### 5.1 Monitor Firebase Usage

Firebase Console → Usage:
- Check authentication activity
- Monitor Firestore reads/writes
- Watch for quota limits

### 5.2 Monitor Vercel Deployments

Vercel Dashboard:
- Check build logs
- Monitor function executions
- View analytics

### 5.3 Set Up Alerts (Optional)

1. **Firebase Alerts**
   - Console → Project Settings → Monitoring
   - Set budget alerts

2. **Vercel Alerts**
   - Project Settings → Notifications
   - Enable deployment notifications

## Troubleshooting

### Issue: Build fails on Vercel

**Solution:**
```bash
# Ensure package.json has correct scripts
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

### Issue: Firebase auth doesn't work on Vercel

**Solution:**
1. Check authorized domains in Firebase
2. Verify environment variables in Vercel
3. Ensure no localhost URLs in production

### Issue: Firestore permission denied

**Solution:**
1. Check Firestore rules
2. Verify user is authenticated
3. Check userId matches in documents

### Issue: Schedule generation is slow

**Solution:**
1. Reduce number of tasks/exams for testing
2. Check network connection
3. Monitor Firebase quotas

## Security Checklist

- ✅ Environment variables not committed to Git
- ✅ Firestore rules properly configured
- ✅ Firebase domains authorized
- ✅ HTTPS enabled (automatic on Vercel)
- ✅ API keys restricted (Firebase Console)

## Performance Optimization

### Enable Firebase Caching

In `firebase.js`:
```javascript
import { initializeFirestore, persistentLocalCache } from 'firebase/firestore';

const db = initializeFirestore(app, {
  localCache: persistentLocalCache()
});
```

### Optimize Build Size

Already configured in `vite.config.js` with code splitting.

## Cost Estimates

### Firebase Free Tier (Spark Plan)
- Auth: 10,000 verifications/month ✅
- Firestore: 50,000 reads, 20,000 writes/day ✅
- **Good for:** 100-500 active users

### Vercel Free Tier (Hobby)
- 100 GB bandwidth/month ✅
- Unlimited deployments ✅
- **Good for:** Personal projects, portfolios

**Total Cost: $0/month for moderate usage**

## Next Steps

1. ✅ Test all features thoroughly
2. ✅ Gather feedback from classmates
3. ✅ Document any issues
4. ✅ Prepare for CSIA evaluation
5. ✅ Create demo video

## Support

For issues:
1. Check Firebase Console logs
2. Check Vercel deployment logs
3. Review browser console for errors
4. Test with different browsers (Chrome, Edge)

## Success Criteria Verification

Your deployment is successful if:

- ✅ Schedule generates in <5 seconds
- ✅ Tasks scheduled before deadlines
- ✅ Exams distributed 3+ days
- ✅ Missed sessions reschedule
- ✅ Works on Chrome and Edge
- ✅ Data persists across sessions
- ✅ Multi-device sync works

---

**Your app is now live! 🎉**

Share your URL: `https://your-app.vercel.app`