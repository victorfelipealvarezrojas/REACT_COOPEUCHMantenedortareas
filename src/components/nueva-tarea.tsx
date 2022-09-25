import { FormEvent } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks"
import { formDataIProps } from "../interfaces";
import { nuevaTarea } from "../redux/actions/tareasAction";
import { mostrarAlertaAction, ocultarAlertaAction } from "../redux/actions/alertaAction";
import getCurrentDateFormatToString from "../utilities/dateFormat";


export const NuevaTarea = ({ history }: any) => {
    //State
    const dispatch = useDispatch() as any
    const cargando = useSelector((state: any) => state.tareas_state.loading)
    const error = useSelector((state: any) => state.tareas_state.error)
    const { alert } = useSelector((state: any) => state.tareas_alert)

    //const inputRef = useFocus();
    const navigate = useNavigate();

    //Form data
    const fechainicio = getCurrentDateFormatToString('aaaa-mm-dd');
    const { descripcion, onChange, reset } = useForm<formDataIProps>({
        descripcion: '',
    });

    const agregar = (tarea: formDataIProps) => {
        dispatch(nuevaTarea(tarea))
    }

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if ([descripcion].includes('')) {
            const alerta = {
                msg: ' Todos los campos son obligatorios',
                class: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(mostrarAlertaAction(alerta))
            return;
        }

        dispatch(ocultarAlertaAction())
        agregar({ descripcion, fechainicio, estado: true });
        reset()

        navigate("/");

    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 front-weight-bold">
                            Agregar nueva tarea
                        </h2>
                        <form noValidate onSubmit={onSubmit}>
                            {alert && <div className={alert.class} role="alert">{alert.msg}</div>}
                            <div className="form-group">
                                <div>
                                    <label>Descripción</label>
                                    <input
                                        //ref={inputRef}
                                        name="descripcion"
                                        value={descripcion}
                                        onChange={onChange}
                                        type="text"
                                        className={`form-control`}
                                        placeholder="Descripción"
                                    />
                                </div>
                            </div>
                            <button
                                className="btn btn-info font-weight-blod text-uppercase d-block w-100"
                            >Agregar</button>
                        </form>
                        {cargando ? <p>Cargando...</p> : null}
                        {error && <div className="alert alert-danger p2 mt-4" role="alert">
                            Error interno en servidor
                        </div>}
                    </div>
                </div>

            </div>
        </div>
    )
}