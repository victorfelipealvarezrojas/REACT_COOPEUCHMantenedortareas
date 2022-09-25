import { FormEvent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFocus, useForm } from "../hooks"
import { formDataIProps } from "../interfaces";
import { editaTarea } from "../redux/actions/tareasAction";


export const EditarTarea = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch() as any
    const inputRef = useFocus();
    const [isChecked, setIsChecked] = useState(true)
    const [isValid, setIsValid] = useState<Boolean>(true)

    const { tareaeditar } = useSelector((state: any) => state.tareas_state)
    const {id, estado} =tareaeditar

    const { descripcion, fechainicio, onChange, reset } = useForm<formDataIProps>({
        descripcion: tareaeditar.descripcion,
        fechainicio: tareaeditar.fechainicio,
        //estado: tareaeditar.estado
    })

    useEffect(()=> {
        setIsChecked(estado);
    },[estado])

    const handleOnChange = () => {
        setIsChecked(!estado);
    }

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if ([descripcion, fechainicio].includes('')) {
            setIsValid(false);
            return;
        }

        let estado =  isChecked? true: false
        dispatch(editaTarea({ id,descripcion, estado, fechainicio }))
        reset()
        navigate('/')
    }


    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 front-weight-bold">Editar Tarea</h2>
                        <form noValidate onSubmit={onSubmit}>
                            {!isValid && <div className="alert alert-danger" role="alert">
                                Campos Descripción y Fecha Creación son obligatorios!
                            </div>}
                            <div className="form-group">
                                <div>
                                    <label>Descripción</label>
                                    <input
                                        ref={inputRef}
                                        name="descripcion"
                                        value={descripcion}
                                        onChange={onChange}
                                        type="text"
                                        className={`form-control ${descripcion.trim().length <= 0 && 'has-error'}`}
                                        placeholder="Descripción"
                                    />
                                </div>
                                <div>
                                    <label>Fecha Creacion</label>
                                    <input
                                        id="fechainicio"
                                        name="fechainicio"
                                        value={fechainicio}
                                        onChange={onChange}
                                        type="date"
                                        className="form-control"
                                    />
                                </div>
                                <div className="mt-3">
                                    <input
                                        type="checkbox"
                                        id="estado"
                                        name="estado"
                                        checked={isChecked? true: false}
                                        onChange={handleOnChange}

                                    />
                                    {isChecked ? 'Vigente' : 'Finalizado'}
                                </div>
                            </div>
                            <button
                                className="btn btn-info font-weight-blod text-uppercase d-block w-100"
                            >Agregar</button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}