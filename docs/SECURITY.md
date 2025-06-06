# Security Documentation

When developing Fotomagic, the development team took security for both our users and systems seriously by implementing a range of best practices.

Below are commons questions about our security practices answered for your convenience.

**Q: Are all sensitive routes secure and require authentication?**  
**A:** Yes, all sensitive routes(everything except for login and register routes) are protected by requiring a valid JWT (JSON Web Token). This is accomplished by using the ```@jwt_required()``` decorator in the backend to protect routes so that only requests with a valid JWT (JSON Web Token) can access them.

**Q: Are all credentials kept secret?**
**A**: Yes, all credentials are kept secreat and secure. Application related credentials such as MONGO_URI for the Mongo DB are stored in .env files for local development and never stored on github. Furthermore, in the deployed application theses are stored in the form of Azure's webservice env variables. Finally, user credentials are stored securely in the Mongo DB unaccesible to users.

**Q: Are any stored passwords secure?**
**A**: Yes, all stored passwords are secure by utilizing a one way hash algorithm. Furthermore, this hashed password is the only password stored in the Mongo DB. 

**© 2025 [FotoMagic](https://ambitious-dune-0f7fde21e.6.azurestaticapps.net/). All rights reserved.**
