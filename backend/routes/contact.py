from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    message: str

@router.post("/contact")
async def send_contact_email(form_data: ContactForm):
    try:
        # Get email credentials from environment variables
        sender_email = os.getenv("EMAIL_USER")
        sender_password = os.getenv("EMAIL_PASS")
        
        if not sender_email or not sender_password:
            raise HTTPException(
                status_code=500, 
                detail="Email configuration is missing. Please contact the administrator."
            )
        
        # Create email message
        message = MIMEMultipart("alternative")
        message["Subject"] = "New Portfolio Contact Form Submission"
        message["From"] = sender_email
        message["To"] = sender_email
        message["Reply-To"] = form_data.email
        
        # Create HTML email body
        html_body = f"""
        <html>
            <body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
                <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                    <h2 style="color: #6C4DF6; border-bottom: 2px solid #6C4DF6; padding-bottom: 10px;">New Contact Form Submission</h2>
                    
                    <div style="margin: 20px 0;">
                        <p style="margin: 10px 0;"><strong style="color: #333;">Name:</strong> <span style="color: #666;">{form_data.name}</span></p>
                        <p style="margin: 10px 0;"><strong style="color: #333;">Email:</strong> <a href="mailto:{form_data.email}" style="color: #6C4DF6; text-decoration: none;">{form_data.email}</a></p>
                    </div>
                    
                    <div style="margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #6C4DF6; border-radius: 5px;">
                        <p style="margin: 0 0 5px 0;"><strong style="color: #333;">Message:</strong></p>
                        <p style="color: #666; line-height: 1.6; white-space: pre-wrap;">{form_data.message}</p>
                    </div>
                    
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center;">
                        <p style="color: #999; font-size: 12px;">This email was sent from your portfolio contact form</p>
                    </div>
                </div>
            </body>
        </html>
        """
        
        # Create plain text version as fallback
        text_body = f"""
        New Portfolio Contact Form Submission
        
        Name: {form_data.name}
        Email: {form_data.email}
        
        Message:
        {form_data.message}
        
        ---
        This email was sent from your portfolio contact form
        """
        
        # Attach both versions
        part1 = MIMEText(text_body, "plain")
        part2 = MIMEText(html_body, "html")
        message.attach(part1)
        message.attach(part2)
        
        # Send email using Gmail SMTP
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, sender_email, message.as_string())
        
        return {
            "success": True,
            "message": "Email sent successfully"
        }
        
    except smtplib.SMTPAuthenticationError:
        raise HTTPException(
            status_code=500,
            detail="Email authentication failed. Please check your Gmail App Password."
        )
    except smtplib.SMTPException as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to send email: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred: {str(e)}"
        )
