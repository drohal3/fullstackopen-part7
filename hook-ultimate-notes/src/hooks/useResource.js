import {useState, useEffect} from "react";
import axios from 'axios'

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  let token = null

  const setToken = newToken => {
    token = `bearer ${newToken}`
  }

  const config = {
    headers: { Authorization: token },
  }

  // ...
  const fetchAll = async () => {
    try {
      const response = await axios
        .get(baseUrl, config)
      setResources(response.data)
    } catch (e) {

    }
  }

  useEffect( () => {
    fetchAll()
  },[])

  const create = async (resource) => {
    let ret = null
    try {
      const response = await axios.post(baseUrl, resource, config)
      setResources([...resources, response.data])
      ret = response.data
    } catch (e) {
      console.log(e)
    }

    return ret
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

export default useResource