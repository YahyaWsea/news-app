import React from 'react'
import 'antd/dist/antd.css';
import { Form, Select, Button, Col, Row } from 'antd';
import styles from './SearchForm.module.css';

const { Option } = Select;
function SearchForm(props) {
    const { handleFilter } = props;

    const onFinish = values => {
        handleFilter(values);
    };



    return (
        <>
            <Form
                name="nest-messages"
                onFinish={onFinish}
                style={{ marginTop: "5rem" }}
            >
                <Row justify="space-around" align="space-around" className={styles.search_container}>
                    <Col span={5} >
                        <Form.Item
                            name="category"
                        >
                            <Select placeholder="Category" className={styles.input_field}>
                                <Option value="business">Business</Option>
                                <Option value="sports">Sports</Option>
                                <Option value="science">Science</Option>
                                <Option value="health">Health</Option>
                                <Option value="general">General</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item
                            name="language"
                        >
                            <Select placeholder="Language" className={styles.input_field}>
                                <Option value="ar">Arabic</Option>
                                <Option value="en">English</Option>
                                <Option value="fr">French</Option>
                                <Option value="es">Spanish</Option>
                                <Option value="it">Italian</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={5}>
                        <Row justify='center'>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Filter
                            </Button>
                            </Form.Item>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </>

    )
}

export default SearchForm
