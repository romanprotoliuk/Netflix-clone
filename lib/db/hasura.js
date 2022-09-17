export async function updateStats(token, {favorited, userId, watched, videoId}) {
	const operationsDoc = `
		mutation updateStats($favorited: Int!, $userId: String!, $watched: Boolean!, $videoId: String!) {
			update_stats(
				_set: {
					watched: $watched, 
					favorited: $favorited}
				where: {
					userId: {_eq: $userId}, 
					videoId: {_eq: $videoId}
				}) {
					returning {
						favorited,
						userId,
						watched,
						videoId
					}
			}
		}
	`;

	return await queryHasuraGraphQL(operationsDoc, 'updateStats',
		{
			favorited, userId, watched, videoId
		}, token);
}

export async function insertStats(token, {favorited, userId, watched, videoId}) {
	const operationsDoc = `
		mutation insertStats($favorited: Int!, $userId: String!, $watched: Boolean!, $videoId: String!) {
			insert_stats_one(object: {
				favorited: $favorited, 
				userId: $userId, 
				watched: $watched, 
				videoId: $videoId
			}) {
					userId
					favorited
			}
		}
	`;

	return await queryHasuraGraphQL(operationsDoc, 'insertStats',
		{
			favorited, userId, watched, videoId
		}, token);
}

export async function findVideoIdByUser(token, userId, videoId) {
  const operationsDoc = `
  query findVideoIdByUserId($userId: String!, $videoId: String!) {
    stats(where: { userId: {_eq: $userId}, videoId: {_eq: $videoId }}) {
      id
      userId
      videoId
      favorited
      watched
    }
  }
`;

  const response = await queryHasuraGraphQL(
    operationsDoc,
    "findVideoIdByUserId",
    {
      videoId,
      userId,
    },
    token
  );

  return response?.data?.stats?.length > 0 ;
}

export async function createNewUser(token, metadata) {
	const operationsDoc = `
		mutation createNewUser($issuer: String!, $email: String!, $publicAddress: String!) {
			insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
				returning {
					email
					id
					issuer
				}
			}
		}
	`;

	const { issuer, email, publicAddress } = metadata
	const response = await queryHasuraGraphQL(operationsDoc, 'createNewUser',
		{
			issuer,
			email, 
			publicAddress
		}, token);
	
	return response;
}

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
	
	return response?.data?.users?.length === 0 
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


