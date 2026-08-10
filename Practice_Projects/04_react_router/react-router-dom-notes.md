# React Router DOM — Quick Revision Notes

> Based on **Chai aur Code — React Router Crash Course (Lecture 12)**  
> Video: https://youtu.be/VJov5QWEKE4

---

## 1. Why React Router?

A normal React app can behave like a Single Page Application (SPA).

Instead of loading a completely new HTML page every time the URL changes, React Router lets us:

- Change the URL
- Render a different React component
- Navigate between pages without a full page reload

Example:

```text
/          → Home
/about     → About
/contact   → Contact
/user/123  → User profile
```

---

## 2. Install React Router DOM

```bash
npm install react-router-dom
```

`react-router-dom` provides routing features for React applications running in the browser.

---

# 3. BrowserRouter

Wrap the application with `BrowserRouter`.

Usually this is done in `main.jsx`:

```jsx
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

### Remember

`BrowserRouter` gives React Router access to the browser URL and navigation history.

---

# 4. Routes and Route

Inside `App.jsx`:

```jsx
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}
```

### Important

- `Routes` → contains the route definitions
- `Route` → connects a URL path to a React component
- `path` → URL
- `element` → component to render

Example:

```jsx
<Route path="/about" element={<About />} />
```

When the URL is:

```text
/about
```

React renders:

```jsx
<About />
```

---

# 5. Navigation with Link

Do **not** normally use a normal `<a>` tag for internal React navigation.

Instead:

```jsx
import { Link } from "react-router-dom";

<Link to="/about">About</Link>
```

### Why?

```html
<a href="/about">About</a>
```

can cause a normal browser navigation/reload.

React Router's:

```jsx
<Link to="/about">About</Link>
```

handles client-side navigation.

---

# 6. NavLink

`NavLink` is useful when you want to style the link differently when it is active.

```jsx
import { NavLink } from "react-router-dom";

<NavLink to="/about">
  About
</NavLink>
```

You can use its `className` callback to detect the active route:

```jsx
<NavLink
  to="/about"
  className={({ isActive }) =>
    isActive ? "text-red-500" : "text-gray-500"
  }
>
  About
</NavLink>
```

### Remember

- `Link` → normal navigation
- `NavLink` → navigation + active-route styling

---

# 7. Layout / Common Components

A common layout can contain things such as:

```text
Navbar
   ↓
Page content
   ↓
Footer
```

Instead of writing the Navbar separately on every page, React Router can render child routes inside a common layout.

This is where `Outlet` becomes important.

---

# 8. Outlet

Import:

```jsx
import { Outlet } from "react-router-dom";
```

Example layout:

```jsx
function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
```

`Outlet` represents the place where the matched child route will render.

Think:

```text
Layout
 ├── Navbar
 ├── Outlet  ← child page appears here
 └── Footer
```

---

# 9. Nested Routes

Routes can be placed inside another route.

Example:

```jsx
<Route path="/" element={<Layout />}>
  <Route path="" element={<Home />} />
  <Route path="about" element={<About />} />
  <Route path="contact" element={<Contact />} />
</Route>
```

The important relationship is:

```text
Layout
 ├── Home
 ├── About
 └── Contact
```

The child component appears inside the parent's `<Outlet />`.

### Important

For nested routes, child paths are generally written relative to the parent:

```jsx
<Route path="about" element={<About />} />
```

not:

```jsx
<Route path="/about" element={<About />} />
```

---

# 10. Dynamic Routes

Sometimes the URL contains a changing value.

Example:

```text
/user/101
/user/205
/user/500
```

Instead of creating a separate route for every user:

```jsx
<Route path="/user/:id" element={<User />} />
```

`:id` is a dynamic URL parameter.

---

# 11. useParams

To read a dynamic parameter:

```jsx
import { useParams } from "react-router-dom";

function User() {
  const { id } = useParams();

  return <h1>User ID: {id}</h1>;
}
```

If the URL is:

```text
/user/101
```

then:

```jsx
id
```

will contain:

```text
101
```

### Flow

```text
URL
 ↓
/user/:id
 ↓
