/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { AddressVo } from './data-contracts'
import { HttpClient, RequestParams } from './http-client'

export class Common<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
	/**
	 * No description
	 *
	 * @tags 70-通用模块
	 * @name GetAddress
	 * @summary 1-返回使用的地址
	 * @request GET:/common/address
	 */
	getAddress = (params: RequestParams = {}) =>
		this.request<AddressVo, any>({
			path: `/common/address`,
			method: 'GET',
			...params
		})
}
