import Mock from 'mockjs'

const { Random } = Mock

export default {
  goods: {
    code: 2000,
    'goods|15-30': [
      {
        'id|+1': 1,
        avatar_url: 'https://randomuser.me/api/portraits/women/0.jpg',
        name: () => Random.cword(10, 35),
        nickname: () => Random.cword(2, 7),
        real_name: () => Random.cname(),
        price: () => Random.float(0, 100, 2, 2),
        order_id: () => Random.id(),
        time: () => Random.date(),
      },
    ],
  },

  detail: {
    code: 2000,
  },

  published: {
    code: 2000,
    data: {
      goods: [
        {
          img_urls: ['https://gitee.com/chinesee/images/raw/master/img/img_002.png'],
          name: '一加 OnePlus 7 Pro 2K+90Hz 流体屏 骁龙855旗舰 4800万超广角三摄 6GB+128GB 曜岩灰 全面屏拍照游戏手机',
          price: '22.50',
          time: '1563552000',
          status: 0,
        },
        {
          img_urls: ['https://gitee.com/chinesee/images/raw/master/img/img_002.png'],
          name: 'QCY T1S 5.0真无线蓝牙耳机 Air分离式运动耳麦 运动跑步迷你隐形超小双耳入耳式 苹果/安卓手机通用 黑色',
          price: '52.50',
          time: '1568908800',
          status: 1,
        },
        {
          img_urls: ['https://gitee.com/chinesee/images/raw/master/img/img_001.png'],
          name: 'QCY T1S 5.0真无线蓝牙耳机 Air分离式运动耳麦',
          price: '52.50',
          time: '1570377600',
          status: 1,
        },
        {
          img_urls: ['https://gitee.com/chinesee/images/raw/master/img/img_001.png'],
          name: 'QCY T1S 5.0真无线蓝牙耳机 Air分离式运动耳麦 运动跑步迷你隐形超小双耳入耳式 苹果/安卓手机通用 黑色',
          price: '52.50',
          time: '1568908700',
          status: 0,
        },
      ],
    },
  },

  bought: {
    code: 2000,
    data: {
      goods: [
        {
          img_urls: ['https://gitee.com/chinesee/images/raw/master/img/img_003.png'],
          name: '一加 OnePlus 7 Pro 2K+90Hz 流体屏 骁龙855旗舰 4800万超广角三摄 6GB+128GB 曜岩灰 全面屏拍照游戏手机',
          price: '22.50',
          time: '1563552000',
          status: 0,
        },
      ],
    },
  },
}
