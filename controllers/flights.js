import { title } from "process";
import { Flight } from "../models/flight.js";
import { log } from "console";
import { Meal } from "../models/meals.js";
function newFlight(req, res) {
  res.render("flights/new", {
    title: "Add Flight",
  });
}

function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key];
  }
  Flight.create(req.body)
    .then(flight => {
      res.redirect(`/flights/${flight._id}`);
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/flights");
    });
}

function index(req, res) {
  Flight.find({})
    .then((flights) => {

      res.render("flights", { flights, title: "All Flights" });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/");
    });
}

function deleteFlight(req, res) {
    Flight.findByIdAndDelete(req.params.flightId)
    .then(flight => {
        res.redirect('/flights')
    })
    .catch(err => {
        console.log(err)
        res.redirect('/flights')
    })
}
function show(req, res) {
    Flight.findById(req.params.flightId)
    .populate('meals')
    .then(flight => {
      Meal.find({_id: {$nin: flight.meals}})
      .then(meals => {
        res.render('flights/show', {
          flight,
          title: 'Flight Detail',
          meals: meals
        })
      })
      .catch(err => {
        console.log(err)
        res.redirect('/flights')
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/flights')
    })
  }

function edit(req, res) {   
    Flight.findById(req.params.flightId)
    .then(flight => {
        res.render('flights/edit', {
            flight,
            title: 'Edit Flight'
        })
    })
    .catch(err => {
        console.log(err)
        res.redirect('/flights')
      })
}

function update(req, res) {
    for(let key in req.body) {
        if (req.body[key] === '') delete req.body[key]
    }
    Flight.findByIdAndUpdate(req.params.flightId, req.body, { new: true })
    .then(flight => {
        console.log(flight)
        res.redirect('/flights/${req.params.flightId}')
    })
    .catch(err => {
        console.log(err)
        res.redirect('/flights')
    })
}

function createTicket(req, res) {
    Flight.findById(req.params.flightId)
    .then(flight => {
        flight.tickets.push(req.body)
        flight.save()
        .then(() => {
            res.redirect(`/flights/${flight._id}`)
        })
        .catch(err => {
            console.log(err)
            res.redirect('/')
        })
    })
    .catch(err => {
        console.log(err)
        res.redirect('/')
    })
}

function addMeal(req, res) {
    Flight.findById(req.params.flightId)
    .then(flight => {
        flight.meals.push(req.body.mealId)
        flight.save()
        .then(() => {
            res.redirect(`/flights/${flight._id}`)
        })
        .catch(err => {
            console.log(err)
            res.redirect('/flights')
        })
    })
    .catch(err => {
        console.log(err)
        res.redirect('/flights')
    })
}


export { 
    newFlight as new, 
    create, 
    index, 
    deleteFlight as delete,
    show,
    edit,
    update,
    createTicket,
    addMeal,
}
