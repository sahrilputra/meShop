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
import { getProviders } from 'next-auth/react';
import { Provider } from 'react-redux';

const initialValues = {
  login_email: "",
  login_password: "",
};

export default function Signin ({providers}) {
  console.log(providers);
  const [user, setUser] = useState(initialValues);
  const { login_email, login_password } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

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
                    <CircleIconBtn type="type" text="Sign in" />
                    <div className={styles.forgot}>
                      <Link href="/forget">Forgot Pasword ?</Link>
                    </div>
                  </Form>
                )
              }
            </Formik>
            <div className={styles.login__socials}>
              <span className={styles.or}>Or Cntinue with</span>
              <div className={styles.login__socials_wrap}>
                {providers.map((provider)=> {
                  if(provider.name == "Credentials"){
                    return;
                  }
                  return(
                    <div key={provider.name}>
                      <button
                      className={styles.socials__btn}
                      onClick={()=> Signin(provider.id)}
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
      </div>
  
      <Footer />
    </>
  )
}

export async function getServerSideProps(content){
  const providers = Object.values(await getProviders());
  console.log(providers);
  return { 
    props : {
      providers,
    }
  }
}
