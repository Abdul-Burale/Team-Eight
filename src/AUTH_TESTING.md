# Authentication Testing Guide

## Overview
The authentication system has been updated with improved error handling and logging to help diagnose sign-in issues.

## What Was Fixed

### 1. Enhanced Error Logging
- All authentication operations now log detailed information to the browser console
- Check the browser console (F12 → Console tab) to see authentication flow

### 2. Fallback User Profile
- If the server profile fetch fails, the system now uses Supabase auth metadata as a fallback
- Users can still log in even if there's a temporary server issue

### 3. Automatic Redirect After Login
- Users are now automatically redirected to the home page after successful login
- Fixed the issue where users would stay on the login page

### 4. Better Session Management
- Improved session checking on app load
- Better handling of auth state changes

## How to Test Authentication

### Step 1: Sign Up a New User

1. Click "Sign up" from the login page
2. Fill in the form:
   - **Full Name**: Test User
   - **Email**: test@example.com (use any valid email format)
   - **Password**: password123 (minimum 8 characters)
   - **Confirm Password**: password123
   - **User Type**: Select Tenant, Landlord, or Buyer
   - Check "I agree to the Terms and Conditions"
3. Click "Create Account"
4. You should see a success message
5. Click "Go to Login"

### Step 2: Sign In

1. Enter the email and password you just created:
   - **Email**: test@example.com
   - **Password**: password123
2. Click "Sign In"
3. Check the browser console (F12) for log messages
4. You should be redirected to the home page
5. The header should show your name and a logout option

### Step 3: Test Protected Pages

Once logged in, you can access:
- **Profile** - View and edit your profile
- **Smart Alerts** - Manage property alerts  
- **Legal Services** - Access legal engagement features

If you try to access these pages without logging in, you'll be redirected to the login page.

## Debugging Sign-In Issues

### Open Browser Console
1. Press F12 (or right-click → Inspect)
2. Go to the Console tab
3. Try to sign in
4. Look for these log messages:

**Successful Sign-In:**
```
Attempting to sign in with email: test@example.com
Sign in successful, session created
User profile fetched successfully: {id: "...", email: "...", name: "...", userType: "..."}
User logged in, redirecting to home
```

**If Profile Fetch Fails (but still works):**
```
Attempting to sign in with email: test@example.com
Sign in successful, session created
Error fetching user profile: 401 Unauthorized
Using fallback user profile: {id: "...", email: "...", name: "...", userType: "..."}
User logged in, redirecting to home
```

**Sign-In Error:**
```
Attempting to sign in with email: test@example.com
Supabase sign in error: Invalid login credentials
```

### Common Issues and Solutions

#### Issue: "Invalid login credentials"
**Cause**: Wrong email or password, or user doesn't exist
**Solution**: 
1. Make sure you signed up first
2. Check email and password spelling
3. Try signing up with a new account

#### Issue: User stays on login page after sign-in
**Cause**: User profile not being set
**Solution**: 
1. Check console for error messages
2. The system should now use fallback profile
3. If issue persists, check Network tab for failed requests

#### Issue: "Failed to create session"
**Cause**: Supabase authentication issue
**Solution**:
1. Check if SUPABASE_URL and SUPABASE_ANON_KEY are set correctly
2. Verify network connectivity
3. Check browser console for more details

#### Issue: Redirected back to login when accessing protected pages
**Cause**: User is not authenticated
**Solution**:
1. Make sure you're logged in
2. Check if session is still active (may have expired)
3. Try logging in again

### Check Network Requests

1. Open DevTools (F12)
2. Go to Network tab
3. Filter by "Fetch/XHR"
4. Try to sign in
5. Look for these requests:

**Sign In Flow:**
```
POST /auth/v1/token
Status: 200 OK
Response: { access_token: "...", ... }
```

**Profile Fetch:**
```
GET /functions/v1/make-server-d12e8f4b/user/profile
Status: 200 OK
Response: { id: "...", email: "...", name: "...", userType: "..." }
```

### Test Multiple User Types

Create accounts for each user type to test role-specific features:

**Tenant Account:**
- Focus on rental properties
- View rental application flow
- Access tenant dashboard features

**Landlord Account:**
- Manage property listings
- View landlord dashboard
- Track rental applications

**Buyer Account:**
- Focus on properties for sale
- Use affordability calculator
- Access buyer dashboard features

## Server Endpoints

The authentication system uses these server endpoints:

### POST `/make-server-d12e8f4b/auth/signup`
Creates a new user account
- **Body**: `{ email, password, name, userType }`
- **Response**: `{ success: true, message: "..." }`

### GET `/make-server-d12e8f4b/user/profile`
Fetches user profile
- **Headers**: `Authorization: Bearer {access_token}`
- **Response**: `{ id, email, name, userType }`

### PUT `/make-server-d12e8f4b/user/profile`
Updates user profile
- **Headers**: `Authorization: Bearer {access_token}`
- **Body**: Profile updates
- **Response**: Updated profile

## Testing Checklist

- [ ] Sign up with new account
- [ ] Receive success message
- [ ] Sign in with created account
- [ ] Redirected to home page after login
- [ ] Header shows user name
- [ ] Can access protected pages (Profile, Alerts, Legal)
- [ ] Can sign out
- [ ] Redirected to login when accessing protected pages while logged out
- [ ] Can sign back in
- [ ] Session persists on page reload

## Note on Email Verification

The system currently has `email_confirm: true` set in the signup endpoint, which means:
- Email addresses are automatically confirmed
- No email verification link is sent
- Users can log in immediately after signup

This is for development/testing purposes. In production, you would:
1. Configure an email server in Supabase
2. Remove `email_confirm: true`
3. Users would receive verification emails
4. They must click the link before they can sign in

## Browser Console Commands for Testing

You can also test authentication directly in the console:

```javascript
// Check current auth state
const { data: { session } } = await window.supabase.auth.getSession();
console.log('Current session:', session);

// Check user
const { data: { user } } = await window.supabase.auth.getUser();
console.log('Current user:', user);

// Sign out
await window.supabase.auth.signOut();
console.log('Signed out');
```

Note: You'll need to access the supabase client from React DevTools or add it to window for this to work.

## Still Having Issues?

If you're still experiencing sign-in problems:

1. **Check console logs** - Look for specific error messages
2. **Try incognito mode** - Rules out cache/cookie issues  
3. **Clear browser data** - Clear cache and cookies
4. **Try different browser** - Tests for browser-specific issues
5. **Check server logs** - If you have access to Supabase logs
6. **Create new test account** - Use a different email address

## Summary of Changes

The authentication system now includes:
- ✅ Detailed console logging
- ✅ Fallback user profile mechanism
- ✅ Automatic redirect after login
- ✅ Better error messages
- ✅ Improved session handling
- ✅ Protected route management

These improvements should make sign-in work reliably and provide clear debugging information when issues occur.
