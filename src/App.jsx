import Meme from "./Meme";
const App = () => {
  return (
    <div className="container mx-auto px-4 ">
      <h1 className="text-3xl font-bold text-center mt-8">
        Random Meme Hunter
      </h1>
      <Meme />
    </div>
  );
};

export default App;
