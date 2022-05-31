const Sauce = require("../models/sauce");

exports.like = (req, res, next) => {
  // case 1: user likes sauce like=1 + push in array
  // => get userId from request and push it in array

  if (req.body.like === 1) {
    Sauce.findOneAndUpdate(
      { _id: req.params.id },
      {
        $inc: { likes: req.body.like },
        $addToSet: { usersLiked: req.body.userId },
      }
    )
      .then((sauce) => res.status(201).json(sauce))
      .catch((error) => res.status(400).json({ error }));
  }
  //chercher le userId dans le tableau de like et si deja la alors mettre like=0 et retirer du tableau

  //cas 2: user dislikes sauce like = -1 + push in array
  // => get userId from request qnd push it in array
  if (req.body.like === -1) {
    console.log("product disliked");
  }
  // cas 3: user retire son like ou son dislike like=0 + delete from array
  //=> find indexOF userId in arrays and splice it
  if (req.body.like === 0) {
    console.log("product not liked or disliked");
  }
};
