import { Form, FormikProvider, useFormik } from "formik";
import { IRegister, IRegisterRequest } from "./types";
import { RegisterSchema } from "./validation";
import classNames from "classnames";
import CropperDialog from "../../common/CropperDialog";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useState } from "react";
import { useActions } from "../../../hooks/useActions";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {

    const { executeRecaptcha } = useGoogleReCaptcha();
    const [bot, setBot] = useState<boolean>(false);
    const navigate = useNavigate();
    const { RegisterUser } = useActions();

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
        try {
          console.log("Submit form", values);
          if (!executeRecaptcha) {
            setBot(true);
            return;
          }
          const recaptchaToken = await executeRecaptcha();
          const model : IRegisterRequest = {
            ...values, 
            RecaptchaToken: recaptchaToken
          };
          console.log("sfdsdfsdfsdf--------", model);
          await RegisterUser(model);
          //await dispatch(RegisterUser(model));
          navigate('/');
          
        } catch (error) {
          console.error("propblem submit", error);
        }
       
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: RegisterSchema,
        onSubmit: onHandleSubmit
    });

    const { errors, touched, handleSubmit, handleChange, setFieldValue } = formik;

    return (
      <div className="row">
        <div className="offset-md-3 col-md-6">
          <h1 className="text-center">Реєстрація</h1>
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>

              <CropperDialog
                onChange={setFieldValue}
                field="photo"
                error={errors.photo}
                touched={touched.photo}
                aspectRation={1/1}
                />

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