import json
import os

# define the Joke class to make storing the loaded jokes easier later on
class Joke(object):
    first = ""
    second = None

# list the data files present on the disk
f = []
for (base, directories, files) in os.walk("./data"):
    f.extend(files)
    break

# sort the files by name (naively, but it works well enough for our purposes)
f.sort()

# loop through the files and read them all into memory
lines = []
for file in f:
    # open the file, read it into memory, and then close it once done
    with open("./data/%s" % file, "r") as f:
        lines.extend(f.read().split("\n"))

# loop through the loaded lines to find all jokes
jokes = []
joke = None
for line in lines:
    # check if the line is empty
    if not line:
        # check if a joke had been started previously
        if joke is not None:
            # add the joke to the list (as a dictionary) and reset it for the next one
            jokes.append(joke.__dict__)
            joke = None

        # stop processing the line - it's empty
        continue

    # check if a joke had been started previously
    if joke is not None:
        # add the line as the second line of the joke
        joke.second = line
    else:
        # create a new Joke object with the line as the first string
        joke = Joke()
        joke.first = line

# create the output file, encode the jokes as JSON, and write the data to the file
with open("./public/jokes.json", "w") as f:
    f.write(json.dumps(jokes))
