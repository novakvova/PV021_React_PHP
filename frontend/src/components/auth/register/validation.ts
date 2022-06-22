import * as yup from "yup";

export const RegisterSchema = yup.object({
  email: yup
    .string()
    .email("Вкажіть праивльно пошту")
    .required("Пошта є обов'язкови полум"),
  photo: yup.string().required("Оберіть фото"),
});
