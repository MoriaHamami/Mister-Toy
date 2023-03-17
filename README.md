<div id="header" align="center">
	<h1>Toy Store</h1>
</div>

A single page responsive application built with various technologies, such as sockets, React Google Map library, deployment through render, database on mongoDB on Atlas (CRUD, filter, sort, aggregation, etc.), query params, chartjs library, and much more! [Check it out here](https://mister-toy-72o1.onrender.com/ "Website link")!

![Details image](assets/img/readme/details.png "Details-page")

___

### Table of Contents
- [Authentication](#authentication)
- [Security](#security)
- [Real-time](#real-time)
- [Design](#design)
- [Showcase](#showcase)

## Authentication
different permissions for admin and user
The user collection includes one admin user, which has more permissions than the rest of the users.

## Security
Our frontend holds an http service that communicates remotely with our backend via AJAX, and provides an async (CRUDL) access to a collection kept on mongoDB.

Relevant routes are protected using a middleware, while passwords and personal information are not accessable and are encrypted.

## Real-time 
Using sockets, I managed to implement chat functionality. Each toy page includes a chat-room. The chats include the names of those who sent messages, and real-time updates on users who are typing messages. The chat history is saved on the database.

## Design
For this project I used CSS to begin with, and later converted the files to SCSS. I added variables, mixins, functions and much more thanks to the wide range of options available with SCSS. 
In addition, I made sure the app is responsive, and looks great on desktop, tablet and mobile.

## Showcase

### Dashboard 
This page has the following charts:
- Prices per toy type (Adult, Educational etc.)
- Inventory by type – Chart showing the percentage of toys that are in stock by type.
These charts were created using the chartjs library.

![Dashboard image](assets/img/readme/dashboard.png "Dashboard-page")

### About page
This page shows a map with markers for each shop branch. When the user selects a branch button, the map is centered on that location. This feature was created with a React Google Map library.

![About image](assets/img/readme/about.png "About-page")


