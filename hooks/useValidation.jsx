import React, { useState, useEffect } from 'react';

/**
 * @name: useValidation.
 * @description: custom hook to validate data. If there are no errors, a function passed by the user as a parameter of this hook is executed.
 * @param: initial state, function to validate data & function to execute after validation.
 * @return: values, errors and submitForm state values and handleChange & handleSubmit functions.
 */
const useValidation = (initialState, validate, fn) => {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [submitForm, setSubmitForm] = useState(false);

    useEffect(() => {
        if (submitForm) {
            const noErrors = Object.keys(errors).length === 0;

            if (noErrors) {
                fn();
            }

            setSubmitForm(false);
        }
    }, [errors]);

    /**
     * @name: handleChange.
     * @description: updates the state (values) with the data entered by the user.
     * @param: event.
     * @return: none.
    */
    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name] : e.target.value
        });
    }

    /**
     * @name: handleSubmit.
     * @description: checks for errors in the data entered by the user & update the state (errors & submitForm).
     * @param: event.
     * @return: none.
    */
    const handleSubmit = e => {
        e.preventDefault();

        const validationErrors = validate(values);
        setErrors(validationErrors);
        setSubmitForm(true);
    }

    /**
     * @name: handleBlur.
     * @description: checks for errors when the event blur is created.
     * @param: none.
     * @return: none.
    */
    const handleBlur = () => {
        const validationErrors = validate(values);
        setErrors(validationErrors);
    }

    return {
        values,
        errors,
        submitForm,
        handleChange,
        handleSubmit,
        handleBlur
    };
}
 
export default useValidation;