import { Box, Floor } from './renderers'
import Matter from 'matter-js'
import { Dimensions } from 'react-native'

let boxIds = 0
const distance = ([x1, y1], [x2, y2]) =>
  Math.sqrt(Math.abs(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)))

const Physics = (state, { time }) => {
  Matter.Engine.update(state.physics.engine, time.delta);
  return state;
}

const CreateBox = (state, { screen }) => {
  if (state.box.body.isStatic) {
    return state
  }

  const objPresent = Object.keys(state)
    .filter(key => state[key].body && state[key].body.label == 'block')
    .find(key => state[key].body && state[key].body.position.x > screen.width / 2)

  if (objPresent) {
    return state
  }

  const { world } = state.physics.engine
  const velocity = { x: -1, y: 0 }
  const options = {
    frictionAir: 0,
    isSensor: true,
    label: 'block',
    collisionFilter: {
      category: 0x0001,
    }
  }
  const { width, height } = Dimensions.get('window')
  const boxSize = Math.trunc(Math.max(width, height) * 0.075)

  const ratio = Math.random() * 0.9 + 0.05
  const sizes = {
    upper: (height - 5 * boxSize) * ratio,
    lower: (height - 5 * boxSize) * (1 - ratio),
  }

  const wallUpper = Matter.Bodies.rectangle(width + boxSize, sizes.upper / 2, boxSize, sizes.upper, options)
  const wallscore = Matter.Bodies.rectangle(width + boxSize, sizes.upper + 2.5 * boxSize, boxSize, 5 * boxSize, { ...options, label: 'score'})
  const wallLower = Matter.Bodies.rectangle(width + boxSize, height - (sizes.lower / 2), boxSize, sizes.lower, options)

  Matter.Body.setVelocity(wallUpper, velocity)
  Matter.Body.setVelocity(wallscore, velocity)
  Matter.Body.setVelocity(wallLower, velocity)

  Matter.World.add(world, [wallUpper, wallscore, wallLower])

  state[++boxIds] = {
    body: wallUpper,
    size: [boxSize, sizes.upper],
    color: '#3949AB',
    renderer: Box
  }

  state[++boxIds] = {
    body: wallscore,
    size: [boxSize, 5 * boxSize],
    color: 'transparent',
    renderer: Box
  }

  state[++boxIds] = {
    body: wallLower,
    size: [boxSize, sizes.lower],
    color: '#F44336',
    renderer: Box
  }

  return state
}

const MoveBox = (state, { touches }) => {
  const body = state.box.body
  const press = body.velocity.x == 0 && touches.find(x => x.type === 'press')

  if (press) {
    if (body.isStatic) {
      Matter.Body.setStatic(body, false)
    } else if (body.velocity.y > -1) {
      body.torque = 0.1
      body.force = {
        y: body.velocity.y > 0 ? -0.06 : -0.02,
        x: 0,
      }
    }
  } else {
    body.force = {
      x: 0,
      y: 0.001,
    }
  }

  return state
}

const CleanBoxes = (state, { screen }) => {
  let world = state['physics'].world

  Object.keys(state)
    .filter(key => state[key].body && state[key].body.position.x < -screen.width / 2)
    .forEach(key => {
      Matter.Composite.remove(world, state[key].body)
      console.log('delete', state[key])
      delete state[key]
    })

  return state
}

export { Physics, CreateBox, MoveBox, CleanBoxes }
