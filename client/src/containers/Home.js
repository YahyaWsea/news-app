import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.css';
import { Layout, Row, Col } from 'antd';
import WithNavBar from './WithNavBar';
import EmptyPlaceholder from '../components/EmptyPlaceholder';
import ArticleCard from '../components/ArticleCard'
import Loader from '../components/Loader'
import { getArticles } from '../api/NewsApi'
import { getUserSubscribtions } from '../api/UserApi'




const { Content } = Layout;




function Home(props) {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [found, setFound] = useState(true);

    useEffect(() => {
        setLoading(true);

        async function fetchData() {
            const subs = await getUserSubscribtions();
            console.log(subs);
            if (!subs.data.length) {
                setLoading(false);
                setFound(false);
            } else {
                const res = await getArticles(subs.data);
                setLoading(false);
                setArticles(res.data.articles);
                console.log(res.data.articles);
            }
        }
        fetchData();
        // getUserSubscribtions().then((res) => {
        //     console.log(res);
        //     // setSubs(res);
        //     getArticles(res.data).then(res => {
        //         console.log(res.data.articles);
        //         setArticles(res.data.articles);
        //         setLoading(false);
        //     })
        //         .catch(err => console.log(err));

        // }).catch((err) => {
        //     console.log(err);
        // })

    }, []);


    return (
        <>
            <Content style={{ padding: '0 50px' }}>
                <Row justify="space-around" style={{}} >
                    {
                        loading ?
                            <Col>
                                <Loader />
                            </Col>
                            :
                            articles.map((article) =>

                                <Col style={{ marginTop: "2rem" }} >
                                    <ArticleCard
                                        key={article.title}
                                        article={article}
                                    />
                                </Col>
                            )
                    }
                    {
                        found ? null : <EmptyPlaceholder msg=" Subscribe sources to get articles " />
                    }
                </Row>
            </Content>

        </>
    )
}

export default WithNavBar(Home)
