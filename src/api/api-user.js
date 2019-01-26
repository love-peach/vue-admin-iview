import request from '@/libs/request';

/**
 * @desc 登录
 */
export const login = (params, options) => request.post('/logoin', params, options);
