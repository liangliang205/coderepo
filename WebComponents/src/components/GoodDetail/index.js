
import './index.scss'
import React from 'react';
import { Image, Card, Rate, Button } from 'antd';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { RightOutlined, FacebookOutlined, GithubOutlined, GoogleOutlined } from '@ant-design/icons';
import '@/assets/iconfont/iconfont.css'


const { Meta } = Card;

const GoodDetail = ({ data }) => {
  const { imgs } = data;

  // 控制父盒子goods-detail的高度
  const GoodDetailRef = useRef(null)

  // 详情信息的展开与收起
  const [descriptionExpanded, setDescriptionExpanded] = useState(false)
  const descriptionRef = useRef(null)
  const [isTextOverflow, setIsTextOverflow] = useState(false)

  useEffect(() => {
    // 当展开状态改变时，更新父容器高度
    if (GoodDetailRef.current) {
      if (descriptionExpanded) {
        // 获取所有内容的实际高度
        const detailCard = GoodDetailRef.current.querySelector('.detail-data')
        if (detailCard) {
          const contentHeight = detailCard.scrollHeight
          GoodDetailRef.current.style.height = (contentHeight + 190) + 'px'
        }
      } else {
        GoodDetailRef.current.style.height = '745px'
      }
    }
  }, [descriptionExpanded])

  const [currentImgId, setCurrentImgId] = useState(imgs[0].id)

  // 点击左侧图片列表切换图片
  const handleImgClick = (value) => {
    setCurrentImgId(value)
  }

  // 当 currentImgId 变化时，自动滚动左侧列表
  const imageColumnRef = useRef(null)
  useEffect(() => {
    const activeImg = imageColumnRef.current?.querySelector('.image-column-item.active')
    if (activeImg) {
      activeImg.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [currentImgId])

  // 点击切换下一张图片
  const handleNextBtn = () => {
    const currentIndex = imgs.findIndex(item => item.id === currentImgId)
    if (currentIndex === imgs.length - 1) {
      setCurrentImgId(imgs[0].id)
    } else {
      setCurrentImgId(imgs[currentIndex + 1].id)
    }

  }

  // 登录按钮点击
  const handleLoginBtn = () => {
    console.log('跳转登录');
  }

  // 跳转amazon按钮点击
  const handleSkipBtn = () => {
    console.log('跳转amazon');
  }

  useEffect(() => {
    // 检测文本是否溢出
    if (descriptionRef.current) {
      const element = descriptionRef.current
      // 获取元素的实际高度和滚动高度
      const isOverflow = element.scrollHeight > 50
      setIsTextOverflow(isOverflow)
    }
  }, [])

  // 详情信息展开与收起
  const handleReadMore = () => {
    setDescriptionExpanded(!descriptionExpanded)
  }

  return (
    <div className='goods-detail' ref={GoodDetailRef}>
      {/* 图片列表 */}
      <div className='image-column' ref={imageColumnRef}>
        {
          imgs.map(item => (
            <Image
              alt="basic"
              width={70}
              height={80}
              margin-bottom={16}
              preview={false}
              key={item.id}
              className={`image-column-item ${currentImgId === item.id && 'active'}`}
              src={item.url}
              onClick={() => handleImgClick(item.id)}
            />
          ))
        }


      </div>

      {/* 商品大图 */}
      <div className='image-main'>
        <Image.PreviewGroup
          preview={{
            onChange: current => {
              setCurrentImgId(imgs[current].id)
            },
          }}
        >
          {imgs.map(item => (
            <Image
              width={300}
              height={408}
              key={item.id}
              src={item.url}
              style={{ display: item.id === currentImgId ? 'block' : 'none' }}
              className={`main-img ${item.id === currentImgId ? 'show' : ''}`}
            />
          ))}
        </Image.PreviewGroup>

        {/* 添加图片索引提示 */}
        <div className="image-index-badge">
          {imgs.findIndex(item => item.id === currentImgId) + 1}/{imgs.length}
        </div>
      </div>

      {/* 点击跳转下一张图片 */}
      {imgs.length > 1 ? <RightOutlined className="next-img-btn" onClick={handleNextBtn} /> : <div className="no-next-img-btn" />}


      {/* 详细信息 */}
      <Card className='detail-data'>
        {/* 标题 */}
        <Meta
          name='title'
          className='title'
          description={data.title} />

        {/* 销售商 */}
        {data.seller && (
          <Meta
            name='seller'
            className='seller'
            description={
              <>
                <span>Seller: </span>
                <span className='seller-name'>{data.seller}</span>
              </>
            }
          />
        )}

        {/* 评分 */}
        <Meta
          name='grade'
          className='grade'
          description={
            <Rate allowHalf disabled defaultValue={data.grade} size='small' />
          }
        />

        {/* 原价 */}
        <Meta
          name='old-price'
          className='old-price'
          description={data.oldPrice.toFixed(2)}
        />

        {/* 现价 */}
        <Meta
          name='new-price'
          className='new-price'
          description={<>${data.newPrice.toFixed(2)}<span>after cash back</span></>}
        />

        {/* 登录提示 */}
        {/* TODO : 登录提示，如果登陆了就隐藏，没登陆就显示 */}
        {true && <div className='tip'>Sign in to snag this deal.</div>}

        {/* 标签 */}
        <Meta
          name='label'
          className='label'
          description={
            <>
              {data.tags.stock > 0 && <span className='stock'>
                <i className='iconfont icon-a-1tongyongtubiaotushuguanfuwutushu' style={{ fontSize: '25px' }}></i>
                {data.tags.stock}+ in stock
              </span>}
              {data.tags.day > 0 && <span className='day'>
                <i className='iconfont icon-shizhong' style={{ fontSize: '25px' }}></i>
                {data.tags.day} day left
              </span>}
              {data.cashBack && <span className='cash-back'>{100}% cash back</span>}
            </>
          }
        />

        {/* 登录和跳转 */}
        <div className='button-group'>
          <Button onClick={handleLoginBtn} className='login-btn'>Log in</Button>
          <Button onClick={handleSkipBtn} className='skip'></Button>
        </div>

        {/* Shout it */}
        <Meta
          name='shout-it'
          className='shout-it'
          description={<>
            <span>Shout it:</span>
            <FacebookOutlined style={{ fontSize: '24px', 'marginLeft': '16px' }} />
            <GithubOutlined style={{ fontSize: '24px', 'marginLeft': '16px' }} />
            <GoogleOutlined style={{ fontSize: '24px', 'marginLeft': '16px' }} />
          </>}
        />

        {/* 详细介绍 */}
        <Meta
          name='description'
          className={`description ${descriptionExpanded ? 'expanded' : ''}`}
          description={<>
            <span className='text' ref={descriptionRef}>{data.description}</span>
            {isTextOverflow && <span className='more' onClick={handleReadMore}>{descriptionExpanded ? 'Read less' : 'Read more'}</span>}
          </>}
        />
      </Card>
    </div>
  );
}

export default GoodDetail;