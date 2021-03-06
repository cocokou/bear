import { post, postt } from 'utils/request';
import config from 'config/app.config';

const url = config.ajax;

//获取产品列表
export function getProductList(){
  return post(url, 'get_product_list', { companyId: config.default_company_id });
}

export function getInstanceLocationList(params){
  return post(url, 'get_product_usage_stat_by_xy', params);
}

export function getProductIngredients(){
  return post(url, 'get_product_ingredients', { pid: config.default_pid_id})
}

export function handleProductEvent(params){
  return post(url, 'handle_product_event', params);
}

export function getDeviceList(){
  return post('http://119.23.132.97:8001/api', 'app_dm_get_device_on_line', { page_id: '1', page_size: '1' });
}

export function getOrgList(){
  return post('http://119.23.132.97:8001/api', 'admin_get_sub_org', {});
}

export function getContainer(){
  return post("http://119.23.132.97:80/api", 'dm_get_container', {"org_id":'1002' });
}

