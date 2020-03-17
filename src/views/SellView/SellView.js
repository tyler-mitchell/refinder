import React from 'react'
import styled from 'styled-components'
import Field from 'components/Fields/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
// import './index.css'

import FormContainer from '../../components/Fields/FormContainer';
const SellView = () => {
    function handleSubmit(e) {
        console.log(e)
    }
    return (
        <FormContainer onSubmit={handleSubmit}>
            <Field name="firstName" label="first name" />
            <Field name="firstName" required maxLength={5} minLength={3} />
            <Field name="phone" pattern={/^\d+$/} />
            <Button color="primary" variant="contained">Test theme</Button>
            <Typography variant="h1">Hello World</Typography>
        </FormContainer >
    )
}

export default SellView;