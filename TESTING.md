# 🧪 Testing Guide - CSIA Success Criteria

This testing guide maps directly to the success criteria defined in your CSIA Criterion A.

## Success Criteria Checklist

### ✅ SC1: Schedule Generation Performance
**Requirement:** Generate 7-day schedule in less than 5 seconds

**Test Steps:**
1. Add 5 homework tasks with different deadlines
2. Add 3 exams with different dates
3. Click "Generate Schedule" button
4. Observe the generation time shown in toast notification

**Expected Result:**
- Toast message shows: "Schedule generated in X.XXs"
- X.XX should be < 5.00 seconds

**Evidence for CSIA:**
- Screenshot of toast notification showing time
- Video recording of generation process

---

### ✅ SC2: Homework Deadline Compliance
**Requirement:** Every homework task scheduled before its deadline

**Test Steps:**

**Test Case 1: Single Task**
```
Task: Math Assignment
Subject: Mathematics
Deadline: 3 days from today
Duration: 60 minutes
```
- Generate schedule
- Verify task appears before deadline date

**Test Case 2: Multiple Tasks**
```
Task 1: Physics Lab Report
Deadline: Tomorrow
Duration: 90 minutes

Task 2: English Essay
Deadline: 5 days from today
Duration: 120 minutes

Task 3: Chemistry Homework
Deadline: 2 days from today
Duration: 45 minutes
```
- Generate schedule
- Click each day in calendar
- Verify all tasks scheduled before their deadlines

**Expected Result:**
- No task appears on or after its deadline date
- Tasks appear in order of urgency (closest deadlines first)

**Evidence for CSIA:**
- Screenshot of weekly calendar showing all tasks
- Screenshot of daily view for each scheduled task

---

### ✅ SC3: Exam Revision Distribution
**Requirement:** At least 80% of exam revision time distributed across more than 3 days

**Test Steps:**

**Test Case 1: Single Exam**
```
Exam: Physics Final
Date: 7 days from today
Total Revision Time: 240 minutes (4 hours)
```
- Generate schedule
- Count revision sessions
- Calculate distribution

**Expected Result:**
- Minimum 3 days should have revision sessions
- Total revision time: 240 minutes
- 80% = 192 minutes should be distributed
- Example distribution:
  - Day 1: 60 minutes
  - Day 2: 60 minutes
  - Day 3: 60 minutes
  - Day 4: 60 minutes
  Total = 240 minutes across 4 days ✅

**Test Case 2: Multiple Exams**
```
Exam 1: Mathematics
Date: 5 days from today
Revision: 180 minutes

Exam 2: Chemistry
Date: 6 days from today
Revision: 120 minutes
```

**Verification Method:**
1. Go to Weekly Calendar
2. Count green boxes (exam revision sessions)
3. Note which days have revision
4. Check daily view for exact minutes

**Evidence for CSIA:**
- Table showing revision distribution
- Screenshots of weekly calendar
- Calculation showing 80%+ distribution

---

### ✅ SC4: Missed Session Rescheduling
**Requirement:** When task marked missed, reallocate within next 3 days

**Test Steps:**

**Setup:**
1. Generate schedule with at least 5 sessions
2. Select today's date in calendar

**Test Case 1: Mark Single Session Missed**
1. Click on a session
2. Click "Mark Missed" button
3. Wait for reschedule (automatic)
4. Check next 3 days in calendar

**Expected Result:**
- Original session status changes to "Missed" (red X icon)
- New session appears within next 3 days
- New session marked as "Rescheduled" (orange clock icon)
- Same duration and subject maintained

**Test Case 2: Multiple Missed Sessions**
1. Mark 3 different sessions as missed
2. Verify each reschedules within 3 days
3. Check daily budget not exceeded

**Evidence for CSIA:**
- Before screenshot (session planned)
- After screenshot (session missed + rescheduled)
- Screenshot of rescheduled session in next 3 days

---

### ✅ SC5: Multi-Browser Compatibility
**Requirement:** Application works without errors on Chrome and Edge

**Test Steps:**

**Chrome Testing:**
1. Open app in Chrome
2. Complete full user journey:
   - Register account
   - Add task
   - Add exam
   - Generate schedule
   - Mark session complete
   - Mark session missed
3. Open browser console (F12)
4. Check for errors (should be none)

**Edge Testing:**
1. Repeat all steps in Microsoft Edge
2. Check console for errors

**Expected Result:**
- All features work identically in both browsers
- No JavaScript errors in console
- UI renders correctly
- Authentication works
- Database operations succeed

**Evidence for CSIA:**
- Screenshot of app running in Chrome (with browser name visible)
- Screenshot of app running in Edge (with browser name visible)
- Screenshot of console showing no errors

---

### ✅ SC6: Data Persistence
**Requirement:** Data persists across sessions and devices

**Test Steps:**

**Test Case 1: Same Device**
1. Login and add 2 tasks, 1 exam
2. Generate schedule
3. Logout
4. Close browser completely
5. Reopen browser
6. Login with same account
7. Verify all data is present

**Test Case 2: Different Device**
1. Login on Computer 1
2. Add tasks and generate schedule
3. Logout
4. Login on Computer 2 (or different browser)
5. Verify same data appears

**Test Case 3: Session Persistence**
1. Mark 2 sessions as complete
2. Logout and login again
3. Verify sessions still marked complete

