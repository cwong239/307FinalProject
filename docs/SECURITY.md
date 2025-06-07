# 🔒 Security Documentation

When developing Fotomagic, the development team took security for both our users and systems seriously by implementing a range of best practices.

Below are commons questions about our security practices answered for your convenience.

**Q: Are all sensitive routes secure and require authentication?**  
**A:** Yes, all sensitive routes (everything except for login and register), are protected by mandating an Authentication Bearer Token, which should be a valid JSON Web Token (JWT). This is accomplished by using the ```@jwt_required()``` decorator in the backend to protect routes so that only requests with a valid JWT can proceed to prevent the abuse of server resources and personal files.

**Q: Are all credentials kept secret?**
**A**: Yes, all credentials are kept secret and secure. Application related credentials such as MONGO_URI for the Mongo DB and the JWT_SECRET for secure JWT encryptions are stored in .env files for local development and never stored on github. Furthermore, in the deployed application theses are stored in the form of Azure's webservice env variables. User credentials are stored securely in the Mongo DB unaccesible to users. More information about password handling below.

**Q: Are any stored passwords secure?**
**A**: Yes, all stored passwords are secure by utilizing a one way hash algorithm. This hashed password is the only secure piece of authentication data stored in the Mongo DB. 

**© 2025 [FotoMagic](https://ambitious-dune-0f7fde21e.6.azurestaticapps.net/). All rights reserved.**
