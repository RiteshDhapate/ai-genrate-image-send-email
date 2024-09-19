
## this is deployed url
``` https://ai-genrate-image-send-email.onrender.com```

## how to use this api
### end point -> /send-email
Send an email to a specific address with a custom message. The email includes an AI-generated quote image.
#### it take the the some body parameters
```json
{
    "email":"ananth@lumiopartners.com",
    "message": "hello ritesh"
} 
```

## add emails to database
### end point -> /add-emails

##### it take the the some body parameters

```json
{
  "emails": ["test1@gmail.com", "test2@gmail.com"]
}
```
# Scheduled Daily Email (Automatically triggered)
Schedule:
This task runs daily at 9 AM (server time) and sends emails to all stored addresses in the database, along with an AI-generated image.

No manual input is required for this; it is managed automatically.