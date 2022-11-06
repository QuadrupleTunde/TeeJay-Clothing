import React from 'react';
import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.componenet';
import './sign-up-form.style.scss'
import Button from '../button/button.component';

const defaultFormField =  {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm =  () => {
    
    const [formField, setFormField] = useState(defaultFormField)

    const { displayName, email, password, confirmPassword } = formField;

    const resetFormfield = () =>{
      setFormField(defaultFormField)
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        if(password !== confirmPassword){
            alert("password do not match");
            return;
        }
        try{
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            
            await createUserDocumentFromAuth(user, {displayName})
            resetFormfield()
        }
        catch(error){
          if(error.code === "auth/email-already-in-use"){
            alert("cannot create user, email already in use")
          }else{
            console.log('user creation encountered an error', error)
          } 
        }
    }
    const handleChange = (event) =>{
        const { name, value} = event.target;

        setFormField({...formField, [name] : value})
        console.log(formField)
    }
  return (
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and passworc</span>
      <form onSubmit={handleSubmit}>
      
        <FormInput label='Display Name' type={'text'} required onChange={handleChange} name="displayName" value={displayName}/>

      
        <FormInput label='Email' type={'email'} required onChange={handleChange} name="email" value={email}/>

        <FormInput label='Password' type={'password'} required onChange={handleChange} name="password" value={password}/>

  
        <FormInput label='Confirm Password' type={'password'} required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
        <Button className='button-container' type='submit'>SIGN UP</Button>
      </form>
    </div>
  )
}

export default SignUpForm
