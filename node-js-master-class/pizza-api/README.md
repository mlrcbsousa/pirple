# How to Use this API


## The `User` Resource

The user resource allows you to **CRUD** users.


### You can create a `User`

**POST** `localhost:3000/users`

#### Body:

```json
{
  "name": "Manuel",
  "email": "mlrcbsousa@gmail.com",
  "address": "Rua das Trinas",
  "password": "ThisIsAPassword"
}
```

All fields are required.

The Server returns the created user object in `application/json` Content Type.


### You can find a `User`

**GET** `localhost:3000/users?email={{ email }}`

Using the email of a previously created user in the query string.

#### Headers:

```json
{
  "token": "67rtfyghbkjnih8g7tf"
}
```

The headers must contain a valid session token created by following the **POST Tokens** section of this guide.

The Server returns the found user object in `application/json` Content Type.


### You can edit a `User`

**PUT** `localhost:3000/users`

#### Body:

```json
{
  "name": "Manuel Sousa",
  "email": "mlrcbsousa@gmail.com"
}
```

The email is a required field, all remaining fields are optional.

#### Headers:

```json
{
  "token": "67rtfyghbkjnih8g7tf"
}
```

The headers must contain a valid session token created by following the **POST Tokens** section of this guide.

The Server returns the updated user object in `application/json` Content Type.


### You can destroy a `User`

**DELETE** `localhost:3000/users?email={{ email }}`

Using the email of a previously created user in the query string.

#### Headers:

```json
{
  "token": "67rtfyghbkjnih8g7tf"
}
```

The headers must contain a valid session token created by following the **POST Tokens** section of this guide.


## The `Token` Resource

The tokens resource allows you to **CRUD** tokens.


### You can create a `Token`

**POST** `localhost:3000/tokens`

#### Body:

```json
{
  "email": "mlrcbsousa@gmail.com",
  "password": "ThisIsAPassword"
}
```

All fields are required.

The email and password combination must be valid and match a user saved in the database.

To create a user follow the instructions in the **POST Users** section of this guide.

The Server returns the created token object in `application/json` Content Type.


### You can find a `Token`

**GET** `localhost:3000/tokens?id={{ id }}`

Using the id of a previously created token in the query string.

The Server returns the found token object in `application/json` Content Type.



### You can destroy a `Token`

**DELETE** `localhost:3000/token?id={{ id }}`

Using the id of a previously created token in the query string.


## The `Items` Resource

The items resource allows you to get the list of items available at the pizzeria.

### You can list the `Items`

**GET** `localhost:3000/items`

#### Headers:

```json
{
  "token": "67rtfyghbkjnih8g7tf"
}
```

The headers must contain a valid session token created by following the **POST Tokens** section of this guide.

The Server returns an item menu object in `application/json` Content Type, similar to this:

```json
{
  "PZ814": {
    "name": "margherita",
    "price": 650
  },
  "PZ377": {
    "name": "vegetarian",
    "price": 650
  },
  "PZ927": {
    "name": "melanzana",
    "price": 650
  }
}
```

All prices are in cents.


## The `Cart` Resource

The cart resource allows you to **RUD** the shopping cart of a user.

### You can find a `Cart`

**GET** `localhost:3000/cart?email={{ email }}`

Using the email of a previously created user in the query string.

#### Headers:

```json
{
  "token": "67rtfyghbkjnih8g7tf"
}
```

The headers must contain a valid session token created by following the **POST Tokens** section of this guide.

The Server returns a shopping cart object in `application/json` Content Type, similar to this:

```json
{
  "shoppingCart": [
    {
      "item": "PZ814",
      "quantity": 1
    },
    {
      "item": "PZ377",
      "quantity": 2
    },
    {
      "item": "PZ927",
      "quantity": 3
    }
  ],
  "total": 1300
}

```


### You can destroy a `Cart`

**DELETE** `localhost:3000/cart?email={{ email }}`

Using the email of a previously created user in the query string.

#### Headers:

```json
{
  "token": "67rtfyghbkjnih8g7tf"
}
```

The headers must contain a valid session token created by following the **POST Tokens** section of this guide.


### You can edit a `Cart`

**PATCH** `localhost:3000/cart?email={{ email }}`

Using the email of a previously created user in the query string.

#### Headers:

```json
{
  "token": "67rtfyghbkjnih8g7tf"
}
```

The headers must contain a valid session token created by following the **POST Tokens** section of this guide.

#### Body:

```json
[
  {
    "item": "PZ814",
    "quantity": 1
  },
  {
    "item": "PZ377",
    "quantity": 2
  },
  {
    "item": "PZ927",
    "quantity": 3
  }
]
```

The server will update the current shopping cart on the user without removing what was previously there.

If an item was already in the user's shopping cart the new quantity will be saved.

To remove an item from the shopping cart send a quantity of zero.


## The `Orders` Resource

The orders resource allows you to **CR** orders.


### You can create an `Order`

**POST** `localhost:3000/orders`

#### Headers:

```json
{
  "token": "67rtfyghbkjnih8g7tf"
}
```

#### Body:

```json
{
  "email": "mlrcbsousa@gmail.com",
	"number": 4242424242424242,
	"expMonth": 4,
	"expYear": 2021,
	"cvc": 314
}
```

All fields are required.

The email and token combination must be valid and match a user saved in the database.

To create a user follow the instructions in the **POST Users** section of this guide.

The order will consist of everything in that User's shopping cart.

The Server returns the created order object in `application/json` Content Type.

It also resets the User's shopping cart and queues the sending of an email receipt in the following format

>Thank you Manuel for shopping with Pizza Ltd!
>
>Your order: 2puvxjweuyxlst0tbnzk has been processed successfully.
>
>Order details:
>
>On: 2020-04-12  
>At: 22:45  
>
>VEGETARIAN - 3 x 6.5€  
>MELANZANA - 4 x 6.5€  
>
>Total: 45.5€


### You can find an `Order`

**GET** `localhost:3000/orders?id={{ id }}&email={{ email }}`

Using the id of a previously created order in the query string.

#### Headers:

```json
{
  "token": "67rtfyghbkjnih8g7tf"
}

```
The email and token combination must be valid and match a user saved in the database.

The Server returns the found order object in `application/json` Content Type.


## The Mailer Worker

Every 5 minutes the orders list is searched for orders with unsent email Receipts and sending is re-attempted.