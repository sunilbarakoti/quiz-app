## Quiz App

I have impletmented authentication and authorization. I have used JWT for authorization.

## Below are the API's for the app:

1. Create account: /user/signup
2. Login: /user/login (On sucessful login the auth token is generated and returned as a response. Please use it in the header of each requests)
3. Create a quiz with MCQ: /quiz/createquiz
4. Edit your quiz: /quiz/:quiz (Users are only allowed to change the quizes they have created)
5. View quiz: /quiz/:quiz
6. View all the available quizes: /quiz/viewquizes
7. Attempt the quiz: /quiz/attempt/:quiz
8. View the result: /quiz/viewresult

## Below are the external packages that have been used in the project:

1. bcryptjs
2. dotenv
3. express
4. jsonwebtoken
5. mongoose
6. nodemon
