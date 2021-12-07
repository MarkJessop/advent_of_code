const fs = require('fs-extra')
const _ = require('lodash')

// a laternfish procudes a fish every 7 days
// the fist cycle starts after 9 days

class Lanternfish {
    constructor(daysToCreateNew){
        this.daysToCreateNew = parseInt(daysToCreateNew) || 8
    }

    breed() {
        this.daysToCreateNew = 6
        return new Lanternfish()
    }

    dayTick(){
        if (this.daysToCreateNew == 0) {
            return this.breed()
        } else {
            this.daysToCreateNew--
        }
    }
}

class SolutionA {
    constructor(lanternfishes){
        this.lanternfishes = lanternfishes.map(fishInput => {
            return new Lanternfish(fishInput)
        })
    }

    solve() {
        [...Array(80).keys()].forEach(day => {
            this.lanternfishes.forEach(fish => {
                let newFish = fish.dayTick()
                if (newFish) this.lanternfishes.push(newFish)
            })
        })

        console.log(this.lanternfishes.length)
    }
}

class LanternfishColony{
    constructor(lanternfishes){
        this.lanternfishes = Array(9).fill(0)
        lanternfishes.forEach(fish => {
            this.lanternfishes[fish]++
        })
    }

    dayTick(){
        this.lanternfishes = this.lanternfishes.map((numberFishOnDay, daysToCreateNew, lanterfishes) => {
            switch (daysToCreateNew){
                case 6:
                    return lanterfishes[daysToCreateNew + 1] + lanterfishes[0]
                case 8:
                    return lanterfishes[0]
                default:
                    return lanterfishes[daysToCreateNew + 1]
            }
        })
    }

    total(){
        return _.sum(this.lanternfishes)
    }
}


class SolutionB {
    constructor(lanterfishes){
        this.lanternfishColony = new LanternfishColony(lanterfishes)
    }

    solve() {
        [...Array(256).keys()].forEach(day => {
            this.lanternfishColony.dayTick()
        })

        console.log(this.lanternfishColony.total())
    }
}

(async() => {
    let input = await (await fs.readFile('./data/dec_6_input')).toString('utf-8')
    let lanternfishes = input.split(',')

    new SolutionB(lanternfishes).solve()
})()