<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

# OCR Backend - NestJS

This is a NestJS backend application that handles image uploads, stores them in a Supabase bucket, processes the images using Tesseract.js to perform Optical Character Recognition (OCR), and returns the extracted text in the response.

## Features

- **Image Upload**: Accepts image files via multipart/form-data.
- **Database Management**: Uses Prisma ORM to interact with a Supabase-hosted PostgreSQL database.
- **Supabase Storage**: Stores the uploaded images in a Supabase storage bucket.
- **OCR Processing**: Utilizes Tesseract.js to process the images and extract text.
- **API Response**: Returns the extracted text along with the image URL stored in Supabase.

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **Multer**: Middleware for handling `multipart/form-data` for file uploads.
- **Supabase**: Used for storing uploaded images in a cloud storage bucket.
- **Tesseract.js**: JavaScript library for performing OCR on images.
- **TypeScript**: Type-safe language that builds on JavaScript.

## Getting Started

To run this project locally, follow the steps below:

### Prerequisites

- **Node.js**: Ensure that you have Node.js installed. Download it from [nodejs.org](https://nodejs.org/).
- **NPM or Yarn**: A package manager for Node.js.
- 

1. **Clone the repository**:
   ```bash
   git clone https://github.com/asclaudino/ocr-invoices-app.git
   cd ocr-invoices-app
2. **Installation**
    ```bash
    $ npm install
    ```
3. **Creating a env file**
      ```bash
      touch .env
- To paste it the actual keys please send me a message.
   
## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## License

Nest is [MIT licensed](LICENSE).
