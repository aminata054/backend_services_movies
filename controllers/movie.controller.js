const db = require("../models");
const Movie = db.movies;

// Create and Save a new Movie
exports.create = function (req, res) {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Create a Movie
    const movie = new Movie({
        title: req.body.title,
        synopsis: req.body.synopsis,
        // registered: req.body.registered ? req.body.registered : false,
    });

    // Save Movie in the database
    movie
        .save(movie)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Movie.",
            });
        });
};

// Retrieve all Movies from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title
        ? { title: { $regex: new RegExp(title), $options: "i" } }
        : {};
    Movie.find(condition)
        .then(data => {
            res.send({message: "Veuillez ajouter au moins un film pour voir la liste des films disponibles "});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Movies.",
            });
        });
};

// Find a single movie with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Movie.findById(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message:
                        "Not found movie with id " + id
                });
            }
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving movie with id " + id })
        })
};

// Update

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Can not be empty ",
        });
    }
    const id = req.params.id;
    Movie.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Cannot update ",
                });
            } else res.send({ message: "Movie updated successfully" });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error"
            });
        });
}

// Delete a specified id

exports.delete = (req, res) => {
    const id = req.params.id;
    Movie.findByIdAndRemove(id)
    .then(data => {
        if (!data) {
            res.status(404).send({
                message:
                    "Cannot delete movie with id " + id
            });

        }
        else { 
            res.send({ message: "Movie deleted successfully" });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error"
        });
    });


}

// Delete all movies
exports.deleteAll = (req, res) => {
    Movie.deleteMany({})
    .then(data => {
         res.send({ message: `${data.deletedCount} movie were deleted succesfully` });
    })
    .catch(err => {
        res.status(500).send({
            message: "Error"
        });
    });
}




