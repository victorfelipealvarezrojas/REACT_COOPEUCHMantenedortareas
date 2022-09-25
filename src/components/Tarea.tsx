import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { eliminarTarea, ObtenerTareaEditar } from "../redux/actions/tareasAction";
import Swal from 'sweetalert2';

export const Tarea = ({ tarea }: any) => {

    const { id, descripcion, fechainicio, estado } = tarea;

    const dispatch = useDispatch() as any
    const navigate = useNavigate()

    const confEliminarTarea = (id: number) => {

        Swal.fire({
            title: 'Estas seguro?',
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, elimiar!',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(eliminarTarea(id));
            }
        })
    }

    const redireccionEdicion = async (tarea: any) => {
        dispatch(ObtenerTareaEditar(tarea))
        navigate(`/tareas/editar/${tarea.id}`)
    }

    return (
        <tr key={descripcion}>
            <td>{descripcion}</td>
            <td>
                <span className="font-weight-bold">
                    {fechainicio}
                </span>
            </td>
            <td>{estado === true ? 'ACTIVO' : 'INACTIVO'}</td>
            <td className="acciones">
                <button
                    type="button"
                    className="btn btn-sm btn-info mr-2"
                    onClick={() => redireccionEdicion(tarea)}
                >
                    Editar
                </button>
                <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => confEliminarTarea(id)}
                >
                    Eliminar
                </button>
            </td>
        </tr>
    )
}