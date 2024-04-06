import { useForm } from 'react-hook-form'
import { Button, Form, Spinner } from 'react-bootstrap'
import { ProductFormValue } from '@/types/Product'
import { createProduct } from '@/services/product'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const ProductAddForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ProductFormValue>()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (formValue: ProductFormValue) => {
    setIsLoading(true)
    try {
      await createProduct(formValue)
      navigate('/admin/products')
    } catch (error) {
      console.error('Error creating product:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='m-5'>
      <h2>Product Add</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            as={'input'}
            {...register('title', {
              required: 'Please ',
              minLength: {
                value: 5,
                message: 'Số lượng kí tự phải lớn hơn 5'
              },
              maxLength: {
                value: 20,
                message: 'Số lượng kí tự nhỏ hơn 20'
              }
            })}
            isInvalid={!!errors?.title}
          />
          <Form.Control.Feedback type='invalid'>{errors?.title?.message}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
          <Form.Label>Image</Form.Label>
          <Form.Control
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
            as='input'
            {...register('brand', {
              required: 'Phai nhap brand'
            })}
            isInvalid={Boolean(errors?.brand)}
          />
          <Form.Control.Feedback type='invalid'>{errors?.brand?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type='number'
            as='input'
            {...register('price', {
              required: 'Phai nhap price',
              min: {
                value: 0,
                message: 'Gia phai lon hon 0'
              }
            })}
            isInvalid={!!errors.price}
          />
          <Form.Control.Feedback type='invalid'>{errors?.price?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            {...register('description', {
              required: 'Phai nhap description',
              minLength: {
                value: 20,
                message: 'Toi thieu 20 ki tu'
              }
            })}
            isInvalid={Boolean(errors?.description)}
          />
          <Form.Control.Feedback type='invalid'>{errors?.description?.message}</Form.Control.Feedback>
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
    </div>
  )
}

export default ProductAddForm
