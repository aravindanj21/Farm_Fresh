import smtplib

server = smtplib.SMTP("smtp.gmail.com", 587)
server.starttls()

server.login(
    "aravindanme03@gmail.com",
    "qfln juit fzjd snxl"
)

print("SMTP Connected Successfully")

server.quit()