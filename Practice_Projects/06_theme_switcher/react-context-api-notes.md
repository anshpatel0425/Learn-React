# React Context API — Quick Notes

> **Video:** Chai aur Code — React Context API  
> **Video:** https://youtu.be/JQVBGtZMqgU

These notes focus on the Context API concepts and the two mini-projects covered in the lesson.

---

## 1. Why Context API?

When data has to travel through many components using props, it can become difficult to manage.

Context API provides a way to make shared data available to components without passing it manually through every level.

```text
App
 ↓
Component A
 ↓
Component B
 ↓
Component C
```

If Component C needs data from App, Context can provide that data directly to components inside the Provider.

---

## 2. createContext()

Create a context using:

```jsx
import React from "react";

const UserContext = React.createContext();

export default UserContext;
```

The context is the shared place through which data is provided and consumed.

---

## 3. Context Provider

The Provider makes the context value available to components inside it.

```jsx
<UserContext.Provider value={{ user, setUser }}>
    {children}
</UserContext.Provider>
```

Important parts:

- `Provider` → provides the context
- `value` → data/functions being shared
- `children` → components that can access the context

---

## 4. Creating a Provider Component

A separate provider component can hold the state and provide it through Context.

```jsx
const UserContextProvider = ({ children }) => {

    const [user, setUser] = React.useState(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
```

The provider contains:

- State
- Functions that modify the state
- Context Provider
- `children`

---

## 5. useContext()

To access the context inside a component:

```jsx
import { useContext } from "react";
import UserContext from "../context/UserContext";

const { user, setUser } = useContext(UserContext);
```

This lets components access shared data without passing it through every component as props.

---

# Mini Project 1 — Login + Profile

## Goal

Understand how Context API can share user information between components.

Structure:

```text
App
 ├── Login
 └── Profile
```

Shared state:

```text
UserContext
      ↓
UserContextProvider
      ↓
   user state
      ↓
Login + Profile
```

### Step 1 — Create UserContext

Create:

```text
context/UserContext.js
```

```jsx
import React from "react";

const UserContext = React.createContext();

export default UserContext;
```

### Step 2 — Create UserContextProvider

Create:

```text
context/UserContextProvider.jsx
```

Store the user:

```jsx
const [user, setUser] = React.useState(null);
```

Provide both:

```jsx
<UserContext.Provider value={{ user, setUser }}>
    {children}
</UserContext.Provider>
```

### Step 3 — Wrap Components

In `App.jsx`:

```jsx
<UserContextProvider>
    <Login />
    <Profile />
</UserContextProvider>
```

Now both components can access the same Context.

### Step 4 — Login Component

Local state:

```jsx
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
```

Get `setUser`:

```jsx
const { setUser } = useContext(UserContext);
```

On submit:

```jsx
setUser({ username, password });
```

### Step 5 — Profile Component

Get the user:

```jsx
const { user } = useContext(UserContext);
```

If no user:

```jsx
if (!user) return <div>Please login</div>;
```

Otherwise:

```jsx
return <div>Welcome {user.username}</div>;
```

### Project Flow

```text
User enters username/password
          ↓
       Login
          ↓
   setUser({...})
          ↓
 Context user state updates
          ↓
       Profile
          ↓
   useContext(UserContext)
          ↓
   Displays username
```

---

# Mini Project 2 — Theme Switcher

The second project uses Context API to share theme information and theme-changing functions.

Structure:

```text
App
 ├── ThemeBtn
 └── Card
```

---

## 6. Theme Context

Create the Context:

```jsx
import { createContext, useContext } from "react";

export const ThemeContext = createContext({
    themeMode: "light",
    darkTheme: () => {},
    lightTheme: () => {},
});
```

Create a Provider reference:

```jsx
export const ThemeProvider = ThemeContext.Provider;
```

---

## 7. Custom useTheme Hook

Instead of writing `useContext(ThemeContext)` everywhere:

```jsx
export default function useTheme() {
    return useContext(ThemeContext);
}
```

