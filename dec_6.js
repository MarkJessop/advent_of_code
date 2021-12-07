const fs = require('fs-extra')

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

(async() => {
    let input = await (await fs.readFile('./data/dec_6_input')).toString('utf-8')
    let lanternfishes = input.split(',')

    new SolutionA(lanternfishes).solve()
})()