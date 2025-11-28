import './HomePage.css'

export default function HomePage() {
    return (<div className="home-page">
            <h1 className="home-page-title">What is this app?</h1>
            <p className="home-page-description">This is a simple task app with an ocean theme. Each task created sinks into the page based on
                its due date. Tasks without due dates, or tasks with a fair amount of time before their due date,
                sink to the bottom, while tasks with approaching due dates rise to the top. The goal of this was to
                create a basic MERN fullstack application, demonstrating capabilities like MongoDB CRUD operations,
                React Router navigation, and simple CSS styling and animation.
            </p>
        </div>
    )
}