Now components can use:

```jsx
const { themeMode, lightTheme, darkTheme } = useTheme();
```

---

## 8. Theme State

In `App.jsx`:

```jsx
const [themeMode, setThemeMode] = useState("light");
```

Functions:

```jsx
const lightTheme = () => {
    setThemeMode("light");
};

const darkTheme = () => {
    setThemeMode("dark");
};
```

---

## 9. Provide Theme Data

```jsx
<ThemeProvider
    value={{ themeMode, lightTheme, darkTheme }}
>
    <ThemeBtn />
    <Card />
</ThemeProvider>
```

Now components inside the Provider can access these values.

---

## 10. Applying the Theme

`useEffect` applies the current theme to the HTML element:

```jsx
useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");

    document.querySelector("html").classList.add(themeMode);
}, [themeMode]);
```

So:

```text
themeMode = "light" → html gets "light"
themeMode = "dark"  → html gets "dark"
```

---

## 11. Theme Button

`ThemeBtn` gets Context values:

```jsx
const { themeMode, lightTheme, darkTheme } = useTheme();
```

When the checkbox changes:

```jsx
const darkModeStatus = e.currentTarget.checked;

if (darkModeStatus) {
    darkTheme();
} else {
    lightTheme();
}
```

The checkbox reflects the current theme:

```jsx
checked={themeMode === "dark"}
```

---

## 12. Tailwind Dark Mode

The project uses Tailwind's class-based dark mode:

```jsx
darkMode: "class",
```

Elements can then use classes such as:

```jsx
dark:bg-gray-800
dark:text-white
```

These styles apply when the `dark` class is present.

### Theme Switcher Flow

```text
User toggles checkbox
          ↓
      ThemeBtn
          ↓
    darkTheme()
       OR
    lightTheme()
          ↓
   themeMode changes
          ↓
      useEffect
          ↓
html gets "dark" / "light" class
          ↓
Tailwind dark:* classes apply
```

---

# 13. Main Context API Pattern

Remember this pattern:

```text
1. Create Context
       ↓
2. Create Provider
       ↓
3. Store shared state in Provider
       ↓
4. Pass state/functions through value
       ↓
5. Wrap components with Provider
       ↓
6. Consume using useContext
```

Example:

```jsx
const MyContext = createContext();

function MyProvider({ children }) {

    const [data, setData] = useState(null);

    return (
        <MyContext.Provider value={{ data, setData }}>
            {children}
        </MyContext.Provider>
    );
}
```

Then:

```jsx
const { data, setData } = useContext(MyContext);
```

---

# 14. Important Things to Remember

### createContext()

Creates the Context.

```jsx
const UserContext = React.createContext();
```

### Provider

Provides the data.

```jsx
<UserContext.Provider value={...}>
    {children}
</UserContext.Provider>
```

### value

Contains the data/functions you want to share.

```jsx
value={{ user, setUser }}
```

### useContext()

Consumes the Context.

```jsx
const { user } = useContext(UserContext);
```

### children

Allows the Provider component to wrap and render whatever is placed inside it.

```jsx
const Provider = ({ children }) => {
    return (
        <Context.Provider>
            {children}
        </Context.Provider>
    );
};
```

---

# ⭐ 5-Minute Revision

## Context API

```text
createContext()
      ↓
   Context
      ↓
   Provider
      ↓
   value={}
      ↓
   children
      ↓
 useContext()
      ↓
Access shared data
```

## Login Project

```text
UserContext
     ↓
UserContextProvider
     ↓
user + setUser
     ↓
Login → setUser()
     ↓
Profile → useContext()
```

## Theme Project

```text
ThemeContext
     ↓
ThemeProvider
     ↓
themeMode + functions
     ↓
ThemeBtn → changes theme
     ↓
App/useEffect → applies class
     ↓
Tailwind dark mode
```

---

## Final Memory Line

**Context API = Create a Context → Provide shared data → Consume it with `useContext()` instead of passing props through every component.**
