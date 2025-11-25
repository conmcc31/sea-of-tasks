import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import './TodoPage.css'

function sortTodosByDueDate(list) {
    return [...list].sort((a, b) => {
        const dateA = a.dueDate ? new Date(a.dueDate) : null
        const dateB = b.dueDate ? new Date(b.dueDate) : null
        if (!dateA && !dateB) return 0;
        if (!dateA) return 1;
        if (!dateB) return -1;

        return dateA - dateB;
    });
}

function getDaysUntilDue(todo) {
    if (!todo.dueDate) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(todo.dueDate);
    due.setHours(0, 0, 0, 0);

    const msPerDay = 1000 * 60 * 60 * 24;
    return Math.round((due - today) / msPerDay);
}

function getUrgencyLabel(todo) {
    const days = getDaysUntilDue(todo);
    if (days === null) return 'none';
    if (days < 0) return 'overdue';
    if (days === 0) return 'today';
    if (days <= 3) return 'soon';
    return 'later';
}

function getBuoyFillPercent(todo) {
    const days = getDaysUntilDue(todo);
    if (days === null) return 20;

    const clamped = Math.max(0, Math.min(days, 7));
    const pct = 100 - (clamped / 7) * 80;
    return Math.round(pct);
}

function getDepthOffset(todo) {
    if (!todo.dueDate) {
        return 120;
    }
    const diffDays = getDaysUntilDue(todo);
    const clamped = Math.max(0, Math.min(diffDays, 30));

    return clamped * 4;
}

export default function TodoPage() {
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [lastCreatedId, setLastCreatedId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        const loadTodos = async () => {
            try {
                const res = await fetch("/api/todos");
                const data = await res.json();
                const sorted = sortTodosByDueDate(data);

                setTimeout(() => {
                    if (cancelled) return;
                    setTodos(sorted);
                    setIsLoading(false)

                }, 800)
            } catch (err) {
                console.log(err);
                setIsLoading(false);
            }
        };
        loadTodos();
        return () => {
            cancelled = true;
        }
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/todos', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({text, dueDate}),
        });
        const newTodo = await res.json();
        setTodos((prev) => sortTodosByDueDate([...prev, newTodo]));

        setLastCreatedId(newTodo._id);
        setText('')
        setDueDate('')
    };

    if(isLoading) {
        return (
            <div className="todos-page">
                <header className="todos-header">
                    <h1>Todos</h1>
                </header>
                <div className="todos-loading">
                    <div className="todos-loading-spinner" />
                    <p>Calming the sea of tasks...</p>
                </div>
            </div>
        )
    }
    return (
        <div className="todos-page">
            <header className="todos-header">
                <h1>Todos</h1>
            </header>
            <form className="todos-form" onSubmit={onSubmit}>
                <p>Task name</p>
                <p>Due Date</p>
                <p></p>
                <input className="todos-input"
                       value={text}
                       onChange={(e) => setText(e.target.value)}
                       placeholder="New Todo"
                />
                <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}/>
                <button className="todos-add-button" type="submit">Create Todo Task</button>
            </form>
            <section className="todos-grid todos-grid--loaded">
                {todos.length === 0 && (
                    <p className="todos-empty">No Todos found</p>
                )}
                {todos.map((t, index) => {
                    const depthOffset = getDepthOffset(t);
                    const isNew = t._id === lastCreatedId;
                    const phaseClass = `todo-card--phase-${index % 3}`;
                    const urgency = getUrgencyLabel(t);
                    const buoyFill = getBuoyFillPercent(t);
                    return (
                        <article
                        key={t._id}
                        className={`todo-card ${phaseClass} 
                    ${t.completed ? 'todo-card--completed' : ''}
                    ${isNew ? 'todo-card--enter' : ''}`}
                        style={{'--depth-offset': `${depthOffset}px`}}
                    >
                        <div className={`todo-card-inner todo-card-inner--${urgency}`}>
                            {}
                            <div className="todo-card-layout">
                                <div className="todo-buoy">
                                    <div className="todo-buoy-fill"
                                         style={{'--buoy-fill': `${buoyFill}%`}}></div>
                                </div>
                                <div className="todo-card-content">
                                    <div className="todo-card-body">
                                        <h2 className="todo-card-title">{t.text}</h2>
                                        <p className="todo-card-meta">
                                            Created: {' '}
                                            {t.createdAt ? new Date(t.createdAt).toDateString() : 'Unknown'}
                                        </p>
                                        {t.dueDate && (
                                            <p className="todo-card-meta">
                                                Due: {new Date(t.dueDate).toDateString()}
                                            </p>
                                        )}
                                    </div>
                                    <div className="todo-card-footer">
                            <span
                                className={`todo-status ${
                                    t.completed ? 'todo-status--done' : 'todo-status--open'
                                }`}>
                                {t.completed ? 'Completed' : 'Open'}
                            </span>
                                        <Link to={`/todos/${t._id}`} className="todo-card-link">
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                                </div>
                    </article>
                )
                })}
                </section>
                </div>
                );
                }