import { Meal } from '../models/meals.js'

function newMeal(req, res) {
  Meal.find({})
  .then(meals => {
    res.render('meals/new', {
        title: 'Add Meal',
        meals,
    })
  })
  .catch(err => {
    console.log(err);
    res.redirect("/flights")
  })
}

function create(req, res) {
    Meal.create(req.body)
    .then(meal => {
        res.redirect('meals/new')
    })
    .catch(err => {
        console.error(err)
        res.redirect('/flights')
        

    })
}

export {
  newMeal as new,
  create,
}