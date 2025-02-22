const categories = [
  "All",
  "men's clothing",
  "women's clothing",
  "electronics",
  "jewelery",
];

// id: 1,
// title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
// price: 109.95,
// description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
// category: "men's clothing",
// image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
// rating: {
// rate: 3.9,
// count: 120
// }

function App() {
  const [products, setProducts] = React.useState([]);
  const [type, setType] = React.useState("All");
  const [filterData, setFilterData] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const res = await axios.get(`https://fakestoreapi.com/products`);
      console.log(res);
      setProducts(res.data);
      setFilterData(res.data);
    })();
  }, []);

  function handleSelectType(e) {
    setType(e.target.value);
    const selectedType = e.target.value;

    if (selectedType === "All") {
      setFilterData(products);
      return;
    }

    const filterData = products.filter((el) => el.category === selectedType);
    setFilterData(filterData);
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="搜尋產品..."
          className="p-2 border rounded-md flex-grow"
          value={""}
          onChange={() => {}}
        />
        <select
          className="p-2 border rounded-md"
          value={type}
          onChange={(e) => handleSelectType(e)}
        >
          {categories.map((el) => (
            <option value={el} key={el}>
              {el}
            </option>
          ))}
        </select>
      </div>
      <p>{type}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filterData.map((product) => {
          const { id, title, price, description, category, image, rating } =
            product;

          return (
            <div
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
              key={id}
            >
              <div className="relative overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-48 object-cover object-center hover:scale-110 transition duration-200"
                />
                <button
                  onClick={() => {}}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={"none"}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6 text-red-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-4 flex-grow flex flex-col">
                <h2 className="font-bold text-lg mb-2 line-clamp-2">{title}</h2>
                <p className="text-gray-600 mb-2 line-clamp-2">{description}</p>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-gray-600">{`${rating.rate} (${rating.count})`}</span>
                  </div>
                  <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
                    {category}
                  </span>
                </div>
                <div className="flex items-center ms-1 mb-4">
                  <span className="font-bold text-lg">$ {price}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
