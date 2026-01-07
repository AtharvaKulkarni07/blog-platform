export default function Login() {
  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input className="w-full border p-2 mb-3" placeholder="Email" />
      <input className="w-full border p-2 mb-3" placeholder="Password" type="password" />
      <button className="w-full bg-black text-white py-2">Login</button>
    </div>
  );
}
