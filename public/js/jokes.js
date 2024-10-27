let jokes = []
let current = -1

function refreshJoke() {
  // check if any jokes are loaded into memory
  if (jokes.length == 0) {
    // update the page with a null joke
    updateJoke(null)
    return
  }

  // loop until we find a random index that is not the previous number
  let index = -1
  while (current == index || index == -1) {
    // generate a random value between 0 and len(jokes)
    index = Math.floor(Math.random() * jokes.length)
  }

  // update the current index and show the joke on the page
  current = index
  updateJoke(jokes[index])
}

async function loadJokes() {
  try {
    // fetch the JSON file of jokes
    const response = await fetch("/jokes.json")
    if (!response.ok) {
      // show an error on the page in the form of a joke
      updateJoke({first: "The list of jokes could not be loaded, sorry", second: `Response status is ${response.status}`})
    }

    // parse the response data as JSON and store the resulting object for later
    jokes = await response.json()
  } catch (error) {
    // show an error on the page in the form of a joke
    updateJoke({first: "The list of jokes could not be loaded, sorry", second: error.message})

    // log the message in the console
    console.error(error.message)
  }
}

function updateJoke(joke) {
  // find the first and second line elements on the page
  let first = document.getElementById("first")
  let second = document.getElementById("second")

  // check if a joke was specified
  if (joke == null) {
    first.innerText = "The joke list is empty, sorry"
    second.innerText = null
  } else {
    first.innerText = joke.first

    // check if the joke has a second line
    if (undefined !== typeof(joke.second) && joke.second) {
      second.innerText = joke.second
    } else {
      // clear the second line when the joke does not have one
      second.innerText = null
    }
  }
}


// define the event handler to run when the page loads
window.onload = async (event) => {
  // load the jokes into memory
  await loadJokes()

  // refresh the joke displayed on the page
  refreshJoke()
}
