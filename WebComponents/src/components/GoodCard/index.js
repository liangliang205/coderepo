import './index.scss'
import React from 'react';
import { Card, Rate } from 'antd';
import classNames from 'classnames'
import { HeartOutlined } from '@ant-design/icons';

const { Meta } = Card;



// 详情卡片

const GoodCard = ({ data }) => {
  // 处理收藏按钮
  const handleCollect = (e) => {
    // 阻止事件冒泡，避免触发卡片的点击事件
    e.stopPropagation();
    console.log('收藏点击了')

  }

  // 处理卡片点击
  const handleClickCard = () => {
    console.log('点击了卡片')

  }

  return (
    <div>
      <Card
        onClick={handleClickCard}
        className={classNames('detail')}
        hoverable
        cover={
          <div className='img-wrapper'>
            <img
              draggable={false}
              alt="example"
              src={data.imgs[0] ? data.imgs[0].url : ''}
            />
            <HeartOutlined className='icon-btn' onClick={handleCollect} />
          </div>
        }
      >
        {/* 标题 */}
        <Meta
          name='title'
          className='title'
          // 这里我填充的属性同意设置为description
          description={data.title}
        />
        {/* 价格 */}
        <Meta
          name='price'
          className='price'
          description={<>
            <span className='new-price'>${data.newPrice.toFixed(2)}</span>
            <span className='old-price'>${data.oldPrice.toFixed(2)}</span>
          </>}
        />
        {/* 评分 */}
        <Meta
          name='grade'
          className='grade'
          description={
            <Rate allowHalf disabled defaultValue={data.grade} size='small' />
          }
        />
        {/* 标签 */}
        <Meta
          name='label'
          className='label'
          description={<>
            {data.tags.day > 0 && <span className='day'>{data.tags.day} days left</span>}
            {data.tags.stock > 0 && <span className='stock'>{data.tags.stock}+ in stock</span>}
          </>}
        />
      </Card>
    </div>
  )
}

export default GoodCard