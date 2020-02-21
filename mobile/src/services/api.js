import { create } from 'apisauce';

const api = create({ 
    baseURL: 'http://26.107.38.123:3000',
});

if(api.ok) 
    console.log ('Ok!');

api.addResponseTransform(response => {
    if(!response.ok) throw response;
});

export default api;
