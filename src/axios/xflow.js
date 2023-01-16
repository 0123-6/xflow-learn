import http,{get,post} from './index'

/**
 * 获取首页列表
 */
export function getArticleList(){
	return  http("get",'/article/home/index');
}

/**
 * 运行组件
 */
export function runComponent(data) {
	return post('/cors/kfp/component/run',data);
}

/**
 * 查询组件状态
 */
export function queryComponentStatus(data) {
	return get('/cors/kfp/run/status',data)
}


