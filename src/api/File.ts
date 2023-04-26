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

import { Array, FileSrcListVo, FileSrcVo, LinkedMap, Message } from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class File<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
	/**
	 * No description
	 *
	 * @tags 55-文件模块
	 * @name UpdateImage
	 * @summary 3-上传图片
	 * @request POST:/file/updateImage
	 */
	updateImage = (
		data: {
			/** @format binary */
			'wangeditor-uploaded-image': File
		},
		params: RequestParams = {}
	) =>
		this.request<LinkedMap, any>({
			path: `/file/updateImage`,
			method: 'POST',
			body: data,
			type: ContentType.FormData,
			...params
		})
	/**
	 * No description
	 *
	 * @tags 55-文件模块
	 * @name UpdateFiles
	 * @summary 6-批量上传文件(最大支持10个文件 只支持附件)
	 * @request POST:/file/updateFiles
	 */
	updateFiles = (
		data: {
			/** 文件批量 */
			files: File[]
		},
		params: RequestParams = {}
	) =>
		this.request<FileSrcListVo, any>({
			path: `/file/updateFiles`,
			method: 'POST',
			body: data,
			type: ContentType.Json,
			...params
		})
	/**
	 * No description
	 *
	 * @tags 55-文件模块
	 * @name UpdateFile
	 * @summary 1-上传文件
	 * @request POST:/file/updateFile/{type}
	 */
	updateFile = (
		type: number,
		query: {
			/** 课件标识 */
			keyword: string
		},
		data: {
			/** @format binary */
			file?: File
		},
		params: RequestParams = {}
	) =>
		this.request<FileSrcVo, any>({
			path: `/file/updateFile/${type}`,
			method: 'POST',
			query: query,
			body: data,
			type: ContentType.FormData,
			...params
		})
	/**
	 * No description
	 *
	 * @tags 55-文件模块
	 * @name SaveImage
	 * @summary 7-保存临时图片
	 * @request POST:/file/saveImage
	 */
	saveImage = (data: Array, params: RequestParams = {}) =>
		this.request<Message, any>({
			path: `/file/saveImage`,
			method: 'POST',
			body: data,
			type: ContentType.Json,
			...params
		})
	/**
	 * No description
	 *
	 * @tags 55-文件模块
	 * @name FileChunkDownload
	 * @summary 2-下载文件
	 * @request GET:/file/download/{type}/{user}/{id}
	 */
	fileChunkDownload = (type: string, user: string, id: string, params: RequestParams = {}) =>
		this.request<void, any>({
			path: `/file/download/${type}/${user}/${id}`,
			method: 'GET',
			...params
		})
	/**
	 * No description
	 *
	 * @tags 55-文件模块
	 * @name DeleteFile
	 * @summary 5-删除文件
	 * @request DELETE:/file/delete
	 */
	deleteFile = (data: Array, params: RequestParams = {}) =>
		this.request<Message, any>({
			path: `/file/delete`,
			method: 'DELETE',
			body: data,
			type: ContentType.Json,
			...params
		})
	/**
	 * No description
	 *
	 * @tags 55-文件模块
	 * @name DeleteFileUrl
	 * @summary 4-删除文件URL
	 * @request DELETE:/file/deleteUrl
	 */
	deleteFileUrl = (data: string[], params: RequestParams = {}) =>
		this.request<Message, any>({
			path: `/file/deleteUrl`,
			method: 'DELETE',
			body: data,
			type: ContentType.Json,
			...params
		})
}
