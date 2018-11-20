# Epicture

### Introduction ###
Epicture is a school project where the goal is **to use and implement online photo sharing API platforms**.
We developed a mobile application using the **[Imgur API](https://apidocs.imgur.com/)** to display, manage and share images.
To build this app we work in a group composed of **Marlon l'Huillier** as the project lead and myself, **Laurent Coloma**.

*note: Every Figure in this document can be found in the 'Figures' folder.*

### Installation ###
To properly run this apps you will need:
	- [Node](https://nodejs.org/en/)
	- [Gradle](https://gradle.org/)
	- [React-Native](https://facebook.github.io/react-native/)

### Organization
First and foremost, before typing any lines of code, we had a meeting to setup the project guidelines.
During it, we looked at the **[Imgur Android](https://imgurinc.com/mobileapps/)** application and tested it to see how it was working and where to go.
The following Figures, will show you the baseline design of the app.

![Figure 1](https://drive.google.com/open?id=1gQTy3gM5y3gjdUj8iQXoGU0qz13jV3gB) 
*Un-Authed Home Page: Most Viral and Login View*

![Figure 2](https://drive.google.com/open?id=1IKa1TPzCk84u8ls51CoPS01Dpt3lYxgM)
*Authed Home Page and Upload View*

![Figure 3](https://drive.google.com/open?id=1Ib5mGeLhq-9iA_4ZbLpclTw7RJi84u5S)
*Search and Profile View*

To follow our guidelines we made a Trello referencing all the tasks needed to realise the app.

![Figure 4](https://drive.google.com/open?id=1iNqnXKnqfR2h44r2uh5_HP-sZw-VDUnw)
*Start of Project*

![Figure 5](https://drive.google.com/open?id=1pOJ2nFW73FWX-noD-nEV09e5XJ6aqxZP)
*End of Project*
*note: As you can see we did not do the Camera video implementation, this is mainly because the Imgur Api does not have a method to upload video.*

To not get *lost* in our codes and to make it *scalable* we made re-usable Component, they allow us to:
	- Parse API response and map it.
	- Display Images
	- Display Videos
	- Display Comments
	- Display Tags
	- Display Galleries Information
They can be found in  *src/ParseContent* folder, here a little example:

![Figure 6](https://drive.google.com/open?id=1KDLWuUTy3GdTzE9MhV-9lRHUaAjyxSjI)
*ParseContent.js*