import React, { useEffect } from 'react';
import { Card, Spin, Alert, Button, Typography, Space } from 'antd';
import { Link } from 'react-router-dom';
import { useMarketStore } from '../stores/marketStore';
import type { Market } from '../types/market';

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  const { markets, loading, error, fetchMarkets } = useMarketStore();

  useEffect(() => {
    fetchMarkets();
  }, [fetchMarkets]);

  return (
    <div style={{ padding: '16px', maxWidth: '1200px', margin: '0 auto' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Welcome to the Prediction Market</Title>
        <Paragraph>
          Connect your TON wallet to start betting on exciting prediction markets using TON or USDT!
          <div>
            <Button type="primary" style={{ marginTop: '8px' }} disabled>
              Connect Wallet
            </Button>
          </div>
        </Paragraph>

        <Space>
          <Link to="/profile">
            <Button type="default">Profile</Button>
          </Link>
          <Link to="/dashboard">
            <Button type="default">Dashboard</Button>
          </Link>
          <Link to="/admin">
            <Button type="default">Admin Dashboard</Button>
          </Link>
        </Space>

        <Title level={3}>Active Markets</Title>
        {loading ? (
          <Spin tip="Loading markets..." />
        ) : error ? (
          <Alert message="Error" description={error} type="error" showIcon />
        ) : markets.length === 0 ? (
          <Card>
            <p>No markets available</p>
            <p>Check back later for new prediction markets!</p>
          </Card>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '16px',
            }}
          >
            {markets.map((market: Market) => (
              <Card
                key={market.id}
                title={market.title}
                style={{ borderRadius: '8px' }}
                hoverable
              >
                <p>Ends: {new Date(market.endDate).toLocaleDateString()}</p>
                <p>TON Pool: {market.tonPool} TON</p>
                <p>USDT Pool: {market.usdtPool} USDT</p>
                <Link to={`/market/${market.id}`}>
                  <Button type="primary">View Details</Button>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </Space>
    </div>
  );
};

export default Home;