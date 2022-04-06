/* eslint-disable */ 
import React from 'react'
import millify from 'millify'
import { useGetExchangesQuery } from '../services/cryptoApi'
import { Collapse, Row, Col, Typography, Avatar } from 'antd'
import Loader from './Loader'
import { useParams } from 'react-router-dom';
const { Text } = Typography
const { Panel } = Collapse
const Exchanges = () => {
    const { coinId } = useParams();
    const { data, isFetching } = useGetExchangesQuery(coinId)
    const cryptoExchanges = data?.data?.exchanges
    debugger
    if(isFetching) return <Loader  />

    return (
        <>
            <Row>
                <Col span={6}>Exchanges</Col>
                <Col span={6}>Price</Col>
                <Col span={6}>Markets</Col>
                <Col span={6}>BTC Price</Col>
            </Row>
            <Row>
                {cryptoExchanges.map((exchange)=>(
                    <Col span={24} key={exchange.uuid}>
                        <Collapse>
                            <Panel
                                key={exchange.uuid}
                                showArrow={false}
                                header={(
                                    <Row key={exchange.uuid}>
                                        <Col span={6}>
                                            <Text><strong>{exchange.rank}.</strong></Text>
                                            <Avatar className="exchange-image" src={exchange.iconUrl} />
                                            <Text><strong>{exchange.name}</strong></Text>
                                        </Col>
                                        <Col span={6}>${millify(exchange.price)}</Col>
                                        <Col span={6}>${millify(exchange.numberOfMarkets)}</Col>
                                        <Col span={6}>${millify(exchange.btcPrice)}</Col>
                                    </Row>
                                )}
                            >
                            </Panel>
                        </Collapse>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Exchanges
