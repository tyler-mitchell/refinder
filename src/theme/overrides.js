export default {
    MuiInputBase: {


        input: {



            // outline: 'none',
            lineHeight: '1.2',

            '&$disabled': {
                cursor: 'not-allowed',

            },
        },
    },

    MuiFilledInput: {

        root: {
            overflow: 'hidden',
            borderRadius: 8,
            background: '#ffff'
        },
        input: {
            outline: 'none',
            borderRadius: 8,
            padding: ' 0.9rem 1.15rem',

            border: '1px solid #bbb',
            background: '#ffff'

        },
        marginDense: {
            width: '15rem',
            borderRadius: 8,
            background: '#ffff'

        }
    },
    MuiTextField: {


        // input: {
        //     borderRadius: '30px',
        //     background: 'none'
        // }
    },
}