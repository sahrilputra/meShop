/* eslint-disable @next/next/no-img-element */
import styles from '../styles/signin.module.scss';
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { CircleIconBtn } from '../components/button/circleIconBtn';
import { IoArrowBackOutline } from "react-icons/io5";
import Link from 'next/link';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { LoginInput } from '../components/inputs/loginInput';
import { useState } from 'react';
// import { getProviders, signIn } from 'next-auth/react';
import axios from "axios";
import { Provider } from 'react-redux';
import { LoaderSpinner } from '../components/loader/dotLoader';
import Router from "next/router";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
  country,
} from "next-auth/react";

const initialValues = {
  login_email: "",
  login_password: "",
  name: "",
  email: "",
  password: "",
  conf_password: "",
  success: "",
  error: "",
  login_error: "",
};
export default function Signin({ providers, callbackUrl, csrfToken }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialValues);
  const {
    login_email,
    login_password,
    name,
    email,
    password,
    conf_password,
    success,
    error,
    login_error,
  } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  //registerValidation
  const loginValidation = Yup.object({
    login_email: Yup.string().
      required("Email Required").
      email('Enter a valid Email'),
    login_password: Yup.string().required("Enter a password"),
  })
  const registerValidation = Yup.object({
    name: Yup.string().
      required("Input your name")
      .min(2, "Name must be between 2 and 16 characters")
      .max(16, "Name must be between 2 and 16 characters")
      .matches(/^[aA-zZ]/, "Number and Special characters are not allowed"),
    email: Yup.string()
      .required("Input Your Email Address")
      .email("Enter a valid email address."),
    password: Yup.string()
      .required("Enter a combination of at least six numbers, and mark (such as ! and &).")
      .min(6, "Password must be at least 6 characters")
      .max(36, "Password can't be more than 36 characters"),
    conf_password: Yup.string()
      .required("Confirm your password")
      .oneOf([Yup.ref("password")], "Password must match"),

  })

  const signUpHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });
      setUser({ ...user, error: "", success: data.message });
      setLoading(false);
      setTimeout(async () => {
        let options = {
          redirect: false,
          email: email,
          password: password,
        };
        const res = await signIn("credentials", options);
        Router.push("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setUser({ ...user, success: "", error: error.response.data.message });
    }
  };

  const singInHandler = async () => {
    setLoading(true);
    let options = {
      redirect: false,
      email: login_email,
      password: login_password,
    };
    const res = await signIn("credentials", options);
    setUser({ ...user, success: "", error: "" });
    setLoading(false);
    if (res?.error) {
      setLoading(false);
      setUser({ ...user, login_error: res?.error });
    } else {
      return Router.push(callbackUrl || "/");
    }
  }


  return (

    <>
      {/* <Header /> */}
      {
        loading && <LoaderSpinner loading={loading} />
      }
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
              onSubmit={() => {
                singInHandler();
              }}
            >
              {
                (form) => (
                  <Form method='post' action='/api/auth/signin/email'>
                    <input type='hidden'
                    name='csrfToken'
                    defaultValue={csrfToken}
                    />
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
                    <CircleIconBtn type="submit" text="Sign in" />
                    {login_error && (
                      <span className={styles.error}>{login_error}</span>
                    )}
                    <div className={styles.forgot}>
                      <Link href="/auth/forgot">Forgot Pasword ?</Link>
                    </div>
                  </Form>
                )}

            </Formik>
            <div className={styles.login__socials}>
              <span className={styles.or}>Or Cntinue with</span>
              <div className={styles.login__socials_wrap}>
                {providers.map((provider) => {
                  if (provider.name == "Credentials") {
                    return;
                  }
                  return (
                    <div key={provider.name}>
                      <button
                        className={styles.socials__btn}
                        onClick={() => signIn(provider.id)}
                      >

                        <img src={`../../icons/${provider.name}.png`} alt="provider-logo" />
                        Signin with {provider.name}
                      </button>
                    </div>
                  );
                })
                }
              </div>
            </div>
          </div>
        </div>
        <div className={styles.login__container}>
          <div className={styles.login__form}>
            <h1>Sign up</h1>
            <p>Get access to the best E-commarce</p>
            <Formik
              enableReinitialize
              initialValues={{
                name,
                email,
                password,
                conf_password,
              }}
              validationSchema={registerValidation}
              onSubmit={() => {
                signUpHandler();
              }}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    type="text"
                    name="name"
                    icon="user"
                    placeholder="Full Name"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="text"
                    name="email"
                    icon="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="password"
                    icon="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="conf_password"
                    icon="password"
                    placeholder="Re-Type Password"
                    onChange={handleChange}
                  />
                  <CircleIconBtn type="submit" text="Sign up" />
                </Form>
              )}
            </Formik>
            <div>
              {success && <span className={styles.success}>{success}</span>}
            </div>
            <div>{error && <span className={styles.error}>{error}</span>}</div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export async function getServerSideProps(context) {

  const {req, query } = context;
  const session = await getSession({req});
const {callbackUrl} = query;

  if(session){
    return{
      redirect: {
        destination: callbackUrl,
      }
    }
  }
  const csrfToken = await getCsrfToken(context);

  const providers = Object.values(await getProviders());
  return {
    props: { providers,csrfToken, callbackUrl },
  }
}