useParams()
 ↓
id
```

---

# 12. useNavigate

`useNavigate` allows navigation from JavaScript.

```jsx
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <button onClick={handleLogin}>
      Login
    </button>
  );
}
```

### Link vs useNavigate

Use:

```jsx
<Link to="/about">About</Link>
```

when the user is clicking a navigation link.

Use:

```jsx
navigate("/dashboard");
```

when navigation should happen because of some logic/action.

Examples:

- After login
- After form submission
- After successful API request
- After logout

---

# 13. Route Parameters vs Query Parameters

### Route parameter

```text
/products/123
```

Route:

```jsx
<Route path="/products/:id" element={<Product />} />
```

Read with:

```jsx
const { id } = useParams();
```

### Query parameter

```text
/products?category=shoes
```

Query parameters are commonly read using `useSearchParams`.

Basic example:

```jsx
import { useSearchParams } from "react-router-dom";

const [searchParams] = useSearchParams();

const category = searchParams.get("category");
```

---

# 14. 404 / Not Found Route

You can create a fallback route using `*`:

```jsx
<Route path="*" element={<NotFound />} />
```

If no other route matches, the `NotFound` component is rendered.

Example:

```text
/anything-that-does-not-exist
        ↓
      NotFound
```

---

# 15. Typical Project Structure

A simple routing project can look like:

```text
src/
│
├── components/
│   ├── Navbar.jsx
│   └── Footer.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── User.jsx
│   └── NotFound.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

The exact structure can change depending on the project.

---

# 16. Complete Basic Example

### main.jsx

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

### App.jsx

```jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
```

### Navbar.jsx

```jsx
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/contact">Contact</NavLink>
    </nav>
  );
}

export default Navbar;
```

---

# 17. The Most Important Mental Model

Remember this:

```text
BrowserRouter
      ↓
    Routes
      ↓
     Route
      ↓
   Component
```

For nested routes:

```text
Parent Route
      ↓
   Layout
      ↓
   Outlet
      ↓
Child Route
      ↓
Child Component
```

For dynamic routes:

```text
/products/:id
       ↓
   useParams()
       ↓
      id
```

For programmatic navigation:

```text
User action
     ↓
useNavigate()
     ↓
navigate("/somewhere")
```

---

# ⭐ 5-Minute Revision

Before starting another React project, remember these:

### 1. Install

```bash
npm install react-router-dom
```

### 2. BrowserRouter

Wrap the app:

```jsx
<BrowserRouter>
  <App />
</BrowserRouter>
```

### 3. Routes

```jsx
<Routes>
  <Route path="/" element={<Home />} />
</Routes>
```

### 4. Link

```jsx
<Link to="/about">About</Link>
```

### 5. NavLink

Use when you need active-link styling:

```jsx
<NavLink to="/about">About</NavLink>
```

### 6. Dynamic route

```jsx
<Route path="/user/:id" element={<User />} />
```

### 7. Get dynamic value

```jsx
const { id } = useParams();
```

### 8. Nested route

Parent:

```jsx
<Route path="/" element={<Layout />}>
```

Child:

```jsx
<Route path="about" element={<About />} />
```

Layout:

```jsx
<Outlet />
```

### 9. Navigate with JavaScript

```jsx
const navigate = useNavigate();

navigate("/dashboard");
```

### 10. 404

```jsx
<Route path="*" element={<NotFound />} />
```

---

# 🧠 Quick Cheat Sheet

| Concept | Use |
|---|---|
| `BrowserRouter` | Enables browser routing |
| `Routes` | Holds routes |
| `Route` | Maps URL → component |
| `Link` | Navigate between pages |
| `NavLink` | Link + active styling |
| `Outlet` | Renders nested route |
| `useParams` | Read URL parameters |
| `useNavigate` | Navigate using JavaScript |
| `useSearchParams` | Read/update query parameters |
| `*` | Catch-all / 404 route |

---

## One-Line Memory Trick

**Route decides WHAT to show, Link/Navigation decides WHERE to go, Params tells you WHICH data was requested, and Outlet decides WHERE a nested page appears.**

