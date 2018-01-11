import axios from 'axios';
import { BACKEND_BASE_URL } from '../config/constants';

export module exampleDataService {

    export function getColors() {
        const url = `${BACKEND_BASE_URL}/colors`;
        return axios.get(url).then(response => response.data);
    }

    export function getBadPassword(token: string) {
        const url = `${BACKEND_BASE_URL}/badPassword`;
        return axios.get(url, {
            headers: {
                'X-Auth-Token': token
            }
        }).then(response => response.data);
    }
}