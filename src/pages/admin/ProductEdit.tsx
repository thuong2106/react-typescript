import { updateProduct, getProduct } from '@/services/product'
import { Product, ProductFormValue } from '@/types/Product'
import React, { useEffect, useState } from 'react'
import { Button, Form, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

const ProductEdit: React.FC = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProduct(id as string)
        setProduct(fetchedProduct)
      } catch (error) {
        console.error('Error fetching product:', error)
      }
    }

    fetchProduct()
  }, [id])

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ProductFormValue>()

  const onSubmit = async (formData: ProductFormValue) => {
    setIsLoading(true)
    try {
      await updateProduct(id as string, formData)
      navigate('/admin/products')
    } catch (error) {
      console.error('Error updating product:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='m-5'>
      <h2>Product Edit</h2>
      {product && (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              defaultValue={product.title}
              {...register('title', {
                required: 'Please type your name',
                minLength: {
                  value: 5,
                  message: 'Số lượng kí tự phải lớn hơn 5'
                },
                maxLength: {
                  value: 20,
                  message: 'Số lượng kí tự nhỏ hơn 20'
                }
              })}
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type='invalid'>{errors.title?.message}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
            <Form.Label>Image</Form.Label>
            <Form.Control
              defaultValue={product.thumbnail}
              type='input'
              {...register('thumbnail', {
                required: 'Please upload an image'
              })}
              isInvalid={!!errors?.thumbnail}
            />
            <Form.Control.Feedback type='invalid'>{errors?.thumbnail?.message}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
            <Form.Label>Brand</Form.Label>
            <Form.Control
              defaultValue={product.brand}
              {...register('brand', {
                required: 'Phai nhap brand'
              })}
              isInvalid={!!errors.brand}
            />
            <Form.Control.Feedback type='invalid'>{errors.brand?.message}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
            <Form.Label>Price</Form.Label>
            <Form.Control
              defaultValue={product.price.toString()}
              type='number'
              {...register('price', {
                required: 'Phai nhap price',
                min: {
                  value: 0,
                  message: 'Gia phai lon hon 0'
                }
              })}
              isInvalid={!!errors.price}
            />
            <Form.Control.Feedback type='invalid'>{errors.price?.message}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              defaultValue={product.description}
              as='textarea'
              rows={3}
              {...register('description', {
                required: 'Phai nhap description',
                minLength: {
                  value: 20,
                  message: 'Toi thieu 20 ki tu'
                }
              })}
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type='invalid'>{errors.description?.message}</Form.Control.Feedback>
          </Form.Group>

          <Button type='submit' variant='primary' disabled={isLoading}>
            {isLoading ? (
              <Spinner animation='border' size='sm' role='status' aria-hidden='true'>
                <span className='visually-hidden'>Loading...</span>
              </Spinner>
            ) : (
              'Save'
            )}
          </Button>
        </Form>
      )}
    </div>
  )
}

export default ProductEdit
