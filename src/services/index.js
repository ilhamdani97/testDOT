import axios from 'axios'
import CONFIG from '../config'

const fullURL = (path) => {
    return `${CONFIG.API_URL}/${path}`
}

export const handleNetworkError = (error) => {
    if (error.message === 'Network request failed') {
      alert(
        'Kesalahan Jaringan',
        'Silakan periksa koneksi Anda dan coba kembali.',
        'iconNoInet'
      );
    }
    throw error;
}

const post = (api) => (data, timemout = true) => {
    return axios.post(
        fullURL(api),
        data,
        {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            }
        },
        timemout
    )
}

const get = (api) => (params, timemout = true) => {
  
    return axios(
        `${fullURL(api)}?api_key=${CONFIG.key}`,
        {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json'
            }
        },
        { handleNetworkError },
        timemout
    ).catch((err) => {
        console.log(err)
    })
}

const getWithSlug = (api) => (slug, timemout = true) => {
        return axios(
        `${fullURL(api)}?api_key=${CONFIG.key}${slug}`,
        {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json'
            }
        },
        { handleNetworkError},
        timemout
    ).catch((err) => {
    
    })
}

export const getCity = get('starter/city')
export const getCityWithId = getWithSlug('wilayah/kabupaten')
export const getProvice = get('wilayah/provinsi')
export const getProvinceWithId = getWithSlug('starter/province')
export const getResi = getWithSlug('v1/track')

const API = {
    getCity,
    getCityWithId,
    getProvice,
    getProvinceWithId,
    getResi
}

export default API;