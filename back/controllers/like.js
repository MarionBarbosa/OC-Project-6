const Sauce = require("../models/sauce");

exports.like = (req, res, next) => {
  let userId = req.body.userId;
  //find sauce to update
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      // case 1: user likes sauce like=1
      // => get userId from request and push it in usersLiked array and pull it from usersDisliked array
      if (
        req.body.like == 1 &&
        !sauce.usersLiked.includes(userId) &&
        !sauce.usersDisliked.includes(userId)
      ) {
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: req.body.like },
            $addToSet: { usersLiked: req.body.userId },
          }
        )
          .then((sauce) => res.status(201).json(sauce))
          .catch((error) => res.status(400).json({ error }));
      }
      //case 2: user dislikes sauce like = -1
      // => get userId from request and push it in usersDisliked array and pull it from usersLiked array
      else if (
        req.body.like == -1 &&
        !sauce.usersDisliked.includes(userId) &&
        !sauce.usersLiked.includes(userId)
      ) {
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { dislikes: req.body.like },
            $addToSet: { usersDisliked: req.body.userId },
          }
        )

          .then((sauce) => res.status(201).json(sauce))
          .catch((error) => res.status(400).json({ error }));
      }
      // case 3: user takes off his like or dislike => like=0 + delete from all arrays
      //case 3a: user takes off his like
      else if (req.body.like == 0 && sauce.usersLiked.includes(userId)) {
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: -1 },
            $pull: { usersLiked: req.body.userId },
          }
        )
          .then((sauce) => res.status(201).json(sauce))
          .catch((error) => res.status(400).json({ error }));
      }
      //case 3b: user takes off his dislike
      else if (req.body.like == 0 && sauce.usersDisliked.includes(userId)) {
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { dislikes: 1 },
            $pull: { usersDisliked: req.body.userId },
          }
        )
          .then((sauce) => res.status(201).json(sauce))
          .catch((error) => res.status(400).json({ error }));
      } else {
        return res
          .status(400)
          .json({ message: "Sauce déjà likée ou dislikée" });
      }
    })
    .catch((error) => res.status(400).json({ error }));
};
