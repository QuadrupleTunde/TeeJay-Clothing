import React from 'react';
import { useState } from 'react';
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.componenet';
import './sign-in-form.style.scss'
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';

const defaultFormField =  {
    email: '',
    password: ''
}

const SignInForm =  () => {
    
    const [formField, setFormField] = useState(defaultFormField)
    const { email, password } = formField;

    const resetFormfield = () =>{
      setFormField(defaultFormField)
    }
    

    const SignInWithGoogle = async () =>{
      await signInWithGooglePopup();
  }
  

    const handleSubmit = async (event) =>{
        event.preventDefault();
        
        try{
            await signInAuthUserWithEmailAndPassword(email, password)
            resetFormfield()
        }
        catch(error){
          console.log('user sign in failed', error)
          // switch(error.code){
          //   case "auth/wrong-password":
          //     alert("incorrect password for email");
          //     break
          //   case "auth/wrong-password":
          //     alert("no user associated with this email");
          //     break;
          //   default:
          //     console.log(error)
          // }
        }
      }
    
    const handleChange = (event) =>{
        const { name, value} = event.target;

        setFormField({...formField, [name] : value})
    }
  return (
    <div className='sign-up-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and passworc</span>
      <form onSubmit={handleSubmit}>
        <FormInput label='Email' type={'email'} required onChange={handleChange} name="email" value={email}/>
        <FormInput label='Password' type={'password'} required onChange={handleChange} name="password" value={password}/>
        <div className='buttons-container'>
        <Button  type='submit'>Sign In</Button>
        <Button type= 'button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={ SignInWithGoogle } >Google sign in </Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm
