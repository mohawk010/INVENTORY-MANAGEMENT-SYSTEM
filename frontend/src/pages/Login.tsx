import { ErrorMessage, Field, Formik } from 'formik'
import { Button } from 'primereact/button' 
import  { useRef } from 'react' 
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { useLoginUserMutation } from '../provider/queries/Auth.query'
import { toast } from 'sonner'
import ReCAPTCHA from "react-google-recaptcha";
const Login = () => {
const [LoginUser,LoginUserResponse] = useLoginUserMutation()
const navigate = useNavigate()
  type User={
    token:string,
    email:string,
    password:string
  }

  //@ts-ignore
  const RecaptchaRef = useRef<any>();

  const initialValues: User={
    token: '',
    email: '',
    password:''
  }

  const validationSchema =yup.object({
    email: yup.string().email("Email must be valid").required("Email is required"),
    password: yup.string().min(5,"Password must be greater than 5 characters").required("Password is required"),
  })

  const OnSubmitHandler = async(e:User,{resetForm}:any)=>{

    try {
 
      const { data, error }: any = await LoginUser(e)
      if (error) {
        toast.error(error.data.message);
        return

      }

      // console.log(data,error);


      localStorage.setItem("token", data.token);


      resetForm()
      navigate("/")
    } catch (error: any) {
      // toast
      toast.error(error.message);

    }finally{
      RecaptchaRef.current.reset();
    }
  }

  return (
    <>
      <div className='min-h-screen flex items-center justify-center w-full bg-white'>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={OnSubmitHandler}>
          {({ values, setFieldValue, handleSubmit }) => (
            <>
              <form onSubmit={handleSubmit} className="w-[96%] md:w-[70%] lg:w-1/3 shadow-md rounded-md pt-8 pb-6 px-6 bg-white border border-gray-200">

                <div className="mb-3">
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email <span className="text-red-500">*</span></label>
                  <Field id='email' name='email' className='w-full outline-none py-2 px-3 border border-gray-300 rounded-md' placeholder='Enter Your Email' />
                  <ErrorMessage component={'p'} className='text-red-500 text-xs mt-1' name='email' />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="block text-sm font-medium mb-1">Password <span className="text-red-500">*</span></label>
                  <Field name='password' id='password' className='w-full outline-none py-2 px-3 border border-gray-300 rounded-md' placeholder='Enter Your Password' />
                  <ErrorMessage component={'p'} className='text-red-500 text-xs mt-1' name='password' />
                </div>

                {import.meta.env.VITE_SITE_KEY && import.meta.env.VITE_SITE_KEY !== 'your_recaptcha_site_key_here' && (
                  <div className="mb-3">
                    <ReCAPTCHA
                      ref={RecaptchaRef}
                      sitekey={import.meta.env.VITE_SITE_KEY}
                      onChange={(e) => { setFieldValue('token', e) }}
                    />
                  </div>
                )}

                <div className="mb-3">
                  <Button
                    disabled={import.meta.env.VITE_SITE_KEY && import.meta.env.VITE_SITE_KEY !== 'your_recaptcha_site_key_here' ? !values.token : false}
                    loading={LoginUserResponse.isLoading}
                    className='w-full bg-black text-white py-2 px-2 flex items-center justify-center rounded-md'
                  >Login →
                  </Button>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <hr className="flex-1 border-gray-300" />
                  <span className="text-gray-400 text-sm">OR</span>
                  <hr className="flex-1 border-gray-300" />
                </div>

                <div className="flex flex-col items-center justify-center mt-1 gap-0">
                  <span className="inline-flex items-center gap-x-1 text-sm">Don't Have An Account ? <Link className='text-red-500 font-semibold' to={'/register'}>Register</Link></span>
                  <span className="inline-flex items-center gap-x-1 text-sm">Forgot <Link className='text-black no-underline' to={'#'}>Password ?</Link></span>
                </div>

              </form>
            </>
          )}
        </Formik>
      </div>
    </>
  )
}

export default Login