var device_list = [
  {id: 1, text: '生产线'},
  {id: 2, text: '仓库入口1'},
  {id: 3, text: '仓库出口1'},
  {id: 4, text: '沃尔玛入口1'},
]

export default {
  device_list,
  ajax: 'http://119.23.132.97/api',
  test_auth: true, //开启测试权限时为true
  default_company_id: '1005',  //获取产品列表时公司id
  default_pid_id: '109', //梅菜扣肉产品id
  // default_page_id: '1', 
  // default_page_size: '1'
}