import Product from '../../ui/Product';
import SkeletonLoading from '../../ui/SkeletonLoading';
import { useProducts } from './useProducts';
import { PAGINATE } from '../../utils/helper';
import { useCustomParams } from '../../hooks/useCustomParams';

const Products = () => {
     const { isLoading, products } = useProducts();
     const page = useCustomParams('page') * 1 || 1;

     if (isLoading) return <SkeletonLoading length={12} />;

     // let filtered;
     // PAGINATION
     // calc starting and ending product
     const start = (page - 1) * PAGINATE;
     const end = PAGINATE * page;

     const filtered = products.slice(start, end);

     return (
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 grid-rows-2 gap-x-6 gap-y-10 py-2'>
               {filtered.map((product) => (
                    <Product key={product._id} w='' product={product} />
               ))}
          </div>
     );
};

export default Products;
