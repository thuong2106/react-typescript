import Footer from '@/layouts/Footer'
import Header from '@/layouts/Header'
import { login } from '@/services/auth'
import { LoginForm } from '../types/Auth'
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<LoginForm>()

  const onSubmit = (formValue: LoginForm) => {
    setIsLoading(true)
    login(formValue).then((res) => {
      const accessToken = res.accessToken
      window.sessionStorage.setItem('access-token', accessToken)
      toast('Login successfully!')
      setIsLoading(false)
      navigate('/')
    })
  }
  return (
    <>
      <Header />
      <div className='m-5 d-flex justify-content-center ' style={{ height: '100vh' }}>
        <div className='w-50'>
          <Form onSubmit={handleSubmit(onSubmit)} className='form-horizontal'>
            <span className='heading'>Log In</span>
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
              <span className='text'>Remember me</span>
              <Button type='submit' disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </div>
          </Form>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Login
