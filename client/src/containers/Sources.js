import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Layout, Row, Col } from 'antd';
import WithNavBar from './WithNavBar';
import SearchForm from '../components/SearchForm';
import SourceCard from '../components/SourceCard';
import Loader from '../components/Loader';
import EmptyPlaceholder from '../components/EmptyPlaceholder';
import { getSources, getFilteredSources } from '../api/NewsApi';
import { getUserSubscribtions } from '../api/UserApi';


const { Content } = Layout;


function Sources(props) {
    const [sources, setSources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [found, setFound] = useState(true);
    const [subs, setSubs] = useState([]);


    useEffect(() => {
        setLoading(true);
        getSources().then(res => {
            console.log(res.data.sources);
            setSources(res.data.sources);
            setLoading(false);
            if (!res.data.sources.length) {
                setFound(false);
            }
        }).catch(err => console.log(err));

        getUserSubscribtions().then((res) => {
            setSubs(res.data);
        }).catch(err => console.log(err));

    }, []);


    const handleFilter = ({ category, language }) => {
        setLoading(true);
        getFilteredSources(category, language).then((res) => {
            console.log(res.data.sources);
            setLoading(false);
            setSources(res.data.sources);
            if (!res.data.sources.length) {
                setFound(false);
            }
        }).catch(err => {
            console.log(err);
        })
    }



    return (
        <>
            <Content style={{ padding: '0 50px' }}>
                <SearchForm handleFilter={handleFilter} />
                <Row justify="space-around" >
                    {
                        loading ?
                            <Col>
                                <Loader />
                            </Col>
                            :
                            sources.map((elem) =>

                                <Col style={{ marginTop: "2rem" }} >
                                    <SourceCard
                                        key={elem.id}
                                        source={elem}
                                        subscribtions={subs}
                                    />
                                </Col>
                            )
                    }
                    {
                        found ? null : <EmptyPlaceholder msg="No Sources Found" />
                    }
                </Row>
            </Content>
        </>

    )
}

export default WithNavBar(Sources)
