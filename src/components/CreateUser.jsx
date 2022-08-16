import {useEffect, useState} from "react";


export const CreateUser = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    
    const addPosts = async (title, body) => {
        let response = await client.post('', {
            title: title,
            body: body,
        });
        setPosts([response.data, ...posts]);
        setTitle('');
        setBody('');
    };
}