**Expected Result:**
- All tasks persist
- All exams persist
- Schedule persists
- Session statuses persist
- Data syncs across devices instantly

**Evidence for CSIA:**
- Screenshot from Device 1 showing data
- Screenshot from Device 2 showing same data
- Video showing logout/login with data persistence

---

## Additional Testing

### Input Validation Testing

**Test Invalid Inputs:**

**Test 1: Past Deadline**
```
Input:
- Task Name: Test Task
- Deadline: Yesterday's date
- Duration: 60 minutes

Expected: Error message "Deadline cannot be in the past"
```

**Test 2: Negative Duration**
```
Input:
- Duration: -30 minutes

Expected: Minimum value enforced (browser prevents)
```

**Test 3: Missing Required Fields**
```
Input:
- Task Name: (empty)
- Subject: (not selected)

Expected: Error messages for each empty field
```

**Test 4: Excessive Duration**
```
Input:
- Duration: 600 minutes (10 hours)

Expected: Error "Cannot exceed 8 hours (480 minutes)"
```

---

### Daily Budget Testing

**Test Daily Time Limits:**

**Test Case:**
1. Set daily budget to 480 minutes (8 hours)
2. Add tasks totaling 10 hours
3. Generate schedule

**Expected Result:**
- No single day exceeds 480 minutes
- Tasks distributed across multiple days
- Weekly calendar shows balanced load

**Verification:**
1. Click each day
2. Check "Total Time" in daily view
3. Confirm ≤ 480 minutes per day

---

### Performance Testing

**Schedule Generation with Large Dataset:**

**Test Case:**
```
Add:
- 10 homework tasks
- 5 exams
Total: 15 items to schedule
```

**Expected Result:**
- Still generates in <5 seconds
- No browser lag
- All items successfully scheduled

---

## Testing Evidence Template

For your CSIA documentation, collect:

### 1. Screenshots Required

```
✅ Login page
✅ Dashboard with stats
✅ Weekly calendar (populated)
✅ Daily task list
✅ Task form (with data)
✅ Exam form (with data)
✅ Toast notification (generation time)
✅ Session marked complete (green check)
✅ Session marked missed (red X)
✅ Rescheduled session (orange clock)
✅ Chrome browser (with URL visible)
✅ Edge browser (with URL visible)
✅ Console showing no errors
```

### 2. Test Results Table

Create a table like this for your CSIA:

| Test ID | Test Case | Expected Result | Actual Result | Status | Evidence |
|---------|-----------|----------------|---------------|--------|----------|
| SC1 | Generate schedule | <5 seconds | 2.34 seconds | ✅ Pass | Screenshot 1 |
| SC2 | Homework deadlines | Before deadline | All before | ✅ Pass | Screenshot 2-5 |
| SC3 | Exam distribution | 80% over 3+ days | 100% over 4 days | ✅ Pass | Screenshot 6 |
| SC4 | Missed rescheduling | Within 3 days | Within 2 days | ✅ Pass | Screenshot 7-8 |
| SC5 | Chrome compatibility | No errors | No errors | ✅ Pass | Screenshot 9 |
| SC5 | Edge compatibility | No errors | No errors | ✅ Pass | Screenshot 10 |
| SC6 | Data persistence | Data saved | Data saved | ✅ Pass | Screenshot 11-12 |

### 3. User Feedback Testing

**Client Testing Checklist:**
Give this to your client (Viet Dang) to test:

```
□ Can you create an account?
□ Can you add a homework task?
□ Can you add an exam?
□ Can you generate a schedule?
□ Is the schedule easy to understand?
□ Can you mark sessions complete/missed?
□ Does the calendar layout make sense?
□ Rate clarity: ___ / 5
□ Rate usefulness: ___ / 5
□ Any issues encountered: ___________
```

**Success Requirement:** Client rating > 3.5/5

---

## Automated Testing Script (Optional)

For quick verification, you can use browser console:

```javascript
// Quick test script (paste in browser console)
async function quickTest() {
  console.log('🧪 Running Quick Tests...');
  
  // Test 1: Check Firebase connection
  console.log('Testing Firebase...');
  console.log(window.firebase ? '✅ Firebase loaded' : '❌ Firebase missing');
  
  // Test 2: Check authentication
  console.log('Testing Auth...');
  const user = firebase.auth().currentUser;
  console.log(user ? '✅ User logged in' : '⚠️ No user');
  
  // Test 3: Check Firestore
  console.log('Testing Firestore...');
  try {
    await firebase.firestore().collection('tasks').limit(1).get();
    console.log('✅ Firestore accessible');
  } catch (e) {
    console.log('❌ Firestore error:', e);
  }
  
  console.log('✅ Quick test complete!');
}

quickTest();
```

---

## Final Checklist

Before submitting your CSIA:

- ✅ All 6 success criteria tested and documented
- ✅ Screenshots collected for each test
- ✅ Client feedback form completed
- ✅ Test results table filled
- ✅ Video demonstration recorded (optional but recommended)
- ✅ No critical bugs remaining
- ✅ Application deployed and accessible online

---

**Pro Tips:**

1. **Test Incrementally**: Don't wait until the end - test each feature as you build
2. **Record Everything**: Take screenshots immediately after each test
3. **Use Real Data**: Test with realistic homework and exam scenarios
4. **Different Scenarios**: Test best case, worst case, and edge cases
5. **Get Peer Feedback**: Have classmates test before final submission

Good luck with your testing! 🎯