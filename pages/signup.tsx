import React, { useState, useEffect, useRef } from 'react'

import { signup } from '../backend-utils/user-utils'

import { Form, Input, Button, Checkbox, Alert, Select } from 'antd'
const { Option } = Select

import classes from '@/styles/signUp.module.css'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectUser } from 'redux/userSlice'

interface IProps {
  setSignUp: (authState: boolean) => void
}

export default function SignUp() {
  // ? track mounted state
  const isMounted = useRef(false)
  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loggingIn, setLoggingIn] = useState(false)
  const [err, setErr] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [passwordLength, setPasswordLength] = useState(0)

  const router = useRouter()

  const onFinish = (values: any) => {
    setLoggingIn(true)
    setErr('')
    setShowAlert(false)

    signup(values.email, values.password, 'TUTOR')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          router.replace('/login')
        } else {
          setErr(data.message)
        }
      })
      .catch((_) => {
        setErr('Something went wrong')
      })
      .finally(() => {
        if (isMounted.current) {
          // ? preserve memory leak
          // ? state is updated only if mounted
          setLoggingIn(false)
        }
      })
  }
  const onFinishFailed = (errorInfo: any) => {}

  useEffect(() => {
    if (err != '') {
      setShowAlert(true)
    }
  }, [err])

  const user = useSelector(selectUser)

  useEffect(() => {
    if (user) router.push('/')
  }, [])

  return (
    // <div className="grid h-screen w-screen place-items-center">
    //   <div className={classes.container}>
    //     <div className={classes.wrapper}>
    //       <div className={classes.header}>
    //         <img
    //           className="mx-auto h-12 w-auto"
    //           src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
    //           alt="Workflow"
    //         />
    //         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
    //           Create your account
    //         </h2>
    //         <p className="mt-2 text-center text-sm text-gray-600">
    //           Or
    //           <a
    //             href="/login"
    //             className="font-medium text-indigo-600 hover:text-indigo-500"
    //           >
    //             {' '}
    //             Already have an account{' '}
    //           </a>
    //         </p>
    //       </div>

    //       <Form
    //         layout="vertical"
    //         initialValues={{ sendMail: true }}
    //         onFinish={onFinish}
    //         onFinishFailed={onFinishFailed}
    //         autoComplete="off"
    //       >
    //         <Form.Item
    //           label="Email"
    //           name="email"
    // rules={[
    //   { type: 'email' },
    //   { required: true, message: 'Please input your email!' },
    // ]}
    //         >
    //           <Input placeholder="Enter email address" />
    //         </Form.Item>

    //         <Form.Item
    //           name="role"
    //           label="Choose role"
    //           rules={[{ required: true, message: 'Please choose your role!' }]}
    //         >
    //           <Select placeholder="Choose your role" defaultValue={'TUTOR'}>
    //             <Option value="TUTOR">Tutor</Option>
    //             <Option value="PARENT">Parent</Option>
    //           </Select>
    //         </Form.Item>

    //         <Form.Item
    //           label="Password"
    //           name="password"
    //           rules={[
    //             { required: true, message: 'Please input your password!' },
    //           ]}
    //         >
    //           <Input.Password
    //             placeholder="Enter password"
    //             onChange={(e) => setPasswordLength(e.target.value.length)}
    //           />
    //         </Form.Item>

    // <div className={classes.strength}>
    //   <span
    //     className={`${classes.box} ${
    //       passwordLength >= 2 && classes.strongO
    //     }`}
    //   ></span>
    //   <span
    //     className={`${classes.box} ${
    //       passwordLength >= 4 && classes.strongO
    //     }`}
    //   ></span>
    //   <span
    //     className={`${classes.box} ${
    //       passwordLength >= 6 && classes.strong
    //     }`}
    //   ></span>
    //   <span
    //     className={`${classes.box} ${
    //       passwordLength >= 8 && classes.strong
    //     }`}
    //   ></span>
    // </div>

    //         <Form.Item
    // name="confirm"
    // label="Confirm Password"
    // dependencies={['password']}
    // hasFeedback
    // rules={[
    //   {
    //     required: true,
    //     message: 'Please confirm your password!',
    //   },
    //   ({ getFieldValue }) => ({
    //     validator(_, value) {
    //       if (!value || getFieldValue('password') === value) {
    //         return Promise.resolve()
    //       }
    //       return Promise.reject(
    //         new Error(
    //           'The two passwords that you entered do not match!'
    //         )
    //       )
    //     },
    //   }),
    // ]}
    //         >
    //           <Input.Password placeholder="Confirm Password" />
    //         </Form.Item>

    //         <Form.Item
    //           name="agreement"
    //           valuePropName="checked"
    //           rules={[
    //             {
    //               validator: (_, value) =>
    //                 value
    //                   ? Promise.resolve()
    //                   : Promise.reject(
    //                       new Error('You should accept our terms & policies')
    //                     ),
    //             },
    //           ]}
    //         >
    //           <Checkbox>
    //             I have read and agreed to the{' '}
    //             <a href="">{'terms & policies'}</a>
    //           </Checkbox>
    //         </Form.Item>

    //         <Form.Item name="sendMail" valuePropName="checked">
    //           <Checkbox className={classes.mssg}>
    //             Digital may send you emails and messages with news, events,
    //             promotional information, and updates. You may opt out at any
    //             time in your user settings.
    //           </Checkbox>
    //         </Form.Item>

    //         <Form.Item>
    //           <Button
    // loading={loggingIn}
    // type="primary"
    // htmlType="submit"
    // style={{ width: '100%' }}
    //           >
    //             Sign up
    //           </Button>
    //         </Form.Item>
    //       </Form>
    // {showAlert && <Alert message={err} type="error" />}
    //     </div>
    //   </div>
    // </div>
    <>
      <div className="font-minionPro mx-auto min-h-screen bg-white  p-6 sm:bg-white md:bg-white lg:bg-[#f1f1f1]">
        <div className="">
          <div className="mx-auto max-w-lg">
            <a href="/">
              <h1 className="font-typograhica text-center text-4xl text-[#FED607] lg:text-5xl 2xl:text-7xl">
                temaribet
              </h1>
            </a>
          </div>
          <div className="mx-auto mb-2 max-w-lg  text-center">
            <p className="">
              Have an account?{' '}
              <a
                href="/login"
                className="pl-5 font-bold text-[#1A3765] hover:underline"
              >
                Log in
              </a>
              .
            </p>
          </div>

          <div className="  mx-auto my-2 max-w-lg rounded-3xl bg-white p-8 md:p-10 md:px-20 lg:shadow-2xl ">
            <div className="mt-2">
              {showAlert && (
                <Alert
                  message={err}
                  type="error"
                  style={{ margin: '0 0 1rem' }}
                />
              )}

              <Form
                className="flex flex-col"
                layout="vertical"
                onFinish={onFinish}
              >
                <label
                  className="mb-1 block text-xl text-gray-500 2xl:text-2xl "
                  htmlFor="email"
                >
                  <h4 className="text-xl">Email</h4>
                </label>
                <Form.Item
                  name="email"
                  rules={[
                    { type: 'email' },
                    { required: true, message: 'Please input your email!' },
                  ]}
                  className="mb-2 rounded pt-1 "
                >
                  <Input
                    size="large"
                    placeholder="Enter email address"
                    className="w-full  border border-gray-400 bg-gray-200  px-3 pb-3 text-gray-700 transition duration-500 focus:border-gray-900 focus:outline-none"
                  />
                </Form.Item>
                <label
                  className="mb-1 block text-xl  text-gray-500 2xl:text-2xl "
                  htmlFor="password"
                >
                  <h4 className="text-xl">Password</h4>
                </label>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: 'Please input your password!' },
                  ]}
                  className="mb-2 rounded pt-1 "
                >
                  <Input.Password
                    size="large"
                    placeholder="Enter password"
                    onChange={(e) => setPasswordLength(e.target.value.length)}
                    className="w-full  border border-gray-400 bg-gray-200 px-3 pb-3 text-gray-700 transition duration-500 focus:border-gray-900 focus:outline-none"
                  />
                </Form.Item>
                <div className={classes.strength}>
                  <span
                    className={`${classes.box} ${
                      passwordLength >= 2 && classes.strongO
                    }`}
                  ></span>
                  <span
                    className={`${classes.box} ${
                      passwordLength >= 4 && classes.strongO
                    }`}
                  ></span>
                  <span
                    className={`${classes.box} ${
                      passwordLength >= 6 && classes.strong
                    }`}
                  ></span>
                  <span
                    className={`${classes.box} ${
                      passwordLength >= 8 && classes.strong
                    }`}
                  ></span>
                </div>
                <label
                  className="mb-1 block text-xl  text-gray-500 2xl:text-2xl "
                  htmlFor="password"
                >
                  <h4 className="text-xl">Confirm Password</h4>
                </label>
                <Form.Item
                  name="confirm"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve()
                        }
                        return Promise.reject(
                          new Error(
                            'The two passwords that you entered do not match!'
                          )
                        )
                      },
                    }),
                  ]}
                  className="mb-2 rounded pt-1 "
                >
                  <Input.Password
                    size="large"
                    placeholder="Enter password"
                    className="w-full  border border-gray-400 bg-gray-200 px-3 pb-3 text-gray-700 transition duration-500 focus:border-gray-900 focus:outline-none"
                  />
                </Form.Item>
                <div className="flex justify-start">
                  <a
                    href="#"
                    className="text-md mb-2 text-[#1A3765]  hover:text-gray-600  2xl:text-lg"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Form.Item>
                  <Button
                    size="large"
                    loading={loggingIn}
                    type="primary"
                    htmlType="submit"
                    style={{ backgroundColor: '#1A3765', border: '#1A3765' }}
                  >
                    Sign up
                  </Button>
                </Form.Item>
                <div className="mt-2 flex items-center justify-between">
                  <hr className="w-full" />{' '}
                  <span className="mb-1 p-2 text-2xl text-gray-400 2xl:text-3xl">
                    or
                  </span>
                  <hr className="w-full" />
                </div>
                <button className=" mt-2 flex h-12 w-full  flex-row items-center border-2 bg-white  text-[#1A3765] hover:bg-blue-900 hover:text-white">
                  <span className="flex-none px-3">
                    <i className="fab fa-facebook-f"></i>
                  </span>
                  <span className="grow justify-center text-xl 2xl:text-2xl">
                    Sign in with Facebook
                  </span>
                </button>
                <button className=" mt-2 flex h-12 w-full  flex-row items-center border-2 bg-white  text-[#1A3765] hover:bg-blue-900 hover:text-white">
                  <span className="flex-none px-3">
                    <i className="fa-brands fa-google"></i>
                  </span>
                  <span className="grow justify-center text-xl 2xl:text-2xl">
                    {' '}
                    Sign in with Google
                  </span>
                </button>
              </Form>
            </div>
          </div>

          <div className="mx-auto mt-5 flex max-w-lg justify-center ">
            <p className=" text-center text-xl">
              &copy;2022 Temaribet. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
