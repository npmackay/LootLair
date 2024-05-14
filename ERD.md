# Entity Relationship Diagram

## Entities

### Users

- id (Primary Key)
- username
- email
- password
- created_at
- updated_at

### UserBalance

- id (Primary Key)
- userId (Foreign Key references Users.id)
- balance
- created_at
- updated_at

### Transactions

- id (Primary Key)
- buyerId (Foreign Key references Users.id)
- sellerId (Foreign Key references Users.id)
- amount
- transaction_type (debit/credit)
- created_at

### ItemPostings

- id (Primary Key)
- sellerId (Foreign Key references Users.id)
- title
- description
- price
- itemStatus (available/sold)
- created_at
- updated_at

### ItemImages

- id (Primary Key)
- itemId (Foreign Key references ItemPostings.id)
- image_url
- created_at
- updated_at

## Relationships

- Users 1 ---- 1 UserBalance
- Users 1 ---- N Transactions (as a buyer)
- Users 1 ---- N Transactions (as a seller)
- Users 1 ---- N ItemPostings
- ItemPostings 1 ---- N ItemImages
