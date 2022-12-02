# Fullstack Open - Part7: React router, custom hooks, styling app with CSS and webpack
Part 7 of the Full Stack online course https://fullstackopen.com/en/part7

## Exercise 7.1: routed anecdotes, step1
**Task:**
Add React Router to the application so that by clicking links in the Menu component the view can be changed.

At the root of the application, meaning the path /, show the list of anecdotes.

The Footer component should always be visible at the bottom.

The creation of a new anecdote should happen e.g. in the path create.

**Solution:**
Implemented as instructed.

## Exercise 7.2: routed anecdotes, step2
**Task:**
Implement a view for showing a single anecdote.

Navigating to the page showing the single anecdote is done by clicking the name of that anecdote.

**Solution:**
Implemented as instructed together with the previous exercise.

## Exercise 7.3: routed anecdotes, step3
**Task:**
The default functionality of the creation form is quite confusing, because nothing seems to be happening after creating a new anecdote using the form.

Improve the functionality such that after creating a new anecdote the application transitions automatically to showing the view for all anecdotes and the user is shown a notification informing them of this successful creation for the next five seconds

**Solution:**
Implemented as instructed.

## Exercise 7.4: anecdotes and hooks step1
**Task:**
Simplify the anecdote creation form of your application with the useField custom hook we defined earlier.

One natural place to save the custom hooks of your application is in the /src/hooks/index.js file.

If you use the named export instead of the default export:
```
import { useState } from 'react'

export const useField = (type) => {
const [value, setValue] = useState('')

const onChange = (event) => {
setValue(event.target.value)
}

return {
type,
value,
onChange
}
}

// modules can have several named exports
export const useAnotherHook = () => {
// ...
}
```
Then importing happens in the following way:
```
import  { useField } from './hooks'

const App = () => {
// ...
const username = useField('text')
// ...
}
```

**Solution:**
Implemented as instructed.

## Exercise 7.5: anecdotes and hooks step2
**Task:**
Add a button to the form that you can use to clear all the input fields.
Expand the functionality of the useField hook so that it offers a new reset operation for clearing the field.

Depending on your solution, you may see the following warning in your console:
<picture showing Invalid value for prop reset error in console>

We will return to this warning in the next exercise.

**Solution:**
Implemented as instructed, got the error in console. Replaced form onSubmit action with click action for creating new anecdotes.