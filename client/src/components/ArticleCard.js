import React from 'react'
import styles from './ArticleCard.module.css'
import 'antd/dist/antd.css';
import { AlertFilled } from '@ant-design/icons';


function ArticleCard(props) {

    const { article } = props;


    return (
        // <div className={styles.cards_item}  >
        <div className={styles.card}>
            <div className={styles.card_image}>
                <img className={styles.img}
                    src={article.urlToImage != "null" ? article.urlToImage : "/images/news-placeholder.jpg"}
                />
            </div>
            <div className={styles.card_content}>
                <h2 className={styles.card_title}>{article.title}</h2>

                {
                    article.author ?
                        <h4 className={styles.card_text}><strong>By </strong>{article.author}</h4>
                        : null
                }

                <a href={article.url} className={`${styles.btn} ${styles.card_btn}`}>Read More</a>
            </div>
        </div>
        // </div>


    )
}

export default ArticleCard
