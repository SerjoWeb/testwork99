import FavoriteCityList from "@/components/favorites/FavoriteCityList";

const Favorites = (): React.ReactElement => {
  return (
    <main className="p-4">
      <div className="container">
        <FavoriteCityList />
      </div>
    </main>
  );
};

export default Favorites;
