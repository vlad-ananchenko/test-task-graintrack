import { ReactElement } from "react";

const HomePage = (): ReactElement => {
  return (
    <div className="flex items-center justify-center min-h-screen p-2">
      <h3 className="text-ellipsis text-3xl font-bold text-red-800">
        Home Page
      </h3>
    </div>
  );
};

export default HomePage;
