import PropTypes from "prop-types";

const ingredientsPropTypes = PropTypes.shape({
   calories: PropTypes.number.isRequired,
   carbohydrates: PropTypes.number.isRequired,
   fat: PropTypes.number.isRequired,
   image: PropTypes.string.isRequired,
   image_large: PropTypes.string.isRequired,
   image_mobile: PropTypes.string.isRequired,
   name: PropTypes.string.isRequired,
   price: PropTypes.number.isRequired,
   proteins: PropTypes.number.isRequired,
   type: PropTypes.string.isRequired,
   _id: PropTypes.string.isRequired,
})
export default ingredientsPropTypes;

export interface IIngredient {
   calories: number,
   carbohydrates: number,
   fat: number,
   image: string,
   image_large: string,
   image_mobile: string,
   name: string,
   price: number,
   proteins: number,
   type: string,
   uuid: string,
   __v: string,
   _id: string,
}

export interface IUserData {
   accessToken: string
   refreshToken: string
   success: boolean
   user: object | null
}


