# Book Courier Web App <br/>

A modern book delivery and management web application built with React and Vite.

# live link

- https://book-courier-c3864.web.app

## Features

- User authentication and authorization
- Browse and order books
- Order and  track books
- Wish List functionality
- Role based Dashboard (users,librarian and admins)

## Tech Stack

- React
- Vite
- Tailwind CSS
- Axios
- Daisyui
- React leaflet
- Lottie react
- Motion
- React icon
- Styled component
- Sweetalert2
- Swiper
- React Router
- TanStack Query

## explaination

- Users can visit the Home page and All Books page without logging in.The All Books page includes a search option to find books by name.To access Book Details and the Dashboard, users must be logged in.

## Authentication

- New users must register using Name, Image, Email, and Password.After registration, the user role is set to User by default.Registered users can log in using their email and password.

# a User can 

- Access Home and All Books pages

- View book details after logging in

- Add books to wishlist

- Order books and make payments

- Submit reviews after successful payment
## In User Dashboard 
- My Orders

- Invoice (payment history)

- Wishlist

- My Profile

#  Librarian Role

- A Librarian:Must be an authenticated user.Must be approved by an Admin

## a Librarian can:

- Add and edit books (cannot delete)

- View how many books they have added

- View orders for their books

## Librarian Dashboard includes:
- Add Book 

- My Book 

- Orders

- My Profile


# Admin role
## An Admin can:

- Assign roles (User → Librarian / Admin)

- Publish or unpublish books

- Manage all users