import { isFriday, isSunday } from 'date-fns';
import { API_URL } from '../../utils/helper';
import { useWishlists } from './useWishlist';
import { useAddToCart } from '../cart/useAddToCart';
import { useRemoveFromWishlist } from './useRemoveFromWishlist';

import ActionButton from '../../ui/ActionButton';
import Spinner from '../../ui/Spinner';

const WishList = ({ id }) => {
     const { status, wishlist } = useWishlists(id);
     const { status: addStatus, addToCart } = useAddToCart();
     const { status: removeStatus, removeFromWishlist } =
          useRemoveFromWishlist();

     if (status === 'pending') return null;

     const fridayCheck = isFriday(new Date());
     const tuesdayCheck = isSunday(new Date());

     const handleAddWishlist = function () {
          if (wishlist) {
               addToCart({
                    id: wishlist.id,
                    quantity: 1,
               });
          }
     };

     const handleRemoveWishlist = function () {
          if (wishlist) {
               removeFromWishlist(wishlist.id);
          }
     };

     return (
          <li className='border-[1px] border-gray-400 rounded-md flex p-4 justify-between '>
               <div className='flex space-x-3'>
                    <img
                         src={`${API_URL}/products/${wishlist.imageUrl}`}
                         alt=''
                         className='w-28 h-28 object-cover '
                    />

                    <div className='flex flex-col justify-between'>
                         <h1>{wishlist.title}</h1>

                         <div className='flex flex-col space-y-1'>
                              <div className='flex items-center py-2 text-gray-400 space-x-3'>
                                   <span
                                        className={`font-medium text-[24px] text-gray-800 ${
                                             tuesdayCheck || fridayCheck
                                                  ? ''
                                                  : 'hidden'
                                        }`}
                                   >
                                        ₦
                                        {wishlist.discountPrice.toLocaleString()}
                                   </span>

                                   <span
                                        className={`${
                                             tuesdayCheck || fridayCheck
                                                  ? 'font-medium text-[14px] text-orange-800 line-through'
                                                  : 'text-[24px] no-underline text-gray-900'
                                        }`}
                                   >
                                        ₦{wishlist.price.toLocaleString()}
                                   </span>

                                   <span
                                        className={`bg-orange-100 text-orange-500 py-0.5 px-0.5 rounded-sm  text-[15px] ${
                                             tuesdayCheck || fridayCheck
                                                  ? 'font-medium'
                                                  : 'hidden'
                                        }`}
                                   >
                                        - {wishlist.discountPercentage}%
                                   </span>
                              </div>

                              <p className='text-[14px] text-orange-300'>
                                   {wishlist.stockQuantity <= 5
                                        ? 'Few units left'
                                        : wishlist.stockQuantity <= 15
                                        ? `${wishlist.stockQuantity} items left`
                                        : 'In stock'}
                              </p>
                         </div>
                    </div>
               </div>

               <div className='flex flex-col justify-between'>
                    <ActionButton onClick={handleAddWishlist}>
                         {addStatus === 'pending' ? (
                              <Spinner w='16px' h='16px' />
                         ) : (
                              'Buy Now'
                         )}
                    </ActionButton>
                    <ActionButton onClick={handleRemoveWishlist}>
                         {removeStatus === 'pending' ? (
                              <Spinner w='16px' h='16px' />
                         ) : (
                              'remove'
                         )}
                    </ActionButton>
               </div>
          </li>
     );
};

export default WishList;
