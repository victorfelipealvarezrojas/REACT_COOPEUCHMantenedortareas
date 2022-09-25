import { ChangeEvent, useState } from "react";

export const useForm = <T>(initialState: T) => {

    const [formData, setFormData] = useState(initialState);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormData(lastData => ({
            ...lastData,
            [name]: value,
            //[name]: name !== 'fechainicio' ? value : new Date(value),
        }))
    }

    const reset = () => {
        setFormData({ ...initialState })
    }

    return {
        /****Properties****/
        ...formData,
        setFormData,
        /****Methods****/
        onChange,
        reset
    }
}