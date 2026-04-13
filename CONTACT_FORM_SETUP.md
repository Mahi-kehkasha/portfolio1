# Contact Form Email Setup Guide

## Overview
Your portfolio contact form is now functional and will send emails to your Gmail inbox when users submit the form.

## ⚠️ IMPORTANT: Required Setup Steps

### Step 1: Get Gmail App Password

**You MUST create a Gmail App Password** (NOT your regular Gmail password) for this to work.

1. Go to your Google Account: https://myaccount.google.com/
2. Click on "Security" in the left sidebar
3. Enable "2-Step Verification" if not already enabled
4. Once 2FA is enabled, scroll down to find "App passwords"
5. Click "App passwords"
6. Select "Mail" for app and "Other" for device
7. Name it "Portfolio Contact Form"
8. Click "Generate"
9. **Copy the 16-character password** (e.g., `abcd efgh ijkl mnop`)

### Step 2: Update Environment Variables

Open `/app/backend/.env` and update these values:

```env
EMAIL_USER="your-actual-email@gmail.com"
EMAIL_PASS="abcd efgh ijkl mnop"  # Your 16-character App Password
```

**Example:**
```env
EMAIL_USER="maheen.kehkasha@gmail.com"
EMAIL_PASS="abcd efgh ijkl mnop"
```

### Step 3: Restart Backend

After updating the .env file, restart the backend:
```bash
sudo supervisorctl restart backend
```

---

## How It Works

### Frontend (React)
1. User fills out the contact form (Name, Email, Message)
2. On submit, form data is sent to `/api/contact` endpoint
3. Shows success/error message based on response

### Backend (FastAPI)
1. Receives POST request at `/api/contact`
2. Validates email format using Pydantic
3. Creates formatted HTML email
4. Sends email via Gmail SMTP
5. Returns success/error response

### Email Delivery
- **SMTP Host**: smtp.gmail.com
- **Port**: 465 (SSL)
- **Authentication**: Gmail App Password
- **Recipient**: Your Gmail address (EMAIL_USER)
- **Reply-To**: User's email (from form)

---

## Email Format

When someone submits the form, you'll receive an email like this:

**Subject:** New Portfolio Contact Form Submission

**Body:**
```
New Portfolio Contact Form Submission

Name: John Doe
Email: john@example.com

Message:
Hi Maheen! I'm interested in discussing a project...

---
This email was sent from your portfolio contact form
```

The email includes:
- Sender's name
- Sender's email (clickable to reply)
- Their message
- Professional HTML formatting

---

## Testing the Form

### Local Testing (Development)

1. Make sure EMAIL_USER and EMAIL_PASS are set in `/app/backend/.env`
2. Restart backend: `sudo supervisorctl restart backend`
3. Open your portfolio: http://localhost:3000
4. Scroll to Contact section
5. Fill out the form with test data
6. Click "Send Message"
7. Check your Gmail inbox

### Production Testing (After Deployment)

1. Ensure EMAIL_USER and EMAIL_PASS are set in Netlify/Render environment variables
2. Visit your deployed site
3. Submit the contact form
4. Check your Gmail inbox

---

## Troubleshooting

### Error: "Email authentication failed"
**Cause:** Wrong App Password or not using App Password
**Solution:** 
- Make sure you're using Gmail App Password (16 characters)
- NOT your regular Gmail password
- Recreate the App Password if needed

### Error: "Email configuration is missing"
**Cause:** EMAIL_USER or EMAIL_PASS not set
**Solution:** 
- Check `/app/backend/.env` file
- Ensure both variables are set
- Restart backend after changes

### Error: "Failed to send email"
**Cause:** Network/SMTP issues
**Solution:**
- Check if port 465 is open (usually is)
- Verify internet connection
- Check Gmail SMTP status

### Not Receiving Emails
**Check:**
1. Spam folder in Gmail
2. Backend logs: `tail -50 /var/log/supervisor/backend.err.log`
3. Browser console for errors
4. Verify EMAIL_USER matches your Gmail

---

## Deployment Configuration

### For Netlify (Frontend)
No additional configuration needed. The frontend uses `REACT_APP_BACKEND_URL` which is already configured.

### For Render/Railway (Backend)

Add these environment variables in your hosting dashboard:

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-char-app-password
```

**Steps:**
1. Go to your Render/Railway dashboard
2. Select your backend service
3. Go to Environment Variables
4. Add EMAIL_USER and EMAIL_PASS
5. Redeploy

---

## Security Notes

✅ **Safe:**
- App Password is NOT your main Gmail password
- If compromised, you can revoke it anytime
- Limited access (only email sending)

✅ **Best Practices:**
- Never commit .env file to GitHub
- Use environment variables in production
- App Password expires if you change Gmail password

✅ **Revoking Access:**
1. Go to Google Account → Security → App passwords
2. Find "Portfolio Contact Form"
3. Click "Remove"

---

## API Endpoint Details

**Endpoint:** `POST /api/contact`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your message here"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

**Error Response (500):**
```json
{
  "detail": "Error message"
}
```

---

## Files Modified

1. **Frontend:**
   - `/app/frontend/src/pages/OrbitalHome.jsx` - Added form state and handlers

2. **Backend:**
   - `/app/backend/routes/contact.py` - Contact form endpoint (NEW)
   - `/app/backend/server.py` - Registered contact router
   - `/app/backend/.env` - Email credentials

---

## Next Steps

1. ✅ Update EMAIL_USER in `.env` with your Gmail
2. ✅ Create Gmail App Password
3. ✅ Update EMAIL_PASS in `.env` with App Password
4. ✅ Restart backend
5. ✅ Test the contact form locally
6. ✅ Add environment variables to production hosting
7. ✅ Deploy and test on live site

---

## Support

If you encounter any issues:
1. Check backend logs: `tail -50 /var/log/supervisor/backend.err.log`
2. Check browser console for frontend errors
3. Verify Gmail App Password is correct
4. Ensure 2FA is enabled on Gmail

**Your contact form is now ready to receive messages! 📧**
