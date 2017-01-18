$.ajax
       (
                       {
                       curl https://api.sendgrid.com/api/mail.send.json \
-F to=khushbuparakh@hotmail.com -F toname=test -F subject="Example Subject" \
-F text="testing text body" --form-string html="<strong>testing html body</strong>" \
-F from=khushbu.parakh@insytio.com -F api_user=khushbuparakh -F api_key=Khushbu1@ \


                       }
       );