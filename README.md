## Detachment App - MeCansei!

This front-end project is a decluttering network, where people can advertise items for sale that they no longer need.

### About the project

Some features of the project:

1) User registration;
2) User login;
3) Registration of product for sale;
4) Remove products that were for sale;
5) Add the product to the cart;
6) Remove specific product or all products from the cart;
7) Filter products by category;
8) Shop for products.

### Deployment link

- https://projeto18-freela-front-alpha-lake.vercel.app/

### Technologies Used

For this project, the following technologies were used:

- Node (versão 18.16.0);
- React;
- Vite;
- Styled Components.

### How it Works

In this project there are 10 pages:

1) Registration page: Where the user can register to use the website’s features;
2) Login Page: Where the user starts a session on the website with their data;
3) Catalog Page: Where the user has access to all the products being offered on the website;
4) Category Filter Page: The user has access to this page when they click on a specific product category on the catalog page;
5) Catalog by User: Page where the user can view the products offered for sale and manage them;
6) Insertion of Products for Sale Page: On this page the user can register their products to be sold on the website;
7) Item Page: Page where the user has access to more information about a certain product;
8) Cart Page: Where the user adds their purchases so that they can then proceed with their purchase;
9) Payment Page: Where the user can select their payment option and make the purchase;
10) Confirmation Page: Page that confirms whether the purchase was made successfully.

### How to Run

1. Clone this repository.

2. Install all dependencies with the command:

```bash
npm i
```

3. Configure the .env file using the .env.example file.

4. Run the front-end in a development environment:

```bash
npm run dev
```

## My Frontend Docker Image

This Docker image provides an environment for my amazing frontend application.

## How to Use

### Prerequisites

Make sure you have Docker installed on your machine. Refer to the [Docker installation instructions](https://docs.docker.com/get-docker/) for details on how to do this.

### Download and Run

1. **Download the Image:**

    ```bash
    docker pull natybrum97/myfrontend:latest
    ```

2. **Run the Container:**

    ```bash
    docker run -p 8080:80 natybrum97/myfrontend:latest
    ```

    This assumes that the application is configured to listen on port 80 inside the container, and port 8080 on the host is being mapped to it. Adjust the ports as needed.

3. **Access the Application:**

    Open a web browser and go to [http://localhost:8080](http://localhost:8080). You should see the application running.


