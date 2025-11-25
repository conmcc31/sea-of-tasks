import {Fragment} from "react";

export default function HomePage() {
    return (<div>
            <h1>What is this?</h1>
            <p>This is a simple Todo app with an ocean theme. Each task created sinks into the page based on
                its due date. Tasks without due dates, or tasks with a fair amount of time before their due date,
                sink to the bottom, while tasks with approaching due dates rise to the top. This application
            </p>
        </div>
    )
}