import './App.css'

function App() {
  return (
    <main className="container py-5">
      <div className="row align-items-center g-4">
        <div className="col-lg-7">
          <p className="text-uppercase fw-semibold text-primary">OctoFit Tracker</p>
          <h1 className="display-4 fw-bold mb-3">A modern multi-tier fitness tracker</h1>
          <p className="lead text-muted mb-4">
            Log workouts, manage teams, and stay motivated with a polished experience for athletes and coaches.
          </p>
          <div className="d-flex gap-3">
            <a className="btn btn-primary btn-lg" href="/">Get started</a>
            <a className="btn btn-outline-secondary btn-lg" href="/">View dashboard</a>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h2 className="h4 fw-bold">Built for momentum</h2>
              <ul className="list-group list-group-flush mt-3">
                <li className="list-group-item px-0">Activity logging and streaks</li>
                <li className="list-group-item px-0">Team challenges and leaderboards</li>
                <li className="list-group-item px-0">Personalized workout suggestions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
