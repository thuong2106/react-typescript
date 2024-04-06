import Footer from '@/layouts/Footer'
import Header from '@/layouts/Header'
import { getProduct } from '@/services/product'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { useParams } from 'react-router-dom'

const ProductDetail: FC = () => {
  const { id } = useParams()

  const result = useQuery({
    queryKey: ['product'],
    queryFn: () => (id ? getProduct(id) : undefined)
  })

  const product = result.data

  return (
    <div>
      <Header />
      <div className='container'>
        {product && (
          <div className='card'>
            <div className='container-fliud'>
              <div className='wrapper row'>
                <div className='preview col-md-6'>
                  <div className='preview-pic tab-content'>
                    <div className='tab-pane active h-62 w-62' id='pic-1'>
                      <img src={product.thumbnail} />
                    </div>
                  </div>
                </div>
                <div className='details col-md-6'>
                  <h3 className='product-title'>{product.title}</h3>
                  <div className='rating'>
                    <div className='stars'>
                      <span className='fa fa-star checked'></span>
                      <span className='fa fa-star checked'></span>
                      <span className='fa fa-star checked'></span>
                      <span className='fa fa-star'></span>
                      <span className='fa fa-star'></span>
                    </div>
                    <span className='review-no'>41 reviews</span>
                  </div>
                  <p className='product-description'>{product.description}</p>
                  <h4 className='price'>
                    current price: <span>{product.price}</span>
                  </h4>
                  <p className='vote'>
                    <strong>91%</strong> of buyers enjoyed this product! <strong>(87 votes)</strong>
                  </p>
                  <h5 className='sizes'>
                    sizes:
                    <span className='size' data-toggle='tooltip' title='small'>
                      s
                    </span>
                    <span className='size' data-toggle='tooltip' title='medium'>
                      m
                    </span>
                    <span className='size' data-toggle='tooltip' title='large'>
                      l
                    </span>
                    <span className='size' data-toggle='tooltip' title='xtra large'>
                      xl
                    </span>
                  </h5>
                  <h5 className='colors'>
                    colors:
                    <span className='color orange not-available' data-toggle='tooltip' title='Not In store'></span>
                    <span className='color green'></span>
                    <span className='color blue'></span>
                  </h5>
                  <div className='action'>
                    <button className='add-to-cart btn btn-default' type='button'>
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default ProductDetail
