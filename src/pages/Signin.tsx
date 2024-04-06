import Footer from '@/layouts/Footer'
import Header from '@/layouts/Header'
import { signIn } from '@/services/auth'
import { SignInForm } from '@/types/auth'
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Sigin = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<SignInForm>()

  const onSubmit = (formValue: SignInForm) => {
    setIsLoading(true)
    signIn(formValue).then((res) => {
      const accessToken = res.accessToken
      window.sessionStorage.setItem('access-token', accessToken)
      setIsLoading(false)
      toast('Register successfully!')
      navigate('/')
    })
  }
  return (
    <>
      {' '}
      <Header />
      <div className='m-5 d-flex justify-content-center ' style={{ height: '100vh' }}>
        <div className='w-50'>
          <Form onSubmit={handleSubmit(onSubmit)} className='form-horizontal'>
            <span className='heading'>Register</span>
            <Form.Group className='form-group'>
              <Form.Label>Email or Username</Form.Label>
              <Form.Control
                type='email'
                as={'input'}
                {...register('email', {
                  required: 'Please type your email!',
                  pattern: {
                    value: new RegExp(/^\S+@\S+$/i),
                    message: 'Email not valid'
                  }
                })}
                isInvalid={!!errors?.email}
              />
              <i className='fa fa-user'></i>
              <Form.Control.Feedback type='invalid'>{errors?.email?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='form-group help'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                as={'input'}
                {...register('password', {
                  required: 'Please type your password!',
                  minLength: {
                    value: 8,
                    message: 'Min length by 8 chars'
                  }
                })}
                isInvalid={!!errors?.password}
              />
              <i className='fa fa-lock'></i>
              <a href='#' className='fa fa-question-circle'></a>
              <Form.Control.Feedback type='invalid'>{errors?.password?.message}</Form.Control.Feedback>
            </Form.Group>

            <div className='form-group'>
              <div className='main-checkbox'>
                <input type='checkbox' value='None' id='checkbox1' name='check' />
                <label htmlFor='checkbox1'></label>
              </div>
              <Link to={`/login`}>
                <Button type='submit'>Login</Button>
              </Link>
              <Button type='submit' disabled={isLoading}>
                {isLoading ? 'Signing...' : 'Register'}
              </Button>
            </div>
          </Form>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Sigin
