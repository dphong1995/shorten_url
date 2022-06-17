<div align="center">
  <h3 align="center">Shorten URL</h3>

  <p align="center">
    <br />
    <a href="https://shorten-url-mono.vercel.app/">View Demo</a>
    ·
    <a href="https://dphong1995/shorten_url_mono/issues">Report Bug</a>
  </p>
</div>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

* Docker - an open platform for developing, shipping, and running applications.
    * https://docs.docker.com/engine/install/

### Start server

1. Clone the repo
   ```sh
   git clone https://github.com/dphong1995/shorten_url.git
   ```
2. Start containers
   ```sh
   docker-compose up
   ```

Access the Frontend application by using <a href="http://localhost:3003/">http://localhost:3003</a>

### Run Test

1. Start containers
   ```sh
   docker-compose up
   ```
2. Prepare test db
   ```sh
    docker-compose exec be rails db:reset db:prepare RAILS_ENV=test
     ```
3. Run test
    ```sh
    docker-compose exec be rails test
     ```

### Scalability

* In case there are too many existing URLs and the system cannot generate a unique 6-characters token anymore due to
  duplication, we can increase the token length by setting `TOKEN_LENGTH` variable.
