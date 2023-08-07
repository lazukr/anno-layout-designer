import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BaseModal } from "./BaseModal";

describe("testing <BaseModal />.", () => {
    it("is hidden when showState is false.", () => {
        render(
            <BaseModal
                showState={false}
                title={"test"}
                hide={() => console.log("hide")}
            >
            </BaseModal>
        );
        expect(screen.queryByTestId("modal")).toBeFalsy();
    });

    it("renders when showState is true.", () => {
        render(
            <BaseModal
                showState={true}
                title={"test"}
                hide={() => console.log("hide")}
            >
            </BaseModal>
        );
        expect(screen.getByTestId("modal")).toBeTruthy();
    });

    it("displays the provided title name.", () => {
        const titleName = "This is the title name";

        render(
            <BaseModal
                showState={true}
                title={titleName}
                hide={() => console.log("hide")}
            >
            </BaseModal>
        );
        expect(screen.getByTestId("title")).toBeTruthy();
        expect(screen.getByTestId("title")).toHaveTextContent(titleName);
    });
});
