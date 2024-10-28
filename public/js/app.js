// JokeManager handles all joke-related aspects of the app
class JokeManager {
  #current = -1
  #jokes = []

  async load() {
    try {
      // fetch the jokes from the server and check for errors
      let response = await fetch("jokes.json")
      if (!response.ok) {
        console.error(`failed to fetch the jokes: ${response.statusText}`)
        return {
          ok: false,
          message: response.statusText,
          status: response.status,
        }
      }

      // parse the jokes as JSON and store them for later use
      this.#jokes = await response.json()
      return {
        ok: true,
      }
    } catch (error) {
      console.error(`failed to fetch the jokes: ${error.message}`)
      return {
        ok: false,
        message: error.message,
      }
    }
  }

  pick() {
    // check if the jokes have been loaded
    if (this.#jokes.length === 0) {
      // there are no jokes to choose from
      return null
    }

    // check if there is only a single joke loaded
    if (this.#jokes.length === 1) {
      // there is only a single joke to choose from
      return this.#jokes[0]
    }

    // loop until we have a valid joke that is not the current one
    let index = -1
    while (index < 0 || this.#current === index) {
      index = Math.floor(Math.random() * this.#jokes.length)
    }

    // update the current index value and return the joke
    this.#current = index
    return this.#jokes[index]
  }

  refresh() {
    // pick a new joke to display
    let joke = this.pick()

    // find the two line elements on the page
    let one = document.getElementById("line-one")
    let two = document.getElementById("line-two")

    // put the first line of the joke on the page
    one.innerText = joke.first

    // put the second line of the joke on the page, if present, or put a single space (to preserve spacing without CSS)
    if (undefined !== typeof(joke.second) && joke.second) {
      two.innerText = joke.second
    } else {
      two.innerHTML = "&nbsp;"
    }
  }
}

// initiate a joke manager for later use
let manager = new JokeManager()

// add the onload handler to load the jokes and display one
window.onload = async () => {
  // load the jokes using the joke manager
  let result = await manager.load()

  // check if the jokes were loaded without errors
  if (!result.ok) {
    // TODO: display an error for the user - it has already been logged
    return
  }

  // refresh the joke displayed on the page
  manager.refresh()
}
