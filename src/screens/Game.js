import React, { Component } from "react"
import { StatusBar, StyleSheet, Dimensions, View, Text, Image } from "react-native"
import { RkButton, RkStyleSheet } from "react-native-ui-kitten"
import { GameEngine } from "react-native-game-engine"
import { Physics, CreateBox, MoveBox, CleanBoxes, MovingBackground } from "../game/systems"
import { Box, Ball, Background } from "../game/renderers"
import Icon from 'react-native-vector-icons/Ionicons'
import Matter from "matter-js"

Matter.Common.isElement = () => false

export default class RigidBodies extends Component {
  constructor() {
    super()

    this.handleCollision = this._handleCollision.bind(this)
    this.handleCollisionEnd = this._handleCollisionEnd.bind(this)
    this.reset = this._reset.bind(this)

    this.state = {
      running: false,
      initialRun: true,
      dying: false,
      score: 0,
    }
  }

  componentDidMount() {
    this.initGame()
  }

  _handleCollision ({pairs}) {
    if (!this.state.running) {
      return
    }

    const labels = pairs.map(pair => ([pair.bodyA.label, pair.bodyB.label]))
                        .filter(x => x[0] == 'box' || x[1] == 'box')

    const blockCrash = labels.find(x => x.indexOf('block') > -1)
    const floorCrash = labels.find(x => x.indexOf('floor') > -1)
    const ceilingCrash = labels.find(x => x.indexOf('ceiling') > -1)

    const crash = blockCrash || floorCrash || ceilingCrash

    if (crash) {
      let alreadyCrashed = false
      for (let body of this.state.engine.world.bodies) {
        if (body.label == 'box') {
          Matter.Body.setVelocity(body, {x: -1, y: -2})
          Matter.Body.setAngularVelocity(body, 0.05)
        } else {
          Matter.Body.setStatic(body, true)
        }
      }

      if (floorCrash) {
        alert(`You died! Score: ${this.state.score}`)
        this.setState({running: false, score: 0})
      }

      this.setState({dying: true})

    }
  }

  _handleCollisionEnd ({pairs}) {
    if (!this.state.running || this.state.dying) {
      return
    }

    const labels = pairs.map(pair => ([pair.bodyA.label, pair.bodyB.label]))
                        .filter(x => x[0] == 'box' || x[1] == 'box')

    const scoreCollision = labels.find(x => x.indexOf('score') > -1)

    if (scoreCollision) {
      this.setState({score: this.state.score + 1})
    }
  }

  async _reset () {
    // Force delete the GameEngine
    this.setState({systems: null})
    await this.forceUpdate()
    this.initGame()
    this.setState({running: true})
  }

  initGame () {
    const { width, height } = Dimensions.get("window")
    const boxSize = Math.trunc(Math.max(width, height) * 0.075)

    const engine = Matter.Engine.create({ enableSleeping: true })
    const { world } = engine
    world.gravity = { x: 0, y: 0 }

    const box = Matter.Bodies.circle(width / 2, (height - boxSize) / 2, boxSize / 2, {
      frictionAir: 0.01,
      label: 'box',
      collisionFilter: {
        mask: 0x0001,
      }
    })
    const floor = Matter.Bodies.rectangle(width / 2, height + boxSize / 2 - 4, width, boxSize, {
      label: 'floor',
      isStatic: true,
      collisionFilter: {
        category: 0x0001,
      }
    })
    const ceiling = Matter.Bodies.rectangle(width / 2, -boxSize / 2 + 4, width, boxSize, {
      isStatic: true,
      label: 'ceiling',
      collisionFilter: {
        category: 0x0001,
      }
    })

    const background = Matter.Bodies.rectangle(width / 2, height / 2, width, height, {
      isStatic: true,
      label: 'static',
      collisionFilter: {
        category: 0x0002,
      }
    })

    const constraint = Matter.Constraint.create({
      label: "Drag Constraint",
      pointA: { x: 0, y: 0 },
      pointB: { x: 0, y: 0 },
      length: 0.01,
      stiffness: 0.1,
      angularStiffness: 1
    })

    Matter.World.add(world, [box, floor, ceiling])
    Matter.World.addConstraint(world, constraint)

    Matter.Events.on(engine, 'collisionStart', this.handleCollision)
    Matter.Events.on(engine, 'collisionEnd', this.handleCollisionEnd)

    const backgroundUri = this.props.navigation.state.params ? this.props.navigation.state.params.uri : null

    const systems = [Physics, MoveBox, CleanBoxes, CreateBox]
    const entities = {
      physics: { engine, world, constraint },
      background: { body: background, size: [width, height], renderer: Background, backgroundUri },
      box: { body: box, size: [boxSize, boxSize], renderer: Ball },
      ceiling: { body: ceiling, size: [width, boxSize], renderer: Box, color: '#3949AB' },
      floor: { body: floor, size: [width, boxSize], renderer: Box, color: '#F44336' },
    }

    this.setState({
      systems,
      entities,
      engine,
    })
  }

  render() {
    const { running, initialRun, systems, entities } = this.state

    if (!systems) {
      return <View />
    }

    return (
      <GameEngine
        systems={systems}
        running={running}
        entities={entities} >
        <StatusBar hidden={true} />
        {
          running ? (
            <Text style={styles.score}>{ `Score: ${this.state.score} / 10`}</Text>
          ) : (
            <View style={styles.container}>
              <View style={styles.overlay} />
                <Icon name="md-close-circle" style={styles.backIcon} size={40} onPress={ () => this.props.navigation.replace('NewsList')} />
              {
                initialRun ? (
                  <RkButton rkType="icon" style={styles.buttonIcon} onPress={ () => this.setState({running: true, initialRun: false})}>
                    <Icon name="ios-play" style={styles.icon} size={96} iconStyle={styles.icon}/>
                  </RkButton>
                ) : (
                  <RkButton rkType="dark icon" style={styles.buttonIcon} onPress={ this.reset }>
                    <Icon name="ios-refresh" style={styles.icon} size={96} />
                  </RkButton>
                )
              }
            </View>
          )
        }
      </GameEngine>
    )
  }
}

const styles = RkStyleSheet.create(theme => ({
  score: {
    fontSize: 24,
    position: 'absolute',
    left: 12,
    top: 12,
    fontWeight: 'bold',
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'black',
    opacity: 0.8,
    ...StyleSheet.absoluteFillObject,
  },
  pauseView: {
    backgroundColor: 'green',
    borderRadius: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    padding: 0,
    margin: 0,
    color: 'white',
  },
  backIcon: {
    color: 'white',
    position: 'absolute',
    left: 12,
    top: 24,
  },
  buttonIcon: {
    height: 96,
    width: 96,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    margin: 0,
    padding: 0,
  },
}))
