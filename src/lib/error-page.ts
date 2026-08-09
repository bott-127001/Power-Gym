export function renderErrorPage(error?: unknown): string {
  const message = error instanceof Error ? error.message : typeof error === "string" ? error : "";
  const stack = error instanceof Error && error.stack ? error.stack : "";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>PowerUp Fitness — Page Notice</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #070707; color: #fff; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 32rem; width: 100%; text-align: center; padding: 2.5rem 2rem; background: #121212; border: 1px solid rgba(255,255,255,0.1); border-radius: 1.5rem; box-shadow: 0 20px 50px rgba(0,0,0,0.8); }
      h1 { font-size: 1.5rem; margin: 0 0 0.5rem; color: #ffde47; font-weight: 800; letter-spacing: 0.05em; }
      p { color: #9ca3af; margin: 0 0 1.5rem; font-size: 0.875rem; }
      pre { text-align: left; background: #000; padding: 1rem; border-radius: 0.75rem; font-size: 0.7rem; color: #f87171; overflow: auto; max-height: 12rem; margin-bottom: 1.5rem; border: 1px solid rgba(239,68,68,0.2); }
      .actions { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.65rem 1.35rem; border-radius: 9999px; font: inherit; font-size: 0.78rem; font-weight: 700; cursor: pointer; text-decoration: none; border: 1px solid transparent; text-transform: uppercase; letter-spacing: 0.1em; transition: all 0.2s; }
      .primary { background: #ffde47; color: #000; }
      .primary:hover { opacity: 0.9; transform: translateY(-1px); }
      .secondary { background: transparent; color: #fff; border-color: rgba(255,255,255,0.2); }
      .secondary:hover { background: rgba(255,255,255,0.05); }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>POWERUP FITNESS</h1>
      <p>${message || "Something went wrong on our end. You can try refreshing or head back home."}</p>
      ${stack ? `<pre>${stack}</pre>` : ""}
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}
