# Amazon Project

这是一个基于 React 的电商商品展示应用，包含商品详情展示、商品卡片和抢购商品卡片三个主要组件。

## 项目结构

```
src/
├── assets/
│   └── iconfont/
│       └── iconfont.css
├── components/
│   ├── GoodCard/
│   ├── GoodDetail/
│   └── SnagGoodCard/
├── App.js
├── data.js
├── index.css
└── index.js
```

## 组件说明

### GoodDetail 组件

商品详情展示组件，显示商品的详细信息。

#### 属性 (Props)

data.js 中定义的 data 对象

#### 功能

- 显示商品多张图片，可点击切换
- 展示商品基本信息（标题、价格、评分等）
- 提供展开/收起商品描述功能
- 显示商品标签（库存、剩余天数等）
- 提供登录和跳转按钮

### GoodCard 组件

商品卡片组件，用于展示商品的基本信息。

#### 属性 (Props)

data.js 中定义的 data 对象

#### 功能

- 显示商品图片
- 展示商品标题和价格信息
- 显示商品评分
- 显示商品标签（剩余天数、库存）
- 提供收藏功能
- 点击卡片可查看详情

### SnagGoodCard 组件

抢购商品卡片组件，显示抢购订单的相关信息。

#### 属性 (Props)

data.js 中定义的 snagData 对象

#### 功能

- 显示抢购商品图片
- 展示订单状态和基本信息
- 显示抢购进度步骤
- 提供多种操作按钮（重新提交、退回商品、显示评分等）
- 显示现金返还信息

## 数据格式

### data 数据格式

```javascript
{
  imgs: [
    {
      id: number,
      url: string
    }
  ],
  title: string,
  newPrice: number,
  oldPrice: number,
  grade: number,
  discount: number,
  day: number,
  stock: number,
  seller: string,
  tags: {
    day: number,
    stock: number
  },
  description: string
}
```

### snagData 数据格式

```javascript
{
  img: {
    id: number,
    url: string
  },
  title: string,
  seller: string,
  step: number,
  status: string,
  code: string
}
```

## 依赖库

- React
- Ant Design
- classnames

## 文件说明

- `data.js`: 包含示例数据，用于组件展示
- `App.js`: 应用主组件，整合所有组件
- `index.js`: 应用入口文件
- `index.css`: 全局样式
- `assets/iconfont/iconfont.css`: 图标字体文件

## 额外说明

- iconfont 图标优先使用 antdesign 样式，如果 antdesign 样式不存在则使用阿里 iconfont 样式
