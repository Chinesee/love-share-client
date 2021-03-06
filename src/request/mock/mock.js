import Mock from 'mockjs'
import user from './user'
import notice from './notice'
import chat from './chat'
import cart from './cart'
import goods from './goods'
import order from './order'
import begging from './begging'
import service from './service'
import common from './common'

// 用户
Mock.mock('/api/user/sign_in', 'post', user.sign_in)
Mock.mock('/api/user/sign_up', 'post', user.sign_up)
Mock.mock('/api/user/info', 'get', user.info)
Mock.mock('/api/user/info_num', 'get', user.info_num)
Mock.mock('/api/user/detail', 'get', user.detail)
Mock.mock('/api/user/modify', 'put', user.modify)
Mock.mock('/api/user/reset_password', 'put', user.reset_password)
Mock.mock('/api/user/recent_contacts', 'get', user.recent_contacts)
Mock.mock('/api/user/address_list', 'get', user.address_list)
Mock.mock('/api/user/address/default', 'put', user.default_address)
Mock.mock('/api/user/address/add', 'post', user.add_address)
Mock.mock('/api/user/address/delete', 'delete', user.delete_address)
Mock.mock('/api/user/address/update', 'put', user.update_address)
Mock.mock('/api/user/subscribe', 'post', user.subscribe)
Mock.mock('/api/user/unsubscribe', 'post', user.unsubscribe)
Mock.mock('/api/user/published_goods', 'get', user.published_goods)
Mock.mock('/api/user/purchased_goods', 'get', user.purchased_goods)

Mock.mock('/api/chat/contact/list', 'get', chat.contact_list)
Mock.mock('/api/chat/chat_data', 'get', chat.chat_data)

Mock.mock('/api/cart/list', 'get', cart.cart_list)
Mock.mock('/api/cart/add', 'post', cart.add_cart_item)
Mock.mock('/api/cart/delete', 'delete', cart.remove_cart_item)

// 通知
Mock.mock('/api/notice/list', 'get', notice.notice_list)

// 商品
Mock.mock('/api/goods/create', 'post', goods.create_goods)
Mock.mock(RegExp('/api/goods/list/recommend.*'), 'get', goods.stored_goods)
Mock.mock('/api/goods/stored', 'get', goods.stored_goods)
Mock.mock('/api/goods/dismounted', 'get', goods.dismounted_goods)
Mock.mock('/api/goods/list_info', 'get', goods.list_info)
Mock.mock('/api/goods/detail', 'get', goods.goods_detail)
Mock.mock('/api/goods/delete', 'delete', goods.delete)
Mock.mock('/api/goods/collect', 'post', goods.collect)
Mock.mock('/api/goods/uncollect', 'delete', goods.uncollect)
Mock.mock('/api/goods/dismount', 'post', goods.dismount)
Mock.mock('/api/goods/cancel_dismount', 'post', goods.cancel_dismount)

// 订单
Mock.mock('/api/order/detail', 'get', order.detail)
Mock.mock('/api/order/order_transaction_amount', 'get', order.order_transaction_amount)
Mock.mock('/api/order/order_volume', 'get', order.order_volume)
Mock.mock('/api/order/order_num', 'get', order.order_num)

// 求购
Mock.mock('/api/begging/list', 'get', begging.buying_list)
Mock.mock('/api/begging/add', 'post', begging.add_buying)
Mock.mock('/api/begging/delete', 'delete', begging.delete_buying)
Mock.mock('/api/begging/update', 'put', begging.update_buying)

// 分类
Mock.mock('/api/category/list', 'get', common.category_list)

// 学校
Mock.mock('/api/school/list', 'get', common.school_list)

// 通用
Mock.mock('/api/common/check_phone_number', 'post', common.check_phone_number)
Mock.mock('/api/common/verification_code', 'post', common.verification_code)

Mock.mock(/\/article/, 'get', service.article)

Mock.setup({ timeout: '500-600' })
