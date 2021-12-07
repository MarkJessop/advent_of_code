const fs = require('fs-extra')
const _ = require('lodash')

class SolutionA{
  constructor(crabs){
    this.crabs = crabs.map(crabPosition => {
      return parseInt(crabPosition)
    })
    this.crabs = this.crabs.sort((a,b) => {
      return a-b
    })
  }

  solve(){
    let min = _.min(this.crabs)
    let max = _.max(this.crabs)

    let position = this.findBestPosition(min, max, this.crabs)
    console.log(position)
  }

  findBestPosition(min, max, crabList){
    let possiblePositions = Array(max-min).fill(0)

    possiblePositions = possiblePositions.map((fuel, position) => {
      crabList.forEach(crabPosition => {
        let fuelNeeded = Math.abs(crabPosition - position)
        fuel += fuelNeeded
      })
      return fuel
    })

    let lowestFuelCost = _.min(possiblePositions)
    return lowestFuelCost

  }
}

class SolutionB {
  constructor(crabs){
    this.crabs = crabs.map(crabPosition => {
      return parseInt(crabPosition)
    })
    this.crabs = this.crabs.sort((a,b) => {
      return a-b
    })
  }

  solve(){
    let min = _.min(this.crabs)
    let max = _.max(this.crabs)

    let position = this.findBestPosition(min, max, this.crabs)
    console.log(position)
  }

  findBestPosition(min, max, crabList){
    let possiblePositions = Array(max-min).fill(0)

    possiblePositions = possiblePositions.map((fuel, position) => {
      crabList.forEach(crabPosition => {
        let positionsToMove = Math.abs(crabPosition - position)
        fuel += this.calculateFuelCost(positionsToMove)
      })
      return fuel
    })

    let lowestFuelCost = _.min(possiblePositions)
    return lowestFuelCost
  }

  calculateFuelCost(positionsToMove){
    return (positionsToMove/2)*(1+positionsToMove)
  }
}


(async() => {
  let input = await (await fs.readFile('./data/dec_7_input')).toString('utf-8')
  let crabs = input.split(',')

  new SolutionB(crabs).solve()
})()