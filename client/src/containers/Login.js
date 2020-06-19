import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './Register.module.css';
import 'antd/dist/antd.css';
import { Form, Input, Button } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { loginUser } from '../api/UserApi';


const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
};

export default function Login(props) {


    const validateMessages = {
        required: '${name} is required!',
        types: {
            email: '${name} is not validate email!',
        },
    };

    const onFinish = ({ email, password }) => {
        const formData = {
            email,
            password
        }
        loginUser(formData).then(res => {
            if (res.data.status === "success") {
                sessionStorage.setItem('token', res.data.token);
                // const userInfo = JSON.parse(window.atob(res.data.token.split('.')[1].replace(/_/g, '/').replace(/-/g, '+')));
                console.log(res.data);
                console.log(res.status);
                // props.history.push('/');
                window.location.pathname = "/";
            } else {
                console.log(res);
            }
        })
            .catch(err => {
                console.log(err);
            })
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
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
                                {
                                    required: true,
                                },
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