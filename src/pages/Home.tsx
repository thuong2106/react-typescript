import Footer from '@/layouts/Footer'
import Header from '@/layouts/Header'
import { FC } from 'react'
import { useQuery } from '@tanstack/react-query'
import { CiHeart, CiSearch } from 'react-icons/ci'
import { LiaRandomSolid } from 'react-icons/lia'
import { getProducts } from '@/services/product'
import { Link } from 'react-router-dom'
import { CiStar } from 'react-icons/ci'
import { FaCartPlus } from 'react-icons/fa'

type Props = object
const Home: FC<Props> = () => {
  const result = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  })

  const products = result.data || []

  return (
    <>
      <Header />
      <div className='row m-3'>
        {products.map((product) => (
          <div key={product.id} className='col-md-3 col-sm-6'>
            <Link to={'/products/' + product.id} className='product-grid'>
              <div className='product-image'>
                <a href='#' className='image'>
                  <img className='pic-1' src={product.thumbnail} />
                </a>
                <ul className='product-links'>
                  <li>
                    <a href='#'>
                      <CiSearch />
                    </a>
                  </li>
                  <li>
                    <a href='#' data-tip='Wishlist'>
                      <CiHeart />
                    </a>
                  </li>
                  <li>
                    <a href='#' data-tip='Compare'>
                      <LiaRandomSolid />
                    </a>
                  </li>
                </ul>
              </div>
              <div className='product-content'>
                <h3 className='title text-decoration-none'>
                  <a href='#' className='text-decoration-none'>
                    {product.title}
                  </a>
                </h3>
                <a className='price text-decoration-none'>{product.price}</a>
                <ul className='rating text-warning fs-5'>
                  <CiStar />
                  <CiStar />
                  <CiStar />
                  <CiStar />
                  <CiStar />
                </ul>
                <a href='' className='add-to-cart text-decoration-none'>
                  <FaCartPlus /> Add to Cart
                </a>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <Footer />
    </>
  )
}

export default Home
