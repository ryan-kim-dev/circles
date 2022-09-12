import React, { useState } from 'react';

function RegisterForm() {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
  });

  const onChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(userInfo);
  };

  return (
    <div>
      <form onChange={onChange} onSubmit={onSubmit}>
        <div>
          <label htmlFor="username">
            <input type="text" name="username" id="username" />
          </label>
        </div>
        <div>
          <label htmlFor="email">
            <input type="email" name="email" id="email" />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            <input type="password" name="password" id="password" />
          </label>
        </div>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterForm;
