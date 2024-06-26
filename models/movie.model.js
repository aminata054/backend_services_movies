module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        title: String,
        synopsis: String,
        realisateur: String,
        genre: String,
        annee_sortie: Date,
       
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function () {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Movie = mongoose.model("movie", schema);
    return Movie;
  };
  