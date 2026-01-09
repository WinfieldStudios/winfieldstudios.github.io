# WinfieldStudios.io Local Dev Server (Windows)

This README explains how to run your site locally on **Windows** using **Python**, so folder routes like `/game/` and root-relative paths like `/css/style.css` behave the same as your public website.

---

## Why you need a local server

If you open your site by double-clicking `index.html`, your browser uses a `file:///` URL. That breaks:

- Root-relative paths like `/css/style.css` (it tries to load from the root of your hard drive)
- Folder routes like `/game/` (those rely on a server loading `game/index.html`)

Running a local server makes your local site behave like the real website.

---

## Step-by-step: Python HTTP Server (Windows)

### 1) Open Command Prompt

1. Press the **Windows** key
2. Type **cmd**
3. Press **Enter**

---

### 2) Check if Python is installed

Type:

~~~bat
py --version
~~~

If you see something like `Python 3.x.x`, you are good.

If that fails, try:

~~~bat
python --version
~~~

---

### 3) Navigate to your project folder

You must run the server inside the folder that contains your `index.html`.

Easy way:

1. Open **File Explorer**
2. Go to your project folder (the folder that has `index.html`)
3. Click the address bar at the top
4. Type `cmd`
5. Press **Enter**

Now Command Prompt opens already in the correct folder.

Quick check:

~~~bat
dir
~~~

You should see `index.html` listed.

---

### 4) Start the local server

Run:

~~~bat
py -m http.server 5500
~~~

You should see something like:

- `Serving HTTP on ... port 5500`

That means the server is running.

---

### 5) Open the site in your browser

Go to:

- http://localhost:5500/

Now these should work locally:

- `/css/style.css`
- `/assets/...`
- `/game/`

---

### 6) Stop the server when you are done

Go back to the Command Prompt window and press:

- `Ctrl + C`

---

## Troubleshooting

### Python is not recognized

If `py --version` and `python --version` both fail, install Python 3 and make sure **Add Python to PATH** is checked during installation.

Then repeat the steps above.

### Port 5500 is already in use

Pick a different port, like 5173:

~~~bat
py -m http.server 5173
~~~

Then open:

- http://localhost:5173/

---

## Notes about clean URLs

Using folder routes makes pretty URLs:

- `game/index.html` becomes `/game/`
- `about/index.html` becomes `/about/`

This is the most reliable way to get clean URLs on static hosting.

---

## Task list

- [ ] Confirm Python works (`py --version`)
- [ ] Open `cmd` in the folder that contains `index.html`
- [ ] Run `py -m http.server 5500`
- [ ] Open `http://localhost:5500/`
- [ ] Stop the server with `Ctrl + C`
