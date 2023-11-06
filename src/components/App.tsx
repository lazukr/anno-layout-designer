import { Provider } from "react-redux";
import { MainMenu } from "./MainMenu";
import { store } from "../stores/store";
import "../styles/app.scss";

export const App = () => {
	return (
		<div className="App">
			<Provider store={store}>
				<MainMenu />
			</Provider>
		</div>
	);
};
