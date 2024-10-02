export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const apiEndPoint = '/api'

export const apiRoutes = {
	contracts: {
		baseRoute: '/smart-contracts',
		create: '/smart-contracts/create',
        update: '/smart-contracts',//+/[id]
		getAll: '/smart-contracts/get-all',//+/[wallet]
	},
	imageApi: {
		baseRoute: "/api/upload",
	},
	nftItemApi: {
		baseRoute: "/api/uri",
	}
}

export const apiPublicRoutes = {
	contracts: {
		baseRoute: '/tokensale-investment/',
	}
}