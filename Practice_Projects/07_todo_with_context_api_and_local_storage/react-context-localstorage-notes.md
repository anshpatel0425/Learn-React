# React Context API + localStorage — Quick Revision Notes

> **Source:** Chai aur Code — React video  
> **Video:** https://youtu.be/6KQeopPE36I
>
> These notes are intentionally limited to the concepts covered in this video and the project-thinking flow.

---

## 1. What This Project Is Teaching

The project combines:

- React Context API
- `localStorage`
- `JSON.stringify()`
- `JSON.parse()`

The main idea is to keep application data in Context and also save it in the browser's `localStorage` so the data can survive a page refresh.

---

## 2. Context API

Context is used to share data between components without passing props through every component.

Basic flow:

```text
Context
   ↓
Provider
   ↓
Shared state
   ↓
Components consume the state
```

The Provider contains the state and exposes the required values/functions through `value`.

---

## 3. localStorage

`localStorage` allows data to be stored in the browser.

Important methods used in the project:

```js
localStorage.setItem()
localStorage.getItem()
```

Example:

```js
localStorage.setItem("todos", JSON.stringify(todos))
```

Read it back:

```js
localStorage.getItem("todos")
```

---

## 4. Why JSON.stringify()?

`localStorage` stores data as strings.

React state may contain an array/object, so before saving it, convert it to a JSON string:

```js
JSON.stringify(todos)
```

Think:

```text
JavaScript array/object
        ↓
JSON.stringify()
        ↓
String
        ↓
localStorage
```

---

## 5. Why JSON.parse()?

When data is retrieved from `localStorage`, it comes back as a string.

Convert it back into a JavaScript value:

```js
JSON.parse(localStorage.getItem("todos"))
```

Think:

```text
localStorage string
        ↓
JSON.parse()
        ↓
JavaScript array/object
        ↓
React state
```

---

## 6. The Important Combination

The project combines Context API + localStorage:

```text
React State
    ↓
Context API
    ↓
Components
```

For persistence:

```text
React State
    ↓
JSON.stringify()
    ↓
localStorage
```

When the application starts:

```text
localStorage
    ↓
JSON.parse()
    ↓
React State
    ↓
Context
    ↓
Components
```

---

# 7. Project Thinking / How to Build It

The important part is understanding the flow rather than memorizing every line.

## Step 1 — Decide the shared state

First identify the data that multiple components need.

For the project, the main data is the todo state:

```text
todos
```

---

## Step 2 — Put the shared state in Context

Create a Context and Provider.

The Provider keeps the state and makes it available to the components.

```text
TodoContext
      ↓
TodoProvider
      ↓
todos + functions
      ↓
Todo components
```

---

## Step 3 — Create functions that modify the state

The Provider contains the functions needed to work with the shared data.

The components don't need to own the main shared state themselves.

Instead:

```text
Component
    ↓
Context function
    ↓
Provider updates state
```

---

## Step 4 — Save state to localStorage

When the important state changes, save it to localStorage.

Conceptually:

```text
todos changes
     ↓
JSON.stringify(todos)
     ↓
localStorage.setItem(...)
```

This makes the data persistent across refreshes.

---

## Step 5 — Load saved data when the app starts

When the application starts, check localStorage.

```text
localStorage.getItem(...)
        ↓
   saved data?
      ↙   ↘
    yes    no
     ↓      ↓
JSON.parse  initial state
     ↓
  todos state
```

---

# 8. Overall Project Architecture

```text
                 App
                  ↓
             TodoProvider
                  ↓
        ┌─────────┴─────────┐
        ↓                   ↓
    TodoForm            TodoItems
        ↓                   ↓
   add/update             display
        └─────────┬─────────┘
                  ↓
             Todo state
                  ↓
          localStorage
```

The key idea is that the Provider becomes the central place for the shared todo data and its operations.

---

# 9. Data Persistence Flow

### When adding/updating data

```text
User action
    ↓
Context function
    ↓
React state changes
    ↓
State saved to localStorage
```

### After refreshing the page

```text
Application starts
       ↓
Get saved data
       ↓
JSON.parse()
       ↓
Set React state
       ↓
Context provides state
       ↓
Components display saved data
```

---

# 10. Important Concepts to Remember

### Context API

Used to share state/functions between components.

### Provider

Holds/provides the shared data.

### localStorage

Stores data in the browser so it can remain after refresh.

### JSON.stringify()

Converts a JavaScript value into a JSON string before storing it.

### JSON.parse()

Converts the stored JSON string back into a JavaScript value.

---

# ⭐ 5-Minute Revision

### Context

```text
createContext()
      ↓
Provider
      ↓
shared state/functions
      ↓
components
```

### localStorage

```text
React state
    ↓
JSON.stringify()
    ↓
localStorage
```

And:

```text
localStorage
    ↓
JSON.parse()
    ↓
React state
```

### Whole project

```text
User interacts
      ↓
Component
      ↓
Context function
      ↓
State changes
      ↓
Save state to localStorage
      ↓
Refresh
      ↓
Read localStorage
      ↓
JSON.parse()
      ↓
Restore state
```

## Final Memory Line

**Context API handles sharing the state between components; localStorage handles keeping that state after a refresh; `stringify` saves it and `parse` restores it.**
