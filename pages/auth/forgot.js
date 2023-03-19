import styles from '../../styles/forgot.module.scss';
import { Header } from "../../components/header";
import {Footer} from '../../components/footer';
import { LoginInput } from '../../components/inputs/loginInput';
import Link from 'next/link';
import { IoArrowBackOutline } from 'react-icons/io5';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { CircleIconBtn } from '../../components/button/circleIconBtn';
import axios from 'axios';
import { LoaderSpinner } from '../../components/loader/dotLoader';


const Forgot = () =>  {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState("");
    const emailValidation = Yup.object({
        email: Yup.string()
            .required(
                "You'll need this when you log in and if you ever need to reset your password."
            )
            .email("Enter a valid email address."),
    });

    const forgotHandler = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post("/api/auth/forgot", {
                email,
            });
            setError(""),
            setSuccess(data.message);
            setLoading(false);
            setEmail("");
        } catch (error) {
            setLoading(false);
            setSuccess("");
            setError(error.response.data.message);
        }
    };

    return (
        <>
            {loading && <LoaderSpinner loading={loading} />}
            <Header />
            <div className={styles.forgot}>
                <div>
                    <div className={styles.forgot__header}>
                        <div className={styles.back__svg}>
                            <IoArrowBackOutline />
                        </div>
                        <span>
                            Forgot password ? <Link href="/">Login instead</Link>
                        </span>
                    </div>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            email,
                        }}
                        validationSchema={emailValidation}
                        onSubmit={() => {
                            forgotHandler();
                        }}
                    >
                        {(form) => (
                            <Form>
                                <LoginInput
                                    type="text"
                                    name="email"
                                    icon="email"
                                    placeholder="Email Address"
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <CircleIconBtn type="submit" text="Send link" />
                                <div style={{ marginTop: "10px" }}>
                                    {error && <span className={styles.error}>{error}</span>}
                                    {success && <span className={styles.success}>{success}</span>}
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            <Footer />
        </>
    )
}



export default Forgot;