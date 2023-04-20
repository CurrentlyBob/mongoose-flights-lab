import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'
const router = Router()

// GET localhost:3000/flights
//GET
router.get('/new', flightsCtrl.new)
router.get('/', flightsCtrl.index)
router.get('/:flightId', flightsCtrl.show)
router.get('/:flightId/edit', flightsCtrl.edit)
//POST
router.post('/', flightsCtrl.create)
router.post('/:flightId/tickets', flightsCtrl.createTicket)
router.post('/:flightId/meals', flightsCtrl.addMeal)
//DELETE
// DELETE localhost:3000/flights/:flightId
router.delete('/:flightId', flightsCtrl.delete)

//PUT

//PUT localhose:3000/flights/:flightId
router.put('/:flightId', flightsCtrl.update)

export { router }
