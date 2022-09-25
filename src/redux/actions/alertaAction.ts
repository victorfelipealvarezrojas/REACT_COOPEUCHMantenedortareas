import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from './../types'

export function mostrarAlertaAction(alerta: any) {
    return (dispatch: any) => {
        dispatch(crearAlerta(alerta))
    }
}

const crearAlerta = (alerta: string) => ({
    type: MOSTRAR_ALERTA,
    payload: alerta
})

export function ocultarAlertaAction() {
    return (dispatch: any) => {
        dispatch(ocultarAlerta())
    }
}

const ocultarAlerta = () => ({
    type: OCULTAR_ALERTA
})