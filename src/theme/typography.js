import palette from './palette';

export default {

    fontFamily: '"Baloo 2", cursive, "Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',



    h1: {
        color: palette.text.primary,
        fontWeight: 500,


        //fontSize: 35,
        // letterSpacing: 0.24,

    },
    h2: {
        color: palette.text.primary,
        fontWeight: 600,
        verticalAlign: 'bottom',
        lineHeight: 1,
        // lineHeight: '0.5em',

        //fontSize: 29,
        // letterSpacing: 0.24,

    },
    h3: {
        color: palette.text.primary,
        fontWeight: 500,
        //fontSize: 24,
        letterSpacing: 0.06,

    },
    h4: {
        color: palette.text.primary,
        fontWeight: 500,
        //fontSize: 20,
        letterSpacing: 0.06,

    },
    h5: {
        color: palette.text.primary,
        fontWeight: 500,
        //fontSize: 16,
        letterSpacing: 0.05,

    },
    h6: {
        color: palette.text.primary,
        fontWeight: 500,
        //fontSize: 14,
        letterSpacing: 0.05,

    },
    subtitle1: {
        color: palette.text.primary,
        //fontSize: 16,
        letterSpacing: 0.05,

    },
    subtitle2: {
        color: palette.text.secondary,
        fontWeight: 400,
        //fontSize: 14,
        letterSpacing: 0.05,

    },
    body1: {
        color: palette.text.primary,
        //fontSize: 14,
        letterSpacing: 0.05,

    },
    body2: {
        color: palette.text.secondary,
        //fontSize: 12,
        letterSpacing: 0.04,

    },
    button: {
        color: palette.text.primary,
        //fontSize: 14
    },
    caption: {
        color: palette.text.secondary,
        //fontSize: 11,
        letterSpacing: 0.33,

    },
    overline: {
        color: palette.text.secondary,
        //fontSize: 11,
        fontWeight: 500,
        letterSpacing: 0.33,

        textTransform: 'uppercase'
    }
};