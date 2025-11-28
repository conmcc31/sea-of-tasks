import {Link} from "react-router-dom";

export default function HeaderWave() {
    return (
        <div className="header-div">
            <header className="header-wave">
                <div className="header-inner">
                    <Link className="header-title-link" to={`/`}>
                    <h1 className="header-title">Sea of Tasks</h1>
                    </Link>
                </div>
            </header>
            <div className="header-svg-wrapper">
                <svg
                    preserveAspectRatio="none"
                    viewBox="0 0 1200 120"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M321.39 56.44c58-10.79 114.16-30.13 172-41.86 82.39-16.72 168.19-17.73 250.45-.39C823.78 31 906.67 72 985.66 92.83c70.05 18.48 146.53 26.09 214.34 3V0H0v27.35a600.21 600.21 0 00321.39 29.09z"/>
                </svg>
            </div>
        </div>
    )
}