import React, {useCallback, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';

import validation from '../Validation/validation';
import {registration} from '../../services';

import './Register.scss';

const Register = () => {

  const [form, setForm] = useState({
    firstNameInput: {
      value: '',
      type: '',
    },
    secondNameInput: {
      value: '',
      type: '',
    },
    emailInput: {
      value: '',
      type: '',
    },
    passwordInput: {
      value: '',
      type: '',
    },
    admin: {
      value: 0,
    },
  });

  const [valid, setValid] = useState({
    firstNameField: true,
    lastNameField: true,
    emailField: true,
    passField: true,
  });

  const [validate, setValidate] = useState(false);

  const handleChange = (e, key) => {
    const {value, type} = e.target
    setForm((prevState) => ({
      ...prevState,
      [key]: {
        value,
        type,
      },
    }))
  };

  const onClickbutton = () => {
    let newValue = form.admin.value + 1;
    if (form.admin.value === 0) {
      form.admin.value = newValue;
    }
  };

  const setRegisterApi = useCallback(() => {
    registration({
      inputForEmail: form.emailInput.value,
      inputForPassword: form.passwordInput.value,
      name: form.firstNameInput.value,
      lastName: form.secondNameInput.value,
      admin: form.admin.value,
    }).then(res => {
      setValidate(true)
    })
  }, [form])

  const checkValid = () => {
    const {object, isValid} = validation(form);
    setValid(object)
    if (isValid) {
      setRegisterApi()
    }
  };

  return (
    <div>
      <div className="valid__content">
        <div>
          <h2 className="h2__text"> Create your account </h2>
        </div>
        <div>
          <form className="valid__form">
            <p>First name</p>
            <input
              value={form.firstNameInput.value}
              onChange={(e) => {
                handleChange(e, 'firstNameInput')
              }}
              className={valid.firstNameField ?
                'input'
                :
                'input error-input'}
              type="text"
              placeholder='Please, write your name'
            />
            {!valid.firstNameField &&
            <p className="validation">
              Please enter other variant of the first name.
            </p>
            }
            <p>Second name</p>
            <input
              value={form.secondNameInput.value}
              onChange={
                (e) => {
                  handleChange(e, 'secondNameInput')
                }}
              className=
                {valid.lastNameField ?
                  'input'
                  :
                  'input error-input'}
              type="text"
              placeholder='Please, write your second name'
            />
            {!valid.lastNameField &&
            <p className="validation">
              Please enter other variant of the second name.
            </p>
            }
            <p>Email Address</p>
            <input
              value={form.emailInput.value}
              onChange={
                (e) => {
                  handleChange(e, 'emailInput')
                }}
              className={valid.emailField ?
                'input'
                :
                'input error-input'}
              type="text"
              placeholder='Please, write your email'
            />
            {!valid.emailField &&
            <p className="validation">
              Please enter other variant of the email.
            </p>
            }
            <p>Password</p>
            <input
              value={form.passwordInput.value}
              onChange={(e) => {
                handleChange(e, 'passwordInput')
              }}
              className={valid.passField ?
                'input'
                :
                'input error-input'}
              type="password"
              placeholder='Please, write your password'
            />
            {!valid.passField &&
            <p className="validation">
              Please enter other variant of the password.
            </p>
            }
          </form>
        </div>
        <div className="valid__bottom">
          <div className="radio__buttons">
            <div className="left__radio">
              <div>
                <input
                  className="admin"
                  type="radio"
                  onClick={onClickbutton}
                  value={form.admin.value}
                />
                Admin
              </div>
              <div>
                <Link to='/login/'>
                  Have an account?
                </Link>
              </div>
            </div>
          </div>
          <div className="marg">
            <button
              className="button__valid"
              id="button"
              onClick={checkValid}
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
      {validate && <Redirect to="/login/"/>}
    </div>
  );
}

export default Register;
