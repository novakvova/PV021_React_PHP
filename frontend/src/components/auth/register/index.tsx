import { Form, FormikProvider, useFormik } from "formik";
import { IRegister } from "./types";
import { RegisterSchema } from "./validation";
import classNames from "classnames";
import CropperDialog from "../../common/CropperDialog";

const RegisterPage = () => {

    const initialValues: IRegister = {
        firstName: "",
        secondName:"",
        email: "",
        phone: "",
        photo: "",
        password: "",
        confirmPassword: ""
    };

    const onHandleSubmit = async (values: IRegister) =>
    {
        console.log("Submit form", values);
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: RegisterSchema,
        onSubmit: onHandleSubmit
    });

    const { errors, touched, handleSubmit, handleChange } = formik;

    return (
      <div className="row">
        <div className="offset-md-3 col-md-6">
          <h1 className="text-center">Реєстрація</h1>
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>

              <CropperDialog/>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Електронна адреса
                </label>
                <input type="email" 
                    className= { classNames("form-control",
                        {"is-invalid": touched.email && errors.email},
                        {"is-valid": touched.email && !errors.email}
                    )}
                    id="email"
                    name="email"
                    onChange={handleChange}
                    />
                    {touched.email && errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              <button type="submit" className="btn btn-primary">
                Реєструватися
              </button>
            </Form>
          </FormikProvider>
        </div>
      </div>
    );
}

export default RegisterPage;