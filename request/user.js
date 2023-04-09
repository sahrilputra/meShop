import axios from "axios";

export const saveCart = async(cart, user_id) => {
    try{
        const {data } = await axios.post('/api/user/saveCart', {
            cart,
            user_id
        });
        return data
    }catch(error){
        return Response.data.error.message;
    }
}