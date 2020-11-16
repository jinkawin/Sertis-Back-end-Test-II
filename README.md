# Sertis Back-end Test (II)

## Getting Started
### Installation
```
npm install
```

### Run

```
nodemon index.js
```

## APIs
### Authentication

**1. Log in: [POST] /api/1.0/auth**


Fields:

    username = user's username
    password = user's password

Example:

    {
        "username": "jinkawin",
        "password": "jinkawin_JmxYMkRa"
    }


**1. Log out: [POST] /api/1.0/auth/logout**

Fields:

    token = login's token

Example:

    {
        "token": "423b084b777db7d150b1659c1b4743a8e85bf12babf2b59c24e6bc145a86c109f3ba028f074b323f3ab9a8e7dca72479"
    }

### Authentication
**1. Sign up: [POST] /api/1.0/user**

Fields:

    username = user's username

Example:

    {
        "username": "jinkawin"
    }

### Card
**1. Add a new card [POST] /api/1.0/cards**

Fields:

    name: card's name
    status: card's status
    content: card's content
    category: card's category
    token: login's token

Example:

    {
        "name": "article2",
        "status": "published",
        "content": "This is content 2",
        "category": "Personal Blog",
        "token": "f6ec4594fe2e2b4bb251d6de05d763c4d48d43a7f22ce8dfde655e3d0bd6aa4ab669934feb7d032005c894b238928fdc"
    }

**2. Edit the existed card [PUT] /api/1.0/cards**

Fields:

    card_id: card's ID
    name: card's name
    status: card's status
    content: card's content
    category: card's category
    token: login's token

Example:

    {
        "card_id": 1,
        "name": "article12",
        "status": "published",
        "content": "This is content",
        "category": "Personal Blog",
        "token": "f6ec4594fe2e2b4bb251d6de05d763c4d48d43a7f22ce8dfde655e3d0bd6aa4ab669934feb7d032005c894b238928fdc"
    }


**3. Delete the existed card [DELETE] /api/1.0/cards**

Fields:

    card_id: card's ID
    token: login's token

Example:

    {
        "card_id": 1,
        "token": "f6ec4594fe2e2b4bb251d6de05d763c4d48d43a7f22ce8dfde655e3d0bd6aa4ab669934feb7d032005c894b238928fdc"
    }