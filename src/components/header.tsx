import { Link, useNavigate } from 'react-router-dom'

export const Header = () => {
    const navigate = useNavigate()

    const redirect =  () => {
        navigate('/tareas/crear')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-info justify-content-between">
            <div className="container">
                <h1><Link to={"/"} className="text-light">Mantenedor Tareas</Link></h1>
            </div>
            <button
                type="button"
                className="btn btn-danger nuevo-post d-block d-md-inline-block"
                onClick={() => redirect()}
            >
                Agregar
            </button>
        </nav>
    )
}