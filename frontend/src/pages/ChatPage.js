import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ChatPage = () => {
	const [chats, setChats] = useState([]);

	const fetchChats = async () => {
		const { data } = await axios.get('http://localhost:8080/api/chats/')
		setChats(data);
	}

	useEffect(() => {
		fetchChats()
	}, [])

	return (
		<div>
			<h1>Welcome to ChatPage</h1>
			<div>
				{chats.map(chat => <div key={chat._id}> {chat.chatName} </div>)}
			</div>
		</div>
	)
}

export default ChatPage