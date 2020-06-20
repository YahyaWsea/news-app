import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.css';
import { Layout, Row, Col, Pagination } from 'antd';
import WithNavBar from './WithNavBar';
import EmptyPlaceholder from '../components/EmptyPlaceholder';
import ArticleCard from '../components/ArticleCard';
import Loader from '../components/Loader';
import { getArticles } from '../api/news';




const { Content } = Layout;




function Home(props) {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [found, setFound] = useState(true);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            const { data: { articles } } = await getArticles(page, pageSize);
            if (!articles) {
                setLoading(false);
                setFound(false);
            } else {
                setLoading(false);
                setArticles(articles);
            }
        }
        fetchData();

    }, [page, pageSize]);

    const handlePagination = (page, pageSize) => {
        setPage(page);
    }
    const handlePageSizeChange = (current, size) => {
        setPageSize(size);
        setPage(1);
    }


    const renderArticles = () => {
        return (
            articles.map((article) =>
                <Col style={{ marginTop: "2rem" }} >
                    <ArticleCard
                        key={article.title}
                        article={article}
                    />
                </Col>
            )
        )
    }


    return (
        <>
            <Content style={{ padding: '0 50px' }}>
                <Row align="middle" justify="center" style={{ marginTop: "2rem" }} >
                    {
                        found ?
                            <Col>
                                <Pagination
                                    current={page}
                                    onChange={handlePagination}
                                    defaultCurrent={1}
                                    total={100}
                                    pageSize={pageSize}
                                    showSizeChanger
                                    pageSizeOptions={['6', '9', '12']}
                                    onShowSizeChange={handlePageSizeChange}
                                />

                            </Col>
                            : null
                    }

                </Row>
                <Row justify="space-around" style={{}} >
                    {
                        loading ?
                            <Col>
                                <Loader />
                            </Col>
                            :
                            renderArticles()
                    }
                    {
                        found ? null : <EmptyPlaceholder msg=" Subscribe sources to get articles and news" />
                    }
                </Row>
            </Content>

        </>
    )
}

export default WithNavBar(Home)
