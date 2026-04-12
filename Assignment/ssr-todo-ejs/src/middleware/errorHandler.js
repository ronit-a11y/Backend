function errorHandler(err, req, res, next) {
  const status = err.statusCode || 500;

  // If headers already sent, delegate to default handler
  if (res.headersSent) return next(err);

  // SSR-friendly error response
  if (req.accepts("html")) {
    return res.status(status).send(`
      <h1>Something went wrong</h1>
      <p>Status: ${status}</p>
      <pre>${process.env.NODE_ENV === "development" ? err.stack : "Please try again later."}</pre>
      <a href="/">Go Home</a>
    `);
  }

  res.status(status).json({
    message: err.message || "Server error"
  });
}

module.exports = errorHandler;