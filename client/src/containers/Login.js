import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Register.module.css';
import 'antd/dist/antd.css';
import { Form, Input, Button, Alert } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { loginUser } from '../api/user';


const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
};

export default function Login(props) {

    const [errorMSG, setErrorMSG] = useState(null);
    const [visible, setVisible] = useState(true);


    const validateMessages = {
        required: '${name} is required!',
        types: {
            email: '${name} is not validate email!',
        },
        min: 'password must be at least 8 characters'
    };
    const handleClose = () => {
        setVisible(false);
    };
    const onFinish = ({ email, password }) => {
        const formData = {
            email,
            password
        }
        loginUser(formData).then(res => {
            const { data: { status, token } } = res;
            sessionStorage.setItem('token', token);
            props.history.push('/');
        }).catch(err => {
            setErrorMSG(err.response.data.message);
        })
    };

    return (
        <>
            <section className={styles.section}>
                <div className={styles.container}>
                    <h1 className={styles.title}>Sign In</h1>
                    <Form {...layout}
                        name="login_form"
                        onFinish={onFinish}
                        validateMessages={validateMessages}
                        className={styles.form}
                        wrapperCol={{ span: 24 }}
                    >
                        <Form.Item name='email'
                            rules={[
                                {
                                    required: true,
                                    type: 'email'
                                }
                            ]}
                            hasFeedback
                        >
                            <Input prefix={<MailOutlined />} placeholder="Email" className={styles.input_field} />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                { required: true },
                                { min: 8, message: "password must be at least 8 characters" }
                            ]}
                            hasFeedback
                        >
                            <Input
                                prefix={<LockOutlined />}
                                type="password"
                                placeholder="Password"
                                className={styles.input_field}
                            />
                        </Form.Item>
                        {
                            errorMSG && <Alert
                                description={errorMSG}
                                type="error"
                                closable
                            />
                        }
                        <Form.Item >
                            <Button type="primary" htmlType="submit" className={styles.submit_btn}>
                                Login
                    </Button>
                        </Form.Item>
                    </Form>
                    <h4 className={styles.link}>Don't have account?  <Link to="/register">Register</Link> </h4>
                </div>
            </section>
        </>
    );
}