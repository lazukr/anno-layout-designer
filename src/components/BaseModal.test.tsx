import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BaseModal } from "./BaseModal";

describe("testing <BaseModal />.", () => {
    it("is hidden when showState is false.", () => {
        render(
            <BaseModal
                showState={false}
                showButton={false}
                title={"test"}
                buttonName={"button"}
                hide={() => console.log("hide")}
                action={() => console.log("action")}
            >
            </BaseModal>
        );
        expect(screen.queryByTestId("modal")).toBeFalsy();
    });

    it("renders when showState is true.", () => {
        render(
            <BaseModal
                showState={true}
                showButton={false}
                title={"test"}
                buttonName={"button"}
                hide={() => console.log("hide")}
                action={() => console.log("action")}
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
                showButton={false}
                title={titleName}
                buttonName={"button"}
                hide={() => console.log("hide")}
                action={() => console.log("action")}
            >
            </BaseModal>
        );
        expect(screen.getByTestId("title")).toBeTruthy();
        expect(screen.getByTestId("title")).toHaveTextContent(titleName);
    });

    it("does not render footer or button when showButton is false.", () => {
        render(
            <BaseModal
                showState={true}
                showButton={false}
                title={"test"}
                buttonName={"button"}
                hide={() => console.log("hide")}
                action={() => console.log("action")}
            >
            </BaseModal>
        );
        expect(screen.queryByTestId("footer")).toBeFalsy();
        expect(screen.queryByTestId("button")).toBeFalsy();
    });

    it("renders the footer and button when showButton is true.", () => {
        render(
            <BaseModal
                showState={true}
                showButton={true}
                title={"test"}
                buttonName={"button"}
                hide={() => console.log("hide")}
                action={() => console.log("action")}
            >
            </BaseModal>
        );
        expect(screen.getByTestId("footer")).toBeTruthy();
        expect(screen.getByTestId("button")).toBeTruthy();
    });

    it("displays the provided button name.", () => {
        const buttonName = "This is the button name";
        render(
            <BaseModal
                showState={true}
                showButton={true}
                title={"test"}
                buttonName={buttonName}
                hide={() => console.log("hide")}
                action={() => console.log("action")}
            >
            </BaseModal>
        );
        expect(screen.getByTestId("button")).toBeTruthy();
        expect(screen.getByTestId("button")).toHaveTextContent(buttonName);
    });    
});
