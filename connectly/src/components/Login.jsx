import Connectly from "../assets/Connectly.png";

const Login = ({ username, setUsername, handleLogin }) => {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <img src={Connectly} alt="Logo" className="h-40 w-48" />
      <br />

      <form onSubmit={(e) => e.preventDefault()} className="mt-4">
        <div>
          <label htmlFor="username">Username</label>
          <br />
          <br />
          <input
            type="text"
            name="username"
            required
            className="dark:text-black"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <button
          type="submit"
          onClick={handleLogin}
          className="mt-4 border-none bg-blue-400 hover:bg-blue-600 rounded px-4 py-2 text-white"
        >
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
