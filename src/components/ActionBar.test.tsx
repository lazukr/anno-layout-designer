import { ActionBar } from "./ActionBar";
import { renderWithProviders } from "../utils/test-utils";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("ActionBar displays", () => {
	test("All buttons show", () => {
		renderWithProviders(<ActionBar />);
		const newLayoutButton = screen.getByRole("button", { name: "New Layout" });
		const importLayoutButton = screen.getByRole("button", {
			name: "Import Layout",
		});
		const exportLayoutButton = screen.getByRole("button", {
			name: "Export Layout",
		});
		const infoButton = screen.getByRole("button", {
			name: "Info",
		});
		expect(newLayoutButton).toBeInTheDocument();
		expect(importLayoutButton).toBeInTheDocument();
		expect(exportLayoutButton).toBeInTheDocument();
		expect(infoButton).toBeInTheDocument();
	});
});
