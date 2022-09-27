const db = require('../database/models');
const sequelize = db.sequelize;

//Otra forma de llamar a los modelos
const Movies = db.Movie;

const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    }, //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    add: function (req, res) {
        db.Genre.findAll({
            order: ["name"]
        })
            .then(genres => res.render("moviesAdd", {
                genres }
                ))
            .catch (error => console.log (error) 
        )  
    },

    create: function (req, res) {
        const movie = {title, relase_date, awards, lenght, genre, rating } = req.body;
        db.Movie.create ({
            title : title.trim(),
            rating,
            lenght,
            awards,
            release_date,
            genre_id : genre
        })
        .then(movie => console.log (movie))
        return res.redirect("/movies")
        .catch (error => console.log (error))
    },

    edit: function(req,res) {
        let Movie = Movies.findByPk(req.params.body);
        let allGenres = Genres.findAll({ order: "name"})
        Promise.all([Movie, allGenres])
        .then(([Movies,allGenres])=>{
            return res.render("moviesEdit",{
                Movie,
                allGenres,
                moment: moment}
            )
        })
        .catch(error=>console.log(error))
    },

    update: function (req,res) {
        const {title, rating, awards, lenght, release_date, genre_id} = req.body;
        Movies.update({
            title : title.trim(),
            rating,
            awards,
            genre_id,
            release_date,
            lenght
        },
        {
            where: {
            id: req.params.id
            }
        }
        )
        .then( () => res.redirect("/movies/detail" + req.params.id))
        .catch(error=>console.log(error))
    },

    delete: function (req, res) {
        // TODO
    },
    
    destroy: function (req, res) {
        // TODO
    }

}

module.exports = moviesController;