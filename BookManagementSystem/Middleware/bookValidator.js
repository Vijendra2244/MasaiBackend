const bookValidator = async (req, res, next) => {
    const { bookTitle, releaseDate, author, genre, availableCopies } = req.body;
  
    if (!bookTitle) {
      res.status(400).send("Enter the book title correctly");
    } else if (!releaseDate) {
      res.status(400).send("Enter the correct format of release date");
    } else if (!author) {
      res.status(400).send("Enter the book author");
    } else if (!genre) {
      res.status(400).send("Enter the book genre");
    } else if (!availableCopies) {
      res.status(400).send("Enter the book copies");
    } else {
      next(); 
    }
  };
  
  module.exports = bookValidator;
  