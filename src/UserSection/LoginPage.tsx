const LoginPage = () => {
  return (
    <div className="login-page">
      <h1>Log In</h1>
      <form className="login-form">
        <label htmlFor="username">
          Username
          <input name="username" type="text" placeholder="Username" />
        </label>
        <label htmlFor="password">
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
      </form>
    </div>
  );
};

export default LoginPage;
