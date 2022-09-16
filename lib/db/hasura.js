export async function isNewUser(token, issuer) {
	const operationsDoc = `
		query isNewUser($issuer: String!) {
			users(where: {issuer: {_eq: $issuer}}) {
				id
				issuer
				email
			}
		}
	`;

	const response = await queryHasuraGraphQL(operationsDoc, 'isNewUser',
		{
			issuer,
		}, token);
		
	console.log({response, issuer})
	
	return response?.users?.length === 0 
}

async function queryHasuraGraphQL(operationsDoc, operationName, variables, token) {
	const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-type': 'application/json'
		},
		body: JSON.stringify({
			query: operationsDoc,
			variables: variables,
			operationName: operationName
		})
	});

	return await result.json();
}


