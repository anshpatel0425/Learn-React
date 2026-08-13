# Redux Toolkit — Quick Revision Notes

> **Source:** Chai aur Code — Redux Toolkit Crash Course  
> **Video:** https://youtu.be/1i04-A7kfFI

These notes focus only on the Redux Toolkit concepts and Todo project covered in the video.

---

## 1. Redux

Redux is used for managing application state.

The main idea is to keep shared state in a central store instead of managing separate copies across components.

```text
Components
    ↓
 dispatch
    ↓
 Action
    ↓
 Reducer
    ↓
 Store
    ↓
 Updated State
```

---

## 2. Redux Toolkit

Redux Toolkit provides a simpler way to write Redux logic.

Important pieces used in the project:

- `configureStore`
- `createSlice`
- `useDispatch`
- `useSelector`

---

## 3. Store

The **store** is the central place where application state is kept.

```jsx
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        todos: todoReducer,
    },
});
```

Think:

```text
Store
  ↓
Central state
  ↓
Application components
```

---

## 4. createSlice()

`createSlice()` creates a slice of Redux state.

A slice contains:

- `name`
- `initialState`
- `reducers`

Example:

```jsx
import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [],
};

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            // logic
        },

        removeTodo: (state, action) => {
            // logic
        },
    },
});
```

---

## 5. Initial State

The initial state defines the starting data.

```jsx
const initialState = {
    todos: [],
};
```

---

## 6. Reducers

Reducers contain the logic that changes state.

For the Todo project, the important operations are:

```text
addTodo
removeTodo
```

Example:

```jsx
addTodo: (state, action) => {
    state.todos.push(action.payload);
}
```

The reducer receives:

```text
state
action
```

---

## 7. Action Payload

Data sent with an action is available through:

```jsx
action.payload
```

Example:

```jsx
dispatch(addTodo({
    text: "Learn Redux"
}));
```

The reducer can use:

```jsx
action.payload
```

to get that data.

---

## 8. nanoid()

The project uses `nanoid()` to create a unique ID for a Todo.

```jsx
const todo = {
    id: nanoid(),
    text: action.payload,
};
```

---

## 9. Export Actions and Reducer

Export the generated actions:

```jsx
export const { addTodo, removeTodo } = todoSlice.actions;
```

Export the reducer:

```jsx
export default todoSlice.reducer;
```

The reducer is then connected to the store.

---

## 10. Provider

Redux is connected to React using `Provider`.

```jsx
import { Provider } from "react-redux";

<Provider store={store}>
    <App />
</Provider>
```

Components inside the Provider can access the Redux store.

---

## 11. useDispatch()

`useDispatch()` is used to send actions to Redux.

```jsx
import { useDispatch } from "react-redux";

const dispatch = useDispatch();
```

Then:

```jsx
dispatch(addTodo("Learn Redux"));
```

Flow:

```text
Component
    ↓
dispatch()
    ↓
Action
    ↓
Reducer
    ↓
State changes
```

---

## 12. useSelector()

`useSelector()` reads data from the Redux store.

```jsx
import { useSelector } from "react-redux";

const todos = useSelector((state) => state.todos);
```

Flow:

```text
Redux Store
     ↓
useSelector()
     ↓
Component
```

---

# Todo Project — How to Think About It

The project demonstrates Redux Toolkit through a Todo application.

Main operations:

```text
Add Todo
Remove Todo
Display Todos
```

---

## Step 1 — Create the Todo Slice

Create a Todo slice containing:

```text
initialState
    +
addTodo
    +
removeTodo
```

The Todo data is stored in Redux state.

---

## Step 2 — Add Todo

When the user adds a Todo:

```text
Input
  ↓
dispatch(addTodo(data))
  ↓
addTodo reducer
  ↓
Todo added to Redux state
```

`nanoid()` gives the Todo a unique ID.

---

## Step 3 — Remove Todo

When the delete button is clicked:

```text
Todo ID
  ↓
dispatch(removeTodo(id))
  ↓
removeTodo reducer
  ↓
Todo removed from state
```

The ID identifies which Todo should be removed.

---

## Step 4 — Configure the Store

Create the Redux store using:

```jsx
configureStore()
```

Connect the Todo reducer:

```jsx
reducer: {
    todos: todoReducer,
}
```

---

## Step 5 — Connect Redux to React

Wrap the application:

```jsx
<Provider store={store}>
    <App />
</Provider>
```

---

## Step 6 — Connect Components

### Todo Form

Uses:

```jsx
useDispatch()
```

to dispatch `addTodo`.

### Todo List

Uses:

```jsx
useSelector()
```

to read Todos from Redux.

### Delete Button

Uses:

```jsx
useDispatch()
```

to dispatch `removeTodo`.

---

# Project Thinking

Instead of thinking:

> "How do I directly change the Todo from this component?"

Think:

> "What action happened, and which reducer should handle it?"

### Add

```text
User clicks Add
       ↓
dispatch(addTodo(data))
       ↓
Redux receives action
       ↓
addTodo reducer runs
       ↓
Redux state changes
       ↓
useSelector gets updated state
       ↓
UI re-renders
```

### Delete

```text
User clicks Delete
       ↓
dispatch(removeTodo(id))
       ↓
removeTodo reducer runs
       ↓
Redux state changes
       ↓
useSelector gets updated todos
       ↓
UI updates
```

---

# Complete Redux Flow

```text
                 Redux Store
                     ↑
                  Reducer
                     ↑
                   Action
                     ↑
                  dispatch
                     ↑
                 Component
```

Reading state:

```text
Redux Store
    ↓
useSelector()
    ↓
Component
    ↓
UI
```

---

# ⭐ 5-Minute Revision

| Concept | Purpose |
|---|---|
| `configureStore()` | Creates the Redux store |
| `createSlice()` | Creates state + reducers + actions |
| `initialState` | Starting state |
| Reducer | Contains state-changing logic |
| `action.payload` | Data sent with an action |
| `dispatch()` | Sends an action |
| `useSelector()` | Reads Redux state |
| `Provider` | Connects Redux to React |
| `nanoid()` | Creates a unique Todo ID |

### Final Memory Line

**Store keeps the state → Slice defines the state and reducers → dispatch sends an action → reducer changes the state → useSelector reads the updated state → React updates the UI.**
