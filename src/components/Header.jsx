import logo from "../assets/logo.jpg";

export default function Header() {
  return (
    <header id="main-header">
      <h1 id="title">
        <img src={logo} alt="Logo" />
        Reactfood
      </h1>
      <button>Cart</button>
    </header>
  );
}
