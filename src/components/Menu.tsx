import "semantic-ui-css/semantic.min.css";

export const Menu = () => {
    return (
        <div 
            id="menuPanel" 
            className="ui inverted big menu"
        >
            <div className="header item">Anno Layout Designer</div>
            <div className="row">
                <div
                    id="menu"
                    className="ui inverted simple dropdown item"
                >
                    <i className="bars icon"></i>
                        Game
                    <div className="ui menu">
                        <a href="/#" className="item">
                            Anno 1800
                        </a>
                    </div>
                </div>
            </div>

            <div className="ui compact buttons">
                <button className="ui secondary button">
                    <i className="file icon"></i>
                    New
                </button>
                <button className="ui secondary button">
                    <i className="upload icon"></i>
                    Upload
                </button>
                <button className="ui secondary button">
                    <i className="download icon"></i>
                    Download
                </button>
            </div>

            <div className="ui big icon buttons">
                <button className="ui positive button">
                    <i className="pencil icon"></i>
                </button>
                <button className="ui negative button">
                    <i className="eraser icon"></i>
                </button>
            </div>
            
            <div className="right menu">
                <a 
                    id="github" 
                    className="ui simple labeled item"
                    href="https://github.com/lazukr"
                    target="_blank"
                    rel="noreferrer"
                >
                    <i className="github icon"></i> 
                    Github
                </a>
            </div>
        </div>
    );
}