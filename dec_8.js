const fs = require('fs-extra')
const readline = require('readline');
const uniqueNumberLengths = [2,3,4,7]

class SolutionA{
  constructor(inputPath){
    this.inputPath = inputPath
  }

  async solve(){
    const fileStream = fs.createReadStream(this.inputPath);

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    let counter = 0
    for await (const line of rl) {
      let parsedInputLine = line.toString('utf-8').split (' | ')
      let outputs = parsedInputLine[1].split(' ')

      outputs.forEach(output => {
        if (uniqueNumberLengths.indexOf(output.length) != -1) counter++
      })
    }

    console.log("Number of unique values", counter)
  }
}


(async() => {
  // let input = await (await fs.readFile('./data/dec_8_input')).toString('utf-8')

  await (new SolutionA('./data/dec_8_input')).solve()
})()