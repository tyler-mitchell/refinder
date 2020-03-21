import React from 'react'
import {
    Select as MuiSelect,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText
} from "@material-ui/core";
import { useForm, ErrorMessage, Controller } from "react-hook-form";

const Select = ({ name, label, errors, control, defaultValue, children }) => {
    return (
        <FormControl
            style={{ minWidth: 300 }}
            error={Boolean(errors[name])}
        >
            <InputLabel id="select-label">
                {label}
            </InputLabel>

            <Controller
                as={
                    <MuiSelect>
                        {children}
                        {/* <MenuItem value="">None</MenuItem>
                  <MenuItem value="simple">
                    Simple Words only (3-5 characters)
                  </MenuItem>
                  <MenuItem value="medium">
                    Medium Words only (5-8 characters)
                  </MenuItem>
                  <MenuItem value="complex">
                    Complex Words only (8+ characters)
                  </MenuItem>
                  <MenuItem value="allwords">
                    Randomly Select Words all across
                  </MenuItem> */}
                    </MuiSelect>
                }
                name={name}
                rules={{ required: "this is required" }}
                control={control}
                defaultValue={defaultValue}
            />
            <FormHelperText>
                {errors[name] && errors[name].message}
            </FormHelperText>
        </FormControl>
    )
}

export default Select;