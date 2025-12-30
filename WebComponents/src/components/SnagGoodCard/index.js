import './index.scss'
import { Image, Card, Button, Flex, Progress } from 'antd';
import { SendOutlined, StarFilled, SwapOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import React from 'react';

const { Meta } = Card;

const SnagGoodCard = ({ data }) => {

  const steps = [1, 2, 3, 4]

  // 练习商家
  const handleSendOutlined = () => {
    console.log('点击了联系商家')

  }

  // 判断订单状态
  const handleOrderRating = (status) => {
    const red = 'rgba(212, 48, 48, 1)'
    const yellow = 'rgba(255, 195, 0, 1)'
    return (
      <span style={{ height: '20px', fontSize: '16px', lineHeight: '16px', color: status === 'OK' ? yellow : red }}><StarFilled style={{ margin: '0 6px 0 8px', fontSize: '14px' }} />{status}</span>
    )
  }

  // 重新提交操作
  const handleResubmitAction = () => {
    console.log('点击了重新提交')
  }

  // 退回商品
  const handleReturnItem = () => {
    console.log('点击了退回商品')
  }

  // 显示评分
  const handleShowRating = () => {
    console.log('点击了显示评分')
  }

  // 控制步骤状态
  const [stepStatus, setStepStatus] = useState(0)
  useEffect(() => {
    setStepStatus(data.step)
  }, [data.step])

  // cash back
  const handleCashBack = () => {
    console.log('点击了cash back')
  }

  return (
    <div className='snag-good-card'>
      {/* 图片 */}
      <Image
        width={222}
        height={300}
        alt="basic"
        className='snag-good-card-img'
        preview={false}
        src={data.img.url}
      />

      {/* 主要区域 */}
      <div className='snag-good-card-main'>
        {/* 主要信息和按钮 */}
        <div className='info-btn'>
          <Card style={{ width: 260, height: 160 }}>
            {/* pending-pay */}
            <Meta
              name='pending-pay'
              className='pending-pay'
              description='pending-payment'
            />

            {/* 标题样式 */}
            <Meta
              name='title'
              className='title'
              description={data.title}
            />

            {/* 卖家 */}
            {data.seller && (
              <Meta
                name='seller'
                className='seller'
                description={<>
                  <span>Seller: {data.seller}</span>
                  <SendOutlined
                    style={{ width: '20px', color: 'rgba(0, 0, 0, 1)' }}
                    onClick={handleSendOutlined} />
                </>}
              />
            )}

            {/* 订单状态 */}
            <Meta
              name='order-rating'
              className='order-rating'
              description={<>
                <span>Order Rating:</span>
                {handleOrderRating(data.status)}
              </>}
            />
          </Card>

          {/* 按钮 */}
          <Flex className='btn-wrapper'>
            <Button onClick={handleResubmitAction} className='resubmit-action' color="default" variant="solid">Resubmit Action</Button>
            <Button onClick={handleReturnItem} className='return-item'><i className='iconfont icon-ys-reback' />Return Item</Button>
            <Button onClick={handleShowRating} className='show-rating'>Show Rating</Button>
          </Flex>
        </div>

        {/* cash-back */}
        <div className='cash-back'>
          <SwapOutlined style={{ fontSize: '20px', marginRight: '10px' }} onClick={handleCashBack} />
          <span>cash back</span>
          <span className='wallet'>via Wallet</span>
        </div>

        {/* 步骤 */}
        <div className='steps'>
          {/* 步骤图标 */}
          <Flex wrap gap="small" className='steps-wrapper'>
            {steps.map(item => {
              if (item !== 4) {
                return (<React.Fragment key={item}>
                  <Progress type="circle" percent={stepStatus >= item ? 100 : 0} size={48} format={() => item} />
                  <Progress type="line" percent={stepStatus >= (item + 1) ? 100 : 0} size={[60, 4]} style={{ width: '80px', margin: 'auto 0' }} format={() => null} />
                </React.Fragment>)
              } else {
                return (
                  <React.Fragment key={item}>
                    <Progress type="circle" percent={stepStatus >= item ? 100 : 0} size={48} format={() => item} />
                  </React.Fragment>)
              }
            })}
          </Flex>
          {/* 步骤文字 */}
          <Flex wrap gap="small" className='steps-text'>
            <span style={{ color: stepStatus >= 1 ? 'rgba(143, 209, 0, 1)' : 'rgba(0, 0, 0, 1)' }}>Confirm order</span>
            <span style={{ color: stepStatus >= 2 ? 'rgba(143, 209, 0, 1)' : 'rgba(0, 0, 0, 1)' }}>Complete survey</span>
            <span style={{ color: stepStatus >= 3 ? 'rgba(143, 209, 0, 1)' : 'rgba(0, 0, 0, 1)' }}>Pending approval</span>
            <span style={{ color: stepStatus >= 4 ? 'rgba(143, 209, 0, 1)' : 'rgba(0, 0, 0, 1)' }}>Completed</span>
          </Flex>
        </div>
      </div>
    </div>
  )
}

export default SnagGoodCard