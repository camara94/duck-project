const express = require("express");

const speakersRoute = require("./speakers");
const feedbackRoute = require("./feedback");

const router = express.Router();

// This method allows arguments to be passed 
// from the application down to the route as function parameters. 
module.exports = params => {
    router.get("/", (request, response) => {

        // Using cookies to track the amount of visitors,
        // specific to a given user.
        if(!request.session.visitcount) {
            request.session.visitcount = 0;
        }

        request.session.visitcount += 1;
        console.log(`Number of visits: ${request.session.visitcount}`);

        response.render("pages/index", { pageTitle: "Welcome!"});
    });

    router.use("/speakers", speakersRoute(params));
    router.use("/feedback", feedbackRoute(params));

    return router;
};
