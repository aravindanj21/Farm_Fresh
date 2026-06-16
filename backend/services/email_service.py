import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from services.email_logger import log_email


SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587

EMAIL_ADDRESS = "aravindanme03@gmail.com"
EMAIL_PASSWORD = "qfln juit fzjd snxl"

def send_email(
    to_email,
    subject,
    html_content,
    email_type
):

    log_email(
        to_email,
        email_type,
        "Pending"
    )

    try:

        msg = MIMEMultipart()

        msg["From"] = EMAIL_ADDRESS
        msg["To"] = to_email
        msg["Subject"] = subject

        msg.attach(
            MIMEText(
                html_content,
                "html"
            )
        )

        server = smtplib.SMTP(
            SMTP_SERVER,
            SMTP_PORT
        )

        server.starttls()

        server.login(
            EMAIL_ADDRESS,
            EMAIL_PASSWORD
        )

        server.sendmail(
            EMAIL_ADDRESS,
            to_email,
            msg.as_string()
        )

        server.quit()

        log_email(
            to_email,
            email_type,
            "Sent"
        )

        return True

    except Exception as e:

        print(e)

        log_email(
            to_email,
            email_type,
            "Failed"
        )

        return False