export default function validateNewAccount(values) {
    let errors = {};

    if(!values.name) {
        errors.name = "Name is required";
    }

    if(!values.email) {
        errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Enter a valid email";
    };

    if(!values.password) {
        errors.password = "Password is required";
    } else if (values.password.lenght < 6) {
        errors.password = "The password must have at least 6 characters";
    }

    return errors;
}