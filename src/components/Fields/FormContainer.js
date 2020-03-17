import React from 'react'
import { FormContext, useForm } from 'react-hook-form'



const FormContainerCore = ({
    defaultValues = {},
    onSuccess,
    FormProps,
    children
}) => {
    const methods = useForm({
        defaultValues
    })
    const { handleSubmit } = methods

    return (
        <FormContext {...methods}>
            <form onSubmit={handleSubmit(onSuccess)} noValidate {...FormProps}>
                {children}
            </form>
        </FormContext>
    )
}


const FormContainer = (props) => {
    if (!props.formContext) {
        return <FormContainerCore {...props} />
    }
    return (
        <FormContext {...props.formContext}>
            <form onSubmit={props.formContext.handleSubmit(props.onSuccess)} noValidate {...props.FormProps}>
                {props.children}
            </form>
        </FormContext>
    )
}


export default FormContainer