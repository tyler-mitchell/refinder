import { useTheme } from '@material-ui/core';
import { Control, FieldError, useFormContext, ValidationOptions } from 'react-hook-form';
import get from './get';



export default function useField({
    name,
    disabled,
    control: controlProp,
    parse,
    format,
    ...validations
}) {
    const methods = useFormContext();
    console.log("METHODS, ", methods);
    const theme = useTheme();
    const control = controlProp || methods.control;
    const error = get(control.errorsRef.current, name);

    const rules = !disabled
        // ? getRules(validations, (theme)?.validation)
        ? undefined
        : undefined;

    return { control, error, rules };
}