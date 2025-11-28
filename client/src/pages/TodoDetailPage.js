import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import './TodoDetailPage.css'

export default function TodoDetailPage() {
    const notify = () => toast('Task Updated');

    const navigate = useNavigate();
    const {id} = useParams();

    const [todo, setTodo] = useState(null);
    const [status, setStatus] = useState('loading');

    const [text, setText] = useState('');
    const [completed, setCompleted] = useState(false);


    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const res = await fetch(`/api/todos/${id}`);
                if (!res.ok) {
                    setStatus('error');
                    return;
                }
                const data = await res.json();
                setTodo(data);
                setText(data.text);
                setCompleted(data.completed);
                setStatus('ready');
            } catch (err) {
                console.error(err);
                setStatus('error');
            }
        };
        fetchTodo();
    }, [id]);
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/todos/${id}`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({text, completed}),
            });
            if (!res.ok) {
                console.error('Failed to update todo');
                return;
            }
            const updated = await res.json();
            setTodo(updated);
            setText(updated.text);
            setCompleted(updated.completed)
            notify();
        } catch (err) {
            console.error(err);
        }
    }
    const handleDelete = async () => {
        const confirmDelete = window.confirm('Delete this todo?');
        if (!confirmDelete) return;
        try {
            const res = await fetch(`/api/todos/${id}`, {
                method: 'DELETE'
            });
            if (!res.ok && res.status !== 204) {
                console.error('failed to delete todo');
                return;
            }
            navigate('/todos');
        } catch (err) {
            console.error(err);
        }
    };
    if (status === 'loading') {
        return <p>Loading task...</p>
    }
    if (status === 'error' || !todo) {
        return (
            <div>
                <p>Could not load task</p>
                <Link to={"/todos"}>Back to list</Link>
            </div>
        )
    }
    return (
        <div className="detail-container">
            <h1 className="detail-title">Task Details</h1>
            <form onSubmit={handleSave} style={{marginBottom: '1rem'}}>
                <div className="detail-edit">
                    <p>Task name</p>
                    <p>Completed</p>
                    <div>
                        <label>
                            {' '}
                            <input className="detail-label"
                                   value={text} onChange={(e) => setText(e.target.value)}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            {' '}
                            <input
                                type="checkbox"
                                checked={completed}
                                onChange={(e) => setCompleted(e.target.checked)}
                            />
                        </label>
                    </div>
                    <div className="detail-buttons">
                        <button  type="submit">Save Changes
                        </button>
                        <button  onClick={handleDelete} style={{marginRight: '1rem'}}>Delete Task
                        </button>
                        <ToastContainer></ToastContainer>
                    </div>
                </div>

            </form>

            <Link to="/todos">Back to list</Link>

        </div>
    )
}