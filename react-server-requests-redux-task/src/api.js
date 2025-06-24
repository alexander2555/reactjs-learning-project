const JSON_SERVER_URL = 'http://localhost:3003/todos'
const ANTIBLOCK_TIMEOUT = 42 // Задержка против блокировки db.json

export const fetchItems = fetch(JSON_SERVER_URL).then(data => data.json())

/** CREATE */
export const postItem = async todoTitle => {
  try {
    const response = await fetch(JSON_SERVER_URL, {
      method: 'POST',
      headers: { 'Content-type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        title: todoTitle,
      }),
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    return await new Promise(resolve =>
      setTimeout(async () => resolve(await response.json()), ANTIBLOCK_TIMEOUT),
    )
  } catch (err) {
    console.warn(err.message)
  }
}

/** UPDATE */
export const putItem = (todoId, todoTitle) =>
  fetch(JSON_SERVER_URL + '/' + todoId, {
    method: 'PUT',
    headers: { 'Content-type': 'application/json;charset=utf-8' },
    body: JSON.stringify({
      id: todoId,
      title: todoTitle,
    }),
  }).then(rawResp => rawResp.json())

/** DELETE */
export const delItem = async todoId => {
  try {
    const response = await fetch(JSON_SERVER_URL + '/' + todoId, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    return await new Promise(resolve =>
      setTimeout(() => resolve(todoId), ANTIBLOCK_TIMEOUT),
    )
  } catch (err) {
    console.warn(err.message)
  }
}
