const express = require("express");
const path = require("path");
const cookieSession = require("cookie-session");

// Adding business logic to the server.
const AnimalService = require("./services/AnimalService");
const UserService = require("./services/UserService");

// Create instances of the above classes.
const animalService = new AnimalService("/data/animal.json");
const userService = new UserService("/data/users.json");

const routes = require("./routes");

const app = express();

const port = 3000;

// Required if running through reverse proxy like NGINX
app.set("trust proxy", 1);

// Request the lifecycle, to fetch cookies that are sent with
// the headers that come from the client and parse them 
// and also then set them on the request object.
app.use(
    cookieSession({
        name: "session",
        // Just example keys.
        keys: ["F56FsQQwE3r5", "htryhfgDSFG4"],
    })
);

// Utilizing the EJS template
app.set("view engine", "ejs");
// Expects the template to be in the 'views' folder
app.set("views", path.join("/views"));

// Before routing handlers are defined, there needs to be
// 'app.use' and the middleware called 'express.static'
app.use(express.static(path.join(__dirname, "/static")));

app.use(
    "/",

    // Will pass down the service instances to the routes. 
    routes({
        animalService: animalService,
        speakersService: userService
    })
);

app.listen(port, () => {
    console.log(`Express Sever is Listening on port ${port}!`);
});
