import React from 'react'
import styled from 'styled-components'
import Field from 'components/Fields/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
// import './index.css'

import FormContainer from '../../components/Fields/FormContainer';
const form = {
    'default-text-field': 'Test Data',
    'default-email-field': 'info@example.com',
    'number-text-field': 6
}

const SellView = () => {
    function handleSubmit(e) {
        console.log("SELL", e)
    }
    return (
        <FormContainer defaultValues={form} onSuccess={handleSubmit}
            FormProps={{
                'aria-autocomplete': 'none',
                autoComplete: 'new-password'
            }} onSubmit={handleSubmit}>
            <Field
                required
                margin={'dense'}
                label={'Name'}
                name={'default-text-field'}
            /><br />
            <Field
                required

                type={'email'}
                margin={'dense'}
                label={'Email'}
                name={'default-email-field'}
            /><br />
            <Field
                margin={'dense'}
                label={'Number'}
                name={'number-text-field'}
                required
                type={'number'}
            /><br />
            <Button color="primary" type="submit" variant="contained">Test theme</Button>
            <Typography variant="h1">Hello World</Typography>
        </FormContainer >
    )
}

export default SellView;