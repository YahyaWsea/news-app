import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './Register.module.css';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { Form, Input, Button } from 'antd';
import { registerUser } from '../api/UserApi';

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
};

export default function Register(props) {


    const validateMessages = {
        required: '${name} is required!',
        types: {
            email: '${name} is not validate email!',
        },
    };

    const onFinish = ({ fullname, email, password, confirm_password }) => {
        const formData = {
            fullname,
            email,
            password,
            confirm_password
        }
        registerUser(formData).then(res => {
            if (res.data.status === "success") {
                console.log(res);
                sessionStorage.setItem('token', res.data.token);
                props.history.push('/');
            } else {
                console.log(res);
            }
        })
            .catch(err => {
                console.log(err);
            })
        // console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };



    return (
        <>
            <section className={styles.section}>
                <div className={styles.container}>
                    <h1 className={styles.title}>Sign Up</h1>
                    <Form {...layout}
                        name="nest-messages"
                        onFinish={onFinish}
                        // style={{ marginTop: "5rem" }}
                        validateMessages={validateMessages}
                        className={styles.form}
                        wrapperCol={{ span: 24 }}
                    >
                        <Form.Item name='fullname'
                            rules={[{ required: true }]} >
                            <Input prefix={<UserOutlined />} placeholder="Fullname" className={styles.input_field} />
                        </Form.Item>
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
                            <Input.Password prefix={<LockOutlined />} placeholder="Password" className={styles.input_field} />
                        </Form.Item>
                        <Form.Item
                            name="confirm_password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: "confirm password is required"
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('The passwords that entered do not match!');
                                    },
                                }),
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" className={styles.input_field} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className={styles.submit_btn}>
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                    <h4 className={styles.link}>Have an account ?  <Link to="/login">Login</Link> </h4>

                </div>
            </section>
        </>
    );
}