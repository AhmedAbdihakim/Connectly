const Login = () => {
  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" required />
        </div>
        <button>Log in</button>
      </form>
    </div>
  );
};

export default Login;
