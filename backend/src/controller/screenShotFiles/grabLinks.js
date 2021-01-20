
let grapFromOut = (array) => {
  return new Promise((resolve) => {
    let links = []
    let keys = Object.keys(array);
    for (let i = 0; i < keys.length; i++) {
      links.push(array[`${i}`]['url'])
    }
    resolve(links)
  })
}

exports.links = grapFromOut