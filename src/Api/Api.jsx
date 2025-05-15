export const BASE_URL = 'https://ecommerce.routemisr.com/api/v1'

export const API ={
// Auth
    login:`${BASE_URL}/auth/signin`,
    register:`${BASE_URL}/auth/signup`,
    verifyResetCode:`${BASE_URL}/auth/verifyResetCode`,
    forgetpass:`${BASE_URL}/auth/forgotPasswords`,
    verifyCode:`${BASE_URL}/auth/verifyResetCode`,
    resetpassword:`${BASE_URL}/auth/resetPassword`,
// products
    getAllproducts:`${BASE_URL}/products`,

    // brand
    getAllBrands:`${BASE_URL}/brands`,

    // categories
    categories:`${BASE_URL}/categories`,

    // cart
    Cart:`${BASE_URL}/cart`,
    // wishlist
    wishlist:`${BASE_URL}/wishlist`,
    // orders
    getUserOrders:`${BASE_URL}/orders/user`,
    // payment
    onlinePayMent:`${BASE_URL}/orders/checkout-session`,
    cashPayMent:`${BASE_URL}/orders`,

    // subcategory
    getAllSubcategory:`${BASE_URL}/subcategories`,
    spacialSubcategoryToCat:`${BASE_URL}/categories/{id}/subcategories`
    

} 