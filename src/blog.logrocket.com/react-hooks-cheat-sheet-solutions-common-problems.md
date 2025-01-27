---
lang: en-US
title: "React Hooks cheat sheet: Best practices with examples"
description: "Article(s) > React Hooks cheat sheet: Best practices with examples"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > React Hooks cheat sheet: Best practices with examples"
    - property: og:description
      content: "React Hooks cheat sheet: Best practices with examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/react-hooks-cheat-sheet-solutions-common-problems.html
prev: /programming/js-react/articles/README.md
date: 2023-02-20
isOriginal: false
author:
  - name: Ohans Emmanuel
    url : https://blog.logrocket.com/author/ohansemmanuel/
cover: /assets/image/blog.logrocket.com/react-hooks-cheat-sheet-solutions-common-problems/banner.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="React Hooks cheat sheet: Best practices with examples"
  desc="Editor’s note: This React Hooks tutorial was last updated on 6 March 2023 to include more React Hooks best practices […]"
  url="https://blog.logrocket.com/react-hooks-cheat-sheet-solutions-common-problems"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/react-hooks-cheat-sheet-solutions-common-problems/banner.png"/>

::: note Editor’s note

This React Hooks tutorial was last updated on 6 March 2023 to include more React Hooks best practices and examples.

:::

![React Hooks Cheat Sheet Best Practices Examples](/assets/image/blog.logrocket.com/react-hooks-cheat-sheet-solutions-common-problems/banner.png)

React Hooks have a very simple API, but given its massive community and variety of use cases, questions are bound to arise around React Hooks best practices and how to solve common problems.

In this tutorial, we’ll outline some React Hooks best practices and highlight some use cases with examples, from simple to advanced scenarios. To help demonstrate how to solve common React Hooks questions, I built an [accompanying web app (<FontIcon icon="iconfont icon-github"/>`ohansemmanuel/react-hooks-cheatsheet`)](https://github.com/ohansemmanuel/react-hooks-cheatsheet) for live interaction with some of the examples from this article.

::: info React Hooks cheat sheet: Best practices and examples

This React Hooks cheat sheet includes a lot of code snippets and assumes some Hooks fluency. If you’re completely new to Hooks, you may want to start with our [**React Hooks API reference guide**](/blog.logrocket.com/react-reference-guide-hooks-api.md).

:::

---

## `useState`

[<FontIcon icon="fa-brands fa-react"/>`useState`](https://reactjs.org/docs/hooks-reference.html#usestate) lets you use local state within a function component. You pass the initial state to this function and it returns a variable with the current state value (not necessarily the initial state) and another function to update this value.

Check out this React `useState` video tutorial:

<VidStack src="youtube/4qVNaohzDWU" />

### Declare state variable

Declaring a state variable is as simple as calling `useState` with some initial state value, like so: `useState(initialStateValue)`.

```js
const DeclareStateVar = () => {
  const [count] = useState(100)
  return <div> State variable is {count}</div>
}
```

### Update state variable

Updating a state variable is as simple as invoking the updater function returned by the `useState` invocation: `const [stateValue, updaterFn] = useState(initialStateValue);`.

![](https://storage.googleapis.com/blog-images-backup/1*xKBiQT_91AU-PlNLGjv0Yg.gif)

Note how the age state variable is being updated.

Here’s the code responsible for the screencast above:

```js title="UpdateStateVar.js"
const UpdateStateVar = () => {
  const [age, setAge] = useState(19)
  const handleClick = () => setAge(age + 1)

  return (
    <div>
      Today I am {age} Years of Age
      <div>
        <button onClick={handleClick}>Get older! </button>
      </div>
    </div>
  )
}
```

### Why does the React `useState` Hook not update immediately?

If you find that [<FontIcon icon="fas fa-globe"/>`useState`/`setState` are not updating immediately](https://linguinecode.com/post/why-react-setstate-usestate-does-not-update-immediately), the answer is simple: they’re just queues.

React `useState` and `setState` don’t make changes directly to the state object; they create queues to optimize performance, which is why the changes don’t update immediately.

### React Hooks and multiple state variables

Multiple state variables may be used and updated from within a functional component, as shown below:

![](https://storage.googleapis.com/blog-images-backup/1*1MFDgE1LQuAc1_wyBgyVNQ.gif)

Here’s the code responsible for the screencast above:

```js :collapsed-lines title="MultipleStateVars.js"
const MultipleStateVars = () => {
  const [age, setAge] = useState(19)
  const [siblingsNum, setSiblingsNum] = 
    useState(10)

  const handleAge = () => setAge(age + 1)
  const handleSiblingsNum = () => 
      setSiblingsNum(siblingsNum + 1)
 
  return (
    <div>
      <p>Today I am {age} Years of Age</p>
      <p>I have {siblingsNum} siblings</p>

      <div>
        <button onClick={handleAge}>
          Get older! 
        </button>
        <button onClick={handleSiblingsNum}>
            More siblings! 
        </button>
      </div>
    </div>
  )
}
```

### Use object state variable

As opposed to strings and numbers, you could also use an object as the initial value passed to `useState`.

Note that you have to pass the entire object to the `useState` updater function because the object is replaced, not merged.

```js
// 🐢 setState (object merge) vs useState (object replace)
// assume initial state is {name: "Ohans"}

setState({ age: 'unknown' })
// new state object will be
// {name: "Ohans", age: "unknown"}

useStateUpdater({ age: 'unknown' })
// new state object will be
// {age: "unknown"} - initial object is replaced
```

![](https://storage.googleapis.com/blog-images-backup/1*wYJuoTiiarplOkwoG36I2A.gif)

Multiple state objects updated via a state object variable.

Here’s the code for the screencast above:

```js :collapsed-lines title="StateObject.js"
const StateObject = () => {
  const [state, setState] = useState({ age: 19, siblingsNum: 4 })
  const handleClick = val =>
    setState({
      ...state,
      [val]: state[val] + 1
    })
  const { age, siblingsNum } = state

  return (
    <div>
      <p>Today I am {age} Years of Age</p>
      <p>I have {siblingsNum} siblings</p>

      <div>
        <button onClick={handleClick.bind(null, 'age')}>Get older!</button>
        <button onClick={handleClick.bind(null, 'siblingsNum')}>
          More siblings!
        </button>
      </div>
    </div>
  )
}
```

### Initialize state from function

As opposed to just passing an initial state value, state could also be initialized from a function, as shown below:

```js title="StateFromFn.js"
const StateFromFn = () => {
  const [token] = useState(() => {
    let token = window.localStorage.getItem("my-token");
    return token || "default#-token#"
  })

  return <div>Token is {token}</div>
}
```

### Functional `setState`

The updater function returned from invoking `useState` can also take a function similar to the good ol’ `setState`:

```js
const [value, updateValue] = useState(0)
// both forms of invoking "updateValue" below are valid 👇
updateValue(1);
updateValue(previousValue => previousValue + 1);
```

This is ideal when the state update depends on some previous value of state.

![](https://storage.googleapis.com/blog-images-backup/1*uAEGQN-IESENc82FnkJUfA.gif)

A counter with functional setState updates.

Here’s the code for the screencast above:

```js title="CounterFnSetState.js"
const CounterFnSetState = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <p>Count value is: {count}</p>
      <button onClick={() => setCount(0)}>Reset</button>
      <button 
        onClick={() => setCount(prevCount => prevCount + 1)}>
        Plus (+)
      </button>
      <button 
        onClick={() => setCount(prevCount => prevCount - 1)}>
       Minus (-)
      </button>
    </>
  );
}
```

Here’s a [<FontIcon icon="fas fa-globe"/>live, editable `useState` cheat sheet](https://react-hooks-cheatsheet.com/usestate) if you want to dive deeper on your own.

---

## `useEffect`

With [<FontIcon icon="fa-brands fa-react"/>`useEffect`](https://reactjs.org/docs/hooks-reference.html#useeffect), you invoke [**side effects from within functional components**](/blog.logrocket.com/useeffect-react-hook-complete-guide.md), which is an important concept to understand in the React Hooks era.

### Basic side effect

![](https://storage.googleapis.com/blog-images-backup/1*RdkmsjpFV1_KRxtk1pRFlw.gif)

Watch the title of the document update.

Here’s the code responsible for the screencast above:

```js title="BasicEffect.js"
const BasicEffect = () => {
  const [age, setAge] = useState(0)
  const handleClick = () => setAge(age + 1)

  useEffect(() => {
    document.title = 'You are ' + age + ' years old!'
  })

  return (
    <div>
      <p> Look at the title of the current tab in your browser </p>
      <button onClick={handleClick}>Update Title!! </button>
    </div>
  )
}
```

### Effect with cleanup

It’s pretty common to clean up an effect after some time. This is possible by returning a function from within the effect function passed to `useEffect`. Below is an example with `addEventListener`.

```js title="EffectCleanup.js"
const EffectCleanup = () => {
  useEffect(() => {
    const clicked = () => console.log('window clicked')
    window.addEventListener('click', clicked)

    // return a clean-up function
    return () => {
      window.removeEventListener('click', clicked)
    }
  }, [])

  return (
    <div>
      When you click the window you'll 
      find a message logged to the console
    </div>
  )
}
```

### Multiple effects

Multiple `useEffect` calls can happen within a functional component, as shown below:

```js title="MultipleEffects.js"
const MultipleEffects = () => {
  // 🍟
  useEffect(() => {
    const clicked = () => console.log('window clicked')
    window.addEventListener('click', clicked)

    return () => {
      window.removeEventListener('click', clicked)
    }
  }, [])

  // 🍟 another useEffect hook 
  useEffect(() => {
    console.log("another useEffect call");
  })

  return (
    <div>
      Check your console logs
    </div>
  )
}
```

Note that`useEffect` calls can be skipped — i.e., not invoked on every render. This is done by passing a second array argument to the effect function.

### Skipping effects (array dependency)

```js :collapsed-lines title="ArrayDepMount.js"
const ArrayDepMount = () => {
  const [randomNumber, setRandomNumber] = useState(0)
  const [effectLogs, setEffectLogs] = useState([])

  useEffect(
    () => {
      setEffectLogs(prevEffectLogs => [...prevEffectLogs, 'effect fn has been invoked'])
    },
    []
  )

  return (
    <div>
      <h1>{randomNumber}</h1>
      <button
        onClick={() => {
          setRandomNumber(Math.random())
        }}
      >
        Generate random number!
      </button>
      <div>
        {effectLogs.map((effect, index) => (
          <div key={index}>{'🍔'.repeat(index) + effect}</div>
        ))}
      </div>
    </div>
  )
}
```

In the example above, `useEffect` is passed an array of one value: `[randomNumber]`.

Thus, the effect function will be called on mount *and* whenever a new random number is generated.

Here’s the **Generate random number** button being clicked and the effect function being rerun upon generating a new random number:

![](https://storage.googleapis.com/blog-images-backup/1*mSqiFgHeY6k84us2RBnLkg.gif)

### Skipping effects (empty array dependency)

In this example, `useEffect` is passed an empty array, `[]`. Therefore, the effect function will be called only on mount.

```js :collapsed-lines title="ArrayDepMount.js"
const ArrayDepMount = () => {
  const [randomNumber, setRandomNumber] = useState(0)
  const [effectLogs, setEffectLogs] = useState([])

  useEffect(() => {
      setEffectLogs(prevEffectLogs => [...prevEffectLogs, 'effect fn has been invoked'])
  }, [])

  return (
    <div>
      <h1>{randomNumber}</h1>
      <button
        onClick={() => {
          setRandomNumber(Math.random())
        }}
      >
        Generate random number!
      </button>
      <div>
        {effectLogs.map((effect, index) => (
          <div key={index}>{'🍔'.repeat(index) + effect}</div>
        ))}
      </div>
    </div>
  )
}
```

Here’s the button being clicked and the effect function not invoked:

![](https://storage.googleapis.com/blog-images-backup/1*VVxa13t8u8oobG_1GIM1Qw.gif)

### Skipping effects (no array dependency)

Without an array dependency, the effect function will be run after every single render.

```js
useEffect(() => {
  console.log(“This will be logged after every render!”)
})
```

Here’s a [<FontIcon icon="fas fa-globe"/>live, editable `useEffect` cheat sheet](https://react-hooks-cheatsheet.com/useeffect) if you’d like to explore further.

---

## `useContext`

[<FontIcon icon="fa-brands fa-react"/>`useContext`](https://reactjs.org/docs/hooks-reference.html#usecontext) saves you the stress of having to rely on a Context consumer. React Context has a simpler API when compared to `MyContext.Consumer` and the render props API it exposes.

Context is React’s way of [**handling shared data between multiple components**](/blog.logrocket.com/react-reference-guide-context-api.md).

The following example highlights the difference between consuming a context object value via `useContext` or `Context.Consumer`:

```js title="Button.js"
// example Context object
const ThemeContext = React.createContext("dark");

// usage with context Consumer
function Button() {
  return <ThemeContext.Consumer>
        {theme => <button className={theme}> Amazing button </button>}
  </ThemeContext.Consumer>
}

// usage with useContext hook 
import {useContext} from 'react';

function ButtonHooks() {
  const theme = useContext(ThemeContext)
  return <button className={theme}>Amazing button</button>
}
```

Here’s a live example with `useContext`:

![](https://storage.googleapis.com/blog-images-backup/1*sJEVsJmB2vHc8vqqP4nAJA.png)

And here’s the code responsible for the example above:

```js :collapsed-lines title="Display.js"
const ThemeContext = React.createContext('light');

const Display = () => {
  const theme = useContext(ThemeContext);
  return (
    <div
      style={{
        background: theme === 'dark' ? 'black' : 'papayawhip',
        color: theme === 'dark' ? 'white' : 'palevioletred',
        width: '100%',
        minHeight: '200px'
      }}
    >
      {'The theme here is ' + theme}
    </div>
  )
}
```

Here’s a live, editable [<FontIcon icon="fas fa-globe"/>React Context cheat sheet](https://react-hooks-cheatsheet.com/usecontext) if you’d like to tinker around yourself.

---

## `useLayoutEffect`

[<FontIcon icon="fa-brands fa-react"/>`useLayoutEffect`](https://reactjs.org/docs/hooks-reference.html#uselayouteffect) has the very same signature as `useEffect`. We’ll discuss the difference between `useLayoutEffect` and `useEffect` below.

```js
useLayoutEffect(() => {
  // do something
}, [arrayDependency])
```

### Similar usage as `useEffect`

Here’s the same example for `useEffect` built with `useLayoutEffect`:

![](https://storage.googleapis.com/blog-images-backup/1*a7MsYcXko93rq_9KtjiXpg.gif)

And here’s the code:

```js title="ArrayDep.js"
const ArrayDep = () => {
  const [randomNumber, setRandomNumber] = useState(0)
  const [effectLogs, setEffectLogs] = useState([])
  
  useLayoutEffect(() => {
    setEffectLogs(prevEffectLogs => [...prevEffectLogs, 'effect fn has been invoked'])
  }, [randomNumber])
  
  return (
    <div>
      <h1>{randomNumber}</h1>
      <button
        onClick={() => {
          setRandomNumber(Math.random())
        }}
      >
        Generate random number!
      </button>
      <div>
        {effectLogs.map((effect, index) => (
          <div key={index}>{'🍔'.repeat(index) + effect}</div>
        ))}
      </div>
    </div>
  )
}
```

### `useLayoutEffect` vs. `useEffect`

What’s the [**difference between `useEffect` and `useLayoutEffect`**](/blog.logrocket.com/react-useeffect-vs-uselayouteffect-hooks-examples.md)? The function passed to `useEffect` fires after layout and paint — i.e., after the render has been committed to the screen. This is OK for most side effects that shouldn’t block the browser from updating the screen.

There are cases where you may not want the behavior `useEffect` provides, though; for example, if you need to make a visual change to the DOM as a side effect, `useEffect` won’t be the best choice.

To prevent the user from seeing flickers of changes, you can use `useLayoutEffect`. The function passed to `useLayoutEffect` will be run before the browser updates the screen.

You can [**read my follow-up piece**](/blog.logrocket.com/react-useeffect-vs-uselayouteffect-hooks-examples.md) for a deep dive on the differences between `useEffect` and `useLayoutEffect`.

Here’s a live, editable [<FontIcon icon="fas fa-globe"/>`useLayoutEffect` cheat sheet](https://react-hooks-cheatsheet.com/uselayoutEffect).

---

## `useReducer`

[<FontIcon icon="fa-brands fa-react"/>`useReducer`](https://reactjs.org/docs/hooks-reference.html#usereducer) may be used as an alternative to `useState`. It’s ideal for complex state logic where there’s a dependency on previous state values or a lot of state sub-values.

Depending on your use case, you may find `useReducer` quite testable.

### Basic usage

As opposed to calling `useState`, call `useReducer` with a `reducer` and `initialState`, as shown below. The `useReducer` call returns the state property and a `dispatch` function.

![](https://storage.googleapis.com/blog-images-backup/1*BSkGtn-NIHGDIwd67NZoYQ.gif)

Increase/decrease bar size by managing state with useReducer.

Here’s the code responsible for the above screencast:

```js :collapsed-lines title="Bar.js"
const initialState = { width: 15 };

const reducer = (state, action) => {
  switch (action) {
    case 'plus':
      return { width: state.width + 15 }
    case 'minus':
      return { width: Math.max(state.width - 15, 2) }
    default:
      throw new Error("what's going on?" )
  }
}

const Bar = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return 
    <>
      <div 
        style={{ background: 'teal', height: '30px', width: state.width }}
      >
      </div>
      <div 
        style={{ marginTop: '3rem' }}
      >
        <button onClick={() => dispatch('plus')}>Increase bar size</button>
        <button onClick={() => dispatch('minus')}>Decrease bar size</button>
      </div>
    </>
}

ReactDOM.render(<Bar />)
```

### Initialize state lazily

`useReducer` takes a third function parameter. You may initialize state from this function, and whatever’s returned from this function is returned as the state object. This function will be called with `initialState` — the second parameter.

![](https://storage.googleapis.com/blog-images-backup/1*a39ldAuvYbSZ8Ney_sXaYg.gif)

Same increase/decrease bar size, with state initialized lazily.

Here’s the code for the example above:

```js :collapsed-lines title="Bar.js"
const initializeState = () => ({
  width: 100
})

// ✅ note how the value returned from the fn above overrides initialState below: 
const initialState = { width: 15 }
const reducer = (state, action) => {
  switch (action) {
    case 'plus':
      return { width: state.width + 15 }
    case 'minus':
      return { width: Math.max(state.width - 15, 2) }
    default:
      throw new Error("what's going on?" )
  }
}

const Bar = () => {
  const [state, dispatch] = useReducer(reducer, initialState, initializeState)
  return 
    <>
      <div 
        style={{ background: 'teal', height: '30px', width: state.width }}
      >
      </div>
      <div 
        style={{ marginTop: '3rem' }}
      >
        <button onClick={() => dispatch('plus')}>Increase bar size</button>
        <button onClick={() => dispatch('minus')}>Decrease bar size</button>
      </div>
    </>
}

ReactDOM.render(Bar)
```

### Imitate the behavior of `this.setState`

`useReducer` uses a reducer that isn’t as strict as Redux’s. For example, the second parameter passed to the reducer, `action`, doesn’t need to have a `type` property.

This allows for interesting manipulations, such as renaming the second parameter and doing the following:

```js :collapsed-lines title="Bar.js"
const initialState = { width: 15 }; 

const reducer = (state, newState) => ({
  ...state,
  width: newState.width
})

const Bar = () => {
  const [state, setState] = useReducer(reducer, initialState)
  return (
    <>
      <div 
        style={{ background: 'teal', height: '30px', width: state.width }}
      >
      </div>
      <div 
        style={{marginTop: '3rem'}}
      >
        <button onClick={() => setState({width: 100})}>Increase bar size</button>
        <button onClick={() => setState({width: 3})}>Decrease bar size</button>
      </div>
    </>
  )
}

ReactDOM.render(Bar)
```

![](https://storage.googleapis.com/blog-images-backup/1*WbbJWr-_PGYXndcFEZVQUw.gif)

The results remain the same with a setState-like API imitated.

Here’s an editable [<FontIcon icon="fas fa-globe"/>`useReducer` cheat sheet](https://react-hooks-cheatsheet.com/usereducer).

---

## `useCallback`

[<FontIcon icon="fa-brands fa-react"/>`useCallback`](https://reactjs.org/docs/hooks-reference.html#usecallback) returns a [<FontIcon icon="fa-brands fa-wikipedia-w"/>memoized](https://en.wikipedia.org/wiki/Memoization) callback. Wrapping a component with `React.Memo()` signals the intent to reuse code. This does not automatically extend to functions passed as parameters.

React [**saves a reference to the function when wrapped with `useCallback`**](/blog.logrocket.com/react-usememo-vs-usecallback-a-pragmatic-guide.md#whatis). Pass this reference as a property to new components to reduce rendering time.

### `useCallback` example

The following example will form the basis of the explanations and code snippets that follow.

![](https://storage.googleapis.com/blog-images-backup/1*Iy316AxOQNNXEcMHKeGw7w.gif)

And here’s the code:

```js :collapsed-lines title="App.js"
const App = () => {
  const [age, setAge] = useState(99)
  const handleClick = () => setAge(age + 1)
  const someValue = "someValue"
  const doSomething = () => {
    return someValue
  }
  
  return (
    <div>
      <Age age={age} handleClick={handleClick}/>
      <Instructions doSomething={doSomething} />
    </div>
  )
}

const Age = ({ age, handleClick }) => {
  return (
    <div>
      <div 
        style={{ border: '2px', background: "papayawhip", padding: "1rem" }}
      >
        Today I am {age} Years of Age
      </div>
      <pre> - click the button below 👇 </pre>
      <button onClick={handleClick}>Get older! </button>
    </div>
  )
}

const Instructions = React.memo((props) => {
  return (
    <div 
      style={{ background: 'black', color: 'yellow', padding: "1rem" }}
    >
      <p>Follow the instructions above as closely as possible</p>
    </div>
  )
})

ReactDOM.render(<App />)
```

In the example above, the parent component, `<Age />`, is updated (and re-rendered) whenever the **Get older** button is clicked.

Consequently, the `<Instructions />` child component is also re-rendered because the `doSomething` prop is passed a new callback with a new reference.

Note that even though the `Instructions` child component uses `React.memo` to optimize performance, it is still re-rendered.

How can this be fixed to prevent `<Instructions />` from re-rendering needlessly?

### `useCallback` with referenced function

```js :collapsed-lines title="App.js"
const App = () => {
  const [age, setAge] = useState(99)
  const handleClick = () => setAge(age + 1)
  const someValue = "someValue"
  const doSomething = useCallback(() => {
    return someValue
  }, [someValue])

  return (
    <div>
      <Age age={age} handleClick={handleClick} />
      <Instructions doSomething={doSomething} />
    </div>
  )
}

const Age = ({ age, handleClick }) => {
  return (
    <div>
      <div 
        style={{ border: '2px', background: "papayawhip", padding: "1rem" }}
      >
        Today I am {age} Years of Age
      </div>
      <pre> - click the button below 👇 </pre>
      <button onClick={handleClick}>Get older! </button>
    </div>
  )
}

const Instructions = React.memo((props) => {
  return (
    <div 
      style={{ background: 'black', color: 'yellow', padding: "1rem" }}
    >
      <p>Follow the instructions above as closely as possible</p>
    </div>
  )
})

ReactDOM.render(<App />)
```

### `useCallback` with inline function

`useCallback` also works with an inline function as well. Here’s the same solution with an inline `useCallback` call:

```js :collapsed-lines title="App.js"
const App = () => {
  const [age, setAge] = useState(99)
  const handleClick = () => setAge(age + 1)
  const someValue = "someValue"

  return (
    <div>
      <Age age={age} handleClick={handleClick} />
      <Instructions doSomething={useCallback(() => {
        return someValue
      }, [someValue])} />
    </div>
  )
}

const Age = ({ age, handleClick }) => {
  return (
    <div>
      <div 
        style={{ border: '2px', background: "papayawhip", padding: "1rem" }}
      >
        Today I am {age} Years of Age
      </div>
      <pre> - click the button below 👇 </pre>
      <button onClick={handleClick}>Get older! </button>
    </div>
  )
}

const Instructions = memo((props) => {
  return (
    <div 
      style={{ background: 'black', color: 'yellow', padding: "1rem" }}
    >
      <p>Follow the instructions above as closely as possible</p>
    </div>
  )
})

render(<App />)
```

Here’s [<FontIcon icon="fas fa-globe"/>live, editable `useCallback` cheat sheet](https://react-hooks-cheatsheet.com/usecallback).

---

## `useMemo`

The [<FontIcon icon="fa-brands fa-react"/>`useMemo`](https://reactjs.org/docs/hooks-reference.html#usememo) function returns a memoized value. [**`useMemo` is different from `useCallback`**](/blog.logrocket.com/react-usememo-vs-usecallback-a-pragmatic-guide.md) in that it internalizes return values instead of entire functions. Rather than passing a handle to the same function, React skips the function and returns the previous result, until the parameters change.

This allows you to avoid repeatedly performing potentially costly operations until necessary. Use this method with care, as any changing variables defined in the function do not affect the behavior of `useMemo`. If you’re performing timestamp additions, for instance, this method does not care that the time changes, only that the function parameters differ.

### `useMemo` example

The following example will form the basis of the explanations and code snippets that follow.

![](https://storage.googleapis.com/blog-images-backup/1*jlGFv-2D2Yu6VoSGx5Fu3w.png)

Here’s the code responsible for the screenshot above:

```js
const App = () => {
    const [age, setAge] = useState(99)
    const handleClick = () => setAge(age + 1)
    const someValue = { value: "someValue" }
    const doSomething = () => {
      return someValue
    }
  
    return (
      <div>
        <Age age={age} handleClick={handleClick}/>
        <Instructions doSomething={doSomething} />
      </div>
    )
}

const Age = ({ age, handleClick }) => {
  return (
    <div>
      <div 
        style={{ border: '2px', background: "papayawhip", padding: "1rem" }}
      >
       Today I am {age} Years of Age
      </div>
      <pre> - click the button below 👇 </pre>
      <button onClick={handleClick}>Get older! </button>
    </div>
  )
}

const Instructions = React.memo((props) => {
  return (
    <div
      style={{ background: 'black', color: 'yellow', padding: "1rem" }}
    >
      <p>Follow the instructions above as closely as possible</p>
    </div>
  )
})

ReactDOM.render(<App />)
```

The example above is similar to the one for `useCallback`. The only difference here is that `someValue` is an object, *not* a string. Owing to this, the `Instructions` component still re-renders despite the use of `React.memo`.

Why? Objects are compared by reference, and the reference to `someValue` changes whenever `<App />` re-renders.

Any solutions?

### Basic usage

The object `someValue` may be memoized using `useMemo`. This prevents the needless re-render.

```js
const App = () => {
  const [age, setAge] = useState(99)
  const handleClick = () => setAge(age + 1)
  const someValue = useMemo(() => ({ value: "someValue" }))
  const doSomething = () => {
    return someValue
  }
  
  return (
    <div>
      <Age age={age} handleClick={handleClick}/>
      <Instructions doSomething={doSomething} />
    </div>
  )
}

const Age = ({ age, handleClick }) => {
  return (
    <div>
      <div 
        style={{ border: '2px', background: "papayawhip", padding: "1rem" }}
      >
        Today I am {age} Years of Age
      </div>
      <pre> - click the button below 👇 </pre>
      <button onClick={handleClick}>Get older! </button>
    </div>
  )
}

const Instructions = React.memo((props) => {
  return (
    <div
      style={{ background: 'black', color: 'yellow', padding: "1rem" }}
    >
      <p>Follow the instructions above as closely as possible</p>
    </div>
  )
})

ReactDOM.render(<App />)
```

Here’s a [<FontIcon icon="fas fa-globe"/>live, editable `useMemo` demo](https://react-hooks-cheatsheet.com/usememo).

---

## `useRef`

[<FontIcon icon="fa-brands fa-react"/>`useRef`](https://reactjs.org/docs/hooks-reference.html#useref) returns a “ref” object. Values are accessed from the `.current` property of the returned object. The `.current` property could be initialized to an initial value — `useRef(initialValue)`, for example. The object is persisted for the entire lifetime of the component.

Learn more in this [**comprehensive `useRefs` guide**](/blog.logrocket.com/complete-guide-react-refs.md) or check out our `useRefs` video tutorial:

### Accessing the DOM

Consider the sample application below:

![](https://storage.googleapis.com/blog-images-backup/1*HpWEeuuijusQkO9mT5ohXw.gif)

Accessing the DOM via useRef.

Here’s the code responsible for the screencast above:

```js :collapsed-lines title="AccessDOM.jsx"
const AccessDOM = () => {
  const textAreaEl = useRef(null);
  const handleBtnClick = () => {
    textAreaEl.current.value =
    "The is the story of your life. You are an human being, and you're on a website about React Hooks";
    textAreaEl.current.focus();
  };

  return (
    <section 
      style={{ textAlign: "center" }}
    >
      <div>
        <button onClick={handleBtnClick}>Focus and Populate Text Field</button>
      </div>
      <label
        htmlFor="story"
        style={{
          display: "block",
          background: "olive",
          margin: "1em",
          padding: "1em"
        }}
      >
        The input box below will be focused and populated with some text
        (imperatively) upon clicking the button above.
      </label>
      <textarea ref={textAreaEl} id="story" rows="5" cols="33" />
    </section>
  );
};
```

### Instance-like variables (generic container)

Other than just holding DOM refs, the “ref” object can hold any value. Consider a similar application below, where the ref object holds a string value:

![](https://storage.googleapis.com/blog-images-backup/1*jLxqYWFdw0LDl8_axo5hMw.gif)

Here’s the code:

```js :collapsed-lines title="HoldStringVal.jsx"
const HoldStringVal = () => {
    const textAreaEl = useRef(null);
    const stringVal = useRef("This is a string saved via the ref object --- ")
    const handleBtnClick = () => {
      textAreaEl.current.value =
      stringVal.current + "The is the story of your life. You are an human being, and you're on a website about React Hooks";
      textAreaEl.current.focus();
    };
    return (
      <section style={{ textAlign: "center" }}>
        <div>
          <button onClick={handleBtnClick}>Focus and Populate Text Field</button>
        </div>
        <label
          htmlFor="story"
          style={{
            display: "block",
            background: "olive",
            margin: "1em",
            padding: "1em"
          }}
        >
          Prepare to see text from the ref object here. Click button above.
        </label>
        <textarea ref={textAreaEl} id="story" rows="5" cols="33" />
      </section>
    );
  };
```

You could do the same as storing the return value from a `setInterval` for cleanup.

```js title="TimerWithRefID.jsx"
function TimerWithRefID() {
  const setIntervalRef = useRef();

  useEffect(() => {
    const intervalID = setInterval(() => {
      // something to be done every 100ms
    }, 100);

    // this is where the interval ID is saved in the ref object 
    setIntervalRef.current = intervalID;
    return () => {
      clearInterval(setIntervalRef.current);
    };
  });
}
```

### Other examples

Working on a near-real-world example can help bring your knowledge of Hooks to life. Until data fetching with React Suspense is released, fetching data via Hooks proves to be a good exercise for more Hooks practice.

Below’s an example of fetching data with a loading indicator:

![](https://storage.googleapis.com/blog-images-backup/1*sr9I9TkSj8GCgSI411rGPA.gif)

The code appears below:

```js
const fetchData = () => {
  const stringifyData = data => JSON.stringify(data, null, 2)
  const initialData = stringifyData({ data: null })
  const loadingData = stringifyData({ data: 'loading...' })
  const [data, setData] = useState(initialData)

  const [gender, setGender] = useState('female')
  const [loading, setLoading] = useState(false)

  useEffect(
    () => {
      const fetchData = () => {
        setLoading(true)
        const uri = 'https://randomuser.me/api/?gender=' + gender
        fetch(uri)
          .then(res => res.json())
          .then(({ results }) => {
            setLoading(false)
            const { name, gender, dob } = results[0]
            const dataVal = stringifyData({
              ...name,
              gender,
              age: dob.age
            })
            setData(dataVal)
          })
      }
      fetchData()
    },
    [gender]
  )

  return (
    <>
      <button
        onClick={() => setGender('male')}
        style={{ outline: gender === 'male' ? '1px solid' : 0 }}
      >
        Fetch Male User
      </button>
      <button
        onClick={() => setGender('female')}
        style={{ outline: gender === 'female' ? '1px solid' : 0 }}
      >
        Fetch Female User
      </button>

      <section>
        {loading ? <pre>{loadingData}</pre> : <pre>{data}</pre>}
      </section>
    </>
  )
}
```

Here’ a [<FontIcon icon="fas fa-globe"/>live, editable `useRef` cheat sheet](https://react-hooks-cheatsheet.com/useRef).

---

## `useTransition`

The key to understanding the `useTransition` Hook is that it prioritizes state change. By default, any state change in React is given a high priority. However, when you transition a state change (maybe because of heavy computation), you’re telling React to give that state change a lower priority, meaning all other state change would run and render on the screen before the transitioned state change would run.

### Marking state as transition

Marking a state as transition is as simple as passing a synchronous function with the state you want to transition into the `startTransition` function returned by the `useTransition` Hook:

```js title="App.js"
import { useTransition } from 'react';

const App = () => {
  const [timeUpdate, setTimeUpdate] = useState(2)
  const [isPending, startTransition] = useTransition()

  startTransition(() => {
    // handle state change in here
  })
}
```

The `isPending` flag returns `true` or `false` indicating whether or not there is a pending transition, and we use the `startTransition` function to mark a state change as a transition.

### Difference between `useTransition` and regular state update

State updates placed inside the `useTransition` Hook are given a low priority, while regular state updates are given a higher priority.

So think of `useTransition` as a React Hook that lets you update the state without blocking the UI.

Let’s take a look at an example.

#### Changing state without transition

I have created a [<FontIcon icon="fas fa-globe"/>CodeSandbox](https://codesandbox.io/s/compassionate-browser-ieidgo?file=/src/App.js) that makes two state updates:

1. Updating the `textInput` state upon user input
2. Looping and updating the `listItems` state with the currently entered user input

`React` has a mechanism called “batching” that allows it to combine multiple state changes into a single update to the component’s state.

When you call `setState` in a React component, React does not immediately update the component’s state. Instead, it schedules a state update to be processed later. If you call `setState` multiple times within the same event loop, React will batch these updates together into a single update before applying them to the component’s state and triggering a re-render.

That’s why in this example our `setTextInput` state doesn’t trigger a re-render until after we’re done looping and updating the `setListItems` state then a render is triggered. This makes our application act a bit sluggish.

Now, let’s look at the same example but this time, we’ll transition the state change that has heavy computation.

#### Changing state with transition

As we can see in this [<FontIcon icon="fas fa-globe"/>CodeSandbox](https://codesandbox.io/s/nostalgic-cdn-002eg9?file=/src/App.js), there’s a significant improvement in our application. In this example we’re telling `react` to give `setListItems` state update a lower priority seeing as it requires a heavy computation. This means that `setTextInput` state would trigger a re-render upon state change and not have to be batched with the `setListItem` state change.

::: note N.B.

If a state update causes a component to suspend, that state update should be wrapped in a transition

:::

---

## `useDeferredValue`

The `useDeferredValue` Hook is a new addition to React 18, and it offers developers a powerful new tool for optimizing their applications. `useDeferredValue` allows you to defer the rendering of a value until a future point in time, which can be incredibly useful in situations where you want to avoid unnecessary rendering.

Here’s the sample syntax code:

```js title="App.js"
import { useDeferredValue } from 'react'

const App = () => {
  const [valueToDefer, setValueToDefer] = useState("")
  const deferredValue = useDeferredValue(valueToDefer)

  return (
    <p>{deferredValue}</p>
  )
}
```

All we have to do is pass the value we want to defer into the `useDeferredValue` Hook.

One of the most common use cases for the `useDeferredValue` Hook is when you have a large number of updates occurring at once. For example, imagine you have a search bar in your application that updates in real time as the user types. If the user is a fast typist, this could result in dozens, or even hundreds, of updates occurring in rapid succession. Without any optimization, this could cause your application to slow down.

By using the `useDeferredValue` Hook, you can avoid this problem by deferring the rendering of the search results until the user stops typing. This is similar to how [**debouncing**](/freecodecamp.org/debouncing-explained.md) works; it can dramatically improve performance.

Let’s demonstrates this use case with an example:

```jsx :collapsed-lines title="Search.jsx"
const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const deferredSearchQuery = useDeferredValue(searchQuery);

  useEffect(() => {
    // Fetch search results using deferredSearchQuery
    // Update setSearchResults with the new results
  }, [deferredSearchQuery]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <input type="text" value={searchQuery} onChange={handleSearchInputChange} />
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

Here, we’re using the `useDeferredValue` Hook to defer the rendering of the search results until after the user stops typing in the search bar. This helps to reduce unnecessary re-renders and improve performance.

---

## `useId`

`useId` is a React Hook that is used to generate unique IDs. This can be valuable in a number of scenarios, such as generating unique IDs for accessibility attributes.

Here’s the sample syntax code:

```js title="App.jsx"
import { useId } from 'react'

const App = () => {
const id = useId()

return (
  <input type="text" id={id} />
  )
}
```

Now, let’s look at a use case. Here’s an example of a scenario using the `useId` Hook with a `TextField` component:

```js title="TextField.jsx"
const TextField = () => {
  return(
    <>
      <label htmlFor="name" /> 
      <input type="text" id="name"/>
    </>
  )
}
```

We’ll use the `TextField` component a couple times in our `App` component below:

```js title="App.js"
const App = () => {
  return (
    <div className="inputs">
      <TextField />
      <TextField />
    </div>
  )
}
```

To link a `label` element to an `input` field, we use the `id` and `htmlFor` attribute. This will cause the browser to associate a particular `label` element with a particular `input` field. If we were working with plain `HTML`, this wouldn’t be necessary — instead, we could simply duplicate the elements and change the attributes.

However, in our example above we created a reusable `TextField` component and we’re using this component twice in our `App` component. Since the attributes on the element in the `TextField`  
are static, every time we render the component, the attributes remain the same.

We can fix this by using the `useId` Hook. Let’s modify the `TextField` component, like so:

```js title="TextField.jsx"
const TextField = () => {
  const id = useId();
  return (
    <>
      <label htmlFor={id} /> 
      <input type="text" id={id}/>
    </>
  )
}
```

Now, every time we call the `TextInput` component, a unique ID will be associated with the elements that are rendered.

---

## Conclusion

Hooks give a lot of power to functional components. I hope this cheat sheet proves useful in your day-to-day use of React Hooks.

![](https://storage.googleapis.com/blog-images-backup/1*ag8EVnHaBiQECo2yXC49Mw.png)

**_Thanks to Hooks and a couple other new React features. Illustration by me_**

Cheers!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "React Hooks cheat sheet: Best practices with examples",
  "desc": "Editor’s note: This React Hooks tutorial was last updated on 6 March 2023 to include more React Hooks best practices […]",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/react-hooks-cheat-sheet-solutions-common-problems.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
