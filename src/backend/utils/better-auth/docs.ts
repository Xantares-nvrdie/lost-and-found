import { auth } from '@/auth'

export const AuthDocs = async () => {
	const raw = await auth.api.generateOpenAPISchema()
	const oldPaths = raw.paths as Record<string, any>

	const newPaths: Record<string, any> = {}
	const prefix = '/api/auth'

	const methodOrder = ['get', 'post', 'put', 'patch', 'delete']

	for (const path in oldPaths) {
		const pathItem = oldPaths[path]
		const sortedPathItem: Record<string, any> = {}

		const keys = Object.keys(pathItem)

		keys.sort((a, b) => {
			if (!methodOrder.includes(a)) return -1
			if (!methodOrder.includes(b)) return 1

			return methodOrder.indexOf(a) - methodOrder.indexOf(b)
		})

		for (const key of keys) {
			if (typeof pathItem[key] === 'object') {
				if (path.includes('/admin')) {
					pathItem[key].tags = ['Admin']
				} else {
					pathItem[key].tags = ['Auth']
				}
			}

			sortedPathItem[key] = pathItem[key]
		}

		const newKey = `${prefix}${path}`

		newPaths[newKey] = sortedPathItem
	}

	raw.paths = newPaths

	if (raw.components && raw.components.schemas) {
		// @ts-ignore
		delete raw.components.schemas
	}

	return raw
}