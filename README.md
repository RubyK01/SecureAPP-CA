# SecureAPP-CA
BSc (Honours) in Computing
Name: Ruby Kehoe
Student Number:x20382263


---

# Context
This project ruses a previous application I have worked as group project, the only compennts that have been aletered are the ones I have developed in the past.
Previous project: https://github.com/RubyK01/TeamProject2022
---

#Vulnerabuilites in unsecure branch
1. In login.js, there is a XSS issue with the redirect for a failed login attempt, localhost:3000/login?&error=""<script>alert('XSS')</script> this url for instance will cause an alert to appear meaning potential much more harmful code could be executed this way.
2. In login.js, there is a SQL injection vulnerability with the userName variable is it apart of a SQL query.
3. In signup.js, there is a Sensitive Data Exposure Vulnerability as the new password is added to the database without any hashing or encryption applied to it.
---
#Applying changes to secure branch
1. I have encoded the the error message in login.js to prevent XSS.
2. The query is no longer constructed using the variable prevening SQL injections.
3. Used brcrypt in order to use salting in order to encrypt new passwords before being saved in db.
---
# Project Dependencies
1.  bcrypt: 5.0.1
2.  chai: 4.3.6
3. cookie-parser: 1.4.4
4. debug: 2.6.9
5. ejs: 2.6.1
6. express: 4.16.1
7. express-fileupload: 1.3.1
8. express-session: 1.17.2"
9. http-errors: 1.6.3
10. mocha: 9.2.2
11. morgan: 1.9.1
12. mysql: 2.18.1
13. nodemon 2.0.15
14. serve-favicon: 2.5.0
15. sync-mysql: 3.01

---

# Install Project Dependencies

1. Open a new cmd terminal window.
2. Use the 'cd' command to navigate to the project folder.
2. Run the `npm install` command.

---

# Run the project

1. Open a new cmd terminal window or keep using the same one from the dependencies installation.
2. Use the 'cd' command to navigate to the project folder if your if your using the window from the dependencies installation go to step 3.
3. Update the mysql password in modules/connection_details.js to connect to MySQL database.
4. Execute the code in reqqit.sql on your local instance of MySQL.
5. Run the `npm start` to start the production server.

Check the application is running by navigating to your server address in
your preferred browser.
```sh
http://localhost:3000
```
