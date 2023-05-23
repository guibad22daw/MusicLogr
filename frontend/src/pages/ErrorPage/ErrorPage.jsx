import React from 'react';

const ErrorPage = () => {
  return (
    <html lang="ca" xmlns:th="http://www.thymeleaf.org">
      <head>
        <meta charset="UTF-8" />
        <title>Pàgina no trobada</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl"
          crossorigin="anonymous"
        />
      </head>
      <body>
        <h1>Pàgina no trobada!</h1>
        <p>
          tornar a <a href="/">home page</a>.
        </p>
      </body>
    </html>
  );
};

export default ErrorPage;