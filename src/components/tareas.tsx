import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtenerTareas } from '../redux/actions/tareasAction'
import { Tarea } from "./Tarea";

export const Tareas = () => {

    const dispatch = useDispatch() as any

    useEffect(() => {
        const cargaTareas = () => dispatch(obtenerTareas())
        cargaTareas();
    }, [dispatch])

    const { tareas, error, loading } = useSelector((state: any) => state.tareas_state)

    return (
        <>
            <h2 className="table table-striped">Tareas:</h2>
            {error && <div className="alert alert-danger p2 mt-4" role="alert">
                Error interno en servidor
            </div>}
            {loading && <p>Cargando...</p>}
            <table className="table table-striped">
                <thead className="table-default">
                    <tr>
                        <th scope="col">Descripción</th>
                        <th scope="col">Creación</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tareas.length === 0
                            ? 'sin registros'
                            : tareas.map((tarea: any) => (
                                <Tarea
                                    key={tarea.id}
                                    tarea={tarea}
                                />
                            ))
                    }
                </tbody>
            </table>
        </>
    )
}