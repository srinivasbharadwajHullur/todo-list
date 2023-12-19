import axios from 'axios';
import { useEffect, useState } from 'react'

const useFetchTodoList = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")
    const fetchTodos = async () => {
        setLoading(true)
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
            setTodos(response.data);
            setLoading(false)
        } catch (error) {
            setError("Cant able to fetch the data"+error);
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchTodos()
    },[])
  return {todos,loading,error}
}

export default useFetchTodoList