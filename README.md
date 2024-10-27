# Daniel's Jokes
This project is designed to present my collection of stupid jokes to any person willing to endure the pain of reading
pun after pun on repeat. The jokes are not original by any means, but the script used to gather them all and the site
they are displayed with was all written just for this.

## Adding Jokes
Want to add a joke of your own? It's really simple. Create a text file in the data directory, copying the format of the
existing ones. Jokes can be one or two lines, with the punchline on the second line when possible. Empty lines are used
to separate the jokes from each other.

An example single line joke is:

```
I was going to tell a time-traveling joke, but you didn't like it.
```

An example joke with a separate punchline is:

```
Why do frogs never park illegally?
They are afraid of getting toad.
```

If both existed in the same file, they should be separated as such:

```
I was going to tell a time-traveling joke, but you didn't like it.

Why do frogs never park illegally?
They are afraid of getting toad.
```

**Note**: the script is designed to gather jokes from the files in the `data` directory, but makes no effort to search
any folders inside of it. You must adjust the script if you wish to organize jokes into directories.

## License
Daniel's Jokes is open-source software released under the [MIT License][1].

[1]: https://choosealicense.com/licenses/mit/
