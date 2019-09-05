const { Router } = require("express");

const Event = require("./model");
const router = new Router();

router.post("/events", (req, res, next) => {
  Event.create(req.body)
    .then(event => res.json(event))
    .catch(err => next(err));
});

// router.get("/events", (req, res, next) => {
//   Event.findAll()
//     .then(events => res.json(events))
//     .catch(err => next(err));
// });

router.get("/events", (req, res, next) => {
  const limit = req.query.limit || 3;
  const offset = req.query.offset || 0;

  Promise.all([Event.count(), Event.findAll({ limit, offset })])
    .then(([total, events]) => {
      res.send({
        events,
        total
      });
    })
    .catch(error => next(error));
});

router.get("/events/:id", (req, res, next) => {
  Event.findByPk(req.params.id)
    .then(event => res.send(event))
    .catch(err => next(err));
});

router.put("/events/:id", (req, res, next) => {
  Event.findByPk(req.params.id)
    .then(event => {
      if (!event) {
        res.status(404).end;
      } else {
        return event.update(req.body).then(event => res.json(event));
      }
    })
    .catch(next);
});

router.delete("/events/:id", (req, res, next) => {
  Event.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(number => {
      res.send({ number });
    })
    .catch(err => next(err));
});
module.exports = router;
