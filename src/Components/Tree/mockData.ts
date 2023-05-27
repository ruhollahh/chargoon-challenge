import { NodeType } from "../../types";

export function createTreeMockData(): NodeType[] {
	return [
		{
			key: '1',
			title: 'شرکت چارگون',
			users: [],
			children: [
				{
					key: '2',
					title: 'یاور کاردوست(مدیرعامل)',
					parentKey: '1',
					hierarchy: ['1', '2'],
					users: [
						{
							title: 'superadmin',
							isDefault: true
						}
					],
					accesses: [],
					children: [
						{
							key: '3',
							title: 'محسن پاکدل(مدیرفنی)',
							parentKey: '2',
							hierarchy: ['1', '2', '3'],
							users: [
								{
									title: 'admin',
									isDefault: true
								}
							],
							children: [
								{
									key: '4',
									title: 'علیرضا گلزاده(کارشناس رابط کاربری)',
									parentKey: '3',
									hierarchy: ['1', '2', '3', '4'],
									users: [
										{
											title: 'alireza',
											isDefault: true
										},
										{
											title: 'alirezatest',
											isDefault: false
										}
									],
									children: [],
									accesses: [],
								}
							],
							accesses: [],
						}
					]
				}
			],
			accesses: [],
			parentKey: null,
			hierarchy: []
		}
	]
}