import React, { useState, useEffect } from 'react';
import styles from './SourceCard.module.css';
import 'antd/dist/antd.css';
import { AlertFilled } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import { subscribeSource } from '../api/sources';
const { Paragraph } = Typography;


function SourceCard(props) {

    const [subscribed, setSubscribed] = useState(false);
    const [errorMSG, setErrorMSG] = useState(null);
    const { source, subscribtions } = props;

    useEffect(() => {
        if (subscribtions.includes(source.id)) {
            setSubscribed(true);
        }
    }, []);



    const handleSubscribe = (e) => {
        subscribeSource(source.id, "subscribe").then(res => {
            setSubscribed(true);
        }).catch(err => {
            setErrorMSG("Connection failed");
        })
    }
    const handleUnSubscribe = () => {
        subscribeSource(source.id, "unsubscribe").then(res => {
            setSubscribed(false);
        }).catch(err => {
            setErrorMSG("Connection failed");
        })
    }


    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.label}>
                    {source.category}
                </div>
                <div className={styles.card__container}>
                    <h1 className={styles.card__header}>
                        <a href={source.url}>
                            {source.name}
                        </a>
                    </h1>
                    <Paragraph className={styles.card__body} ellipsis={{ rows: 1, expandable: true, symbol: 'more' }}>
                        {source.description}
                    </Paragraph>
                    {
                        subscribed ?
                            <Button
                                icon={<AlertFilled />}
                                type="secondary"
                                onClick={handleUnSubscribe}
                            >
                                Subscribed
                            </Button>
                            :
                            <Button
                                icon={<AlertFilled />}
                                type="primary"
                                onClick={handleSubscribe}
                            >
                                Subscribe
                            </Button>
                    }
                </div>
            </div>
        </div>
    )
}

export default SourceCard
