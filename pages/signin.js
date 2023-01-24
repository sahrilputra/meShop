import styles from '../styles/signin.module.scss';
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { IoArrowBackOutline } from "react-icons/io5";
import Link from 'next/link';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { LoginInput } from '../components/inputs/loginInput';
import { useState } from 'react';
const initialValues = {
  login_email: "",
  login_password: "",
};
const Signin = () => {
  const [user, setUser] = useState(initialValues);
  const { login_email, login_password } = user;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }
  console.log(user);
  const loginValidation = Yup.object({
    login_email: Yup.string().
    required("Email Required").
    email('Enter a valid Email'),
    login_password:Yup.string().required("Enter a password"),
  })
  return (
    <>
      {/* <Header /> */}
      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
              <IoArrowBackOutline />
            </div>
            <span>
              <p>Lets join with us ! <Link href="#"> Go Store</Link></p>
            </span>
          </div>
          <div className={styles.login__form}>
            <h1>Sign in</h1>
            <p>Get access to the best E-commarce</p>
            <Formik
              enableReinitialize
              initialValues={{
                login_email,
                login_password
              }}
              validationSchema={loginValidation}
            >
              {
                (form) => (
                  <Form>
                    <LoginInput
                      type="text"
                      name="login_email"
                      icon="email"
                      placeholder="Email"
                      onChange={handleChange}
                    />
                    <LoginInput
                      type="password"
                      name="login_password"
                      icon="password"
                      placeholder="Password"
                      onChange={handleChange}
                    />
                  </Form>
                )
              }
            </Formik>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Signin