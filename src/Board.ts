export class Dimension {
    public static Zero = new Dimension(0, 0);
    public static Unit = new Dimension(1, 1);
    public readonly width: number;
    public readonly height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}

export class Position {
    public readonly x: number;
    public readonly y: number;

    public static Origin = new Position(0, 0);

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
};

type Tile = {
    occupied: boolean;
    image: string;
};

type TileUpdate = {
    tile: Tile,
    occupies: Dimension,
};

const EmptyTile: Tile = {
    occupied: false,
    image: "",
};

const OccupiedTile: Tile = {
    occupied: true,
    image: "",
};

export class Board {
    public readonly width: number;
    public readonly height: number;
    private _board: Tile[][];

    constructor(dim: Dimension) {
        this.width = dim.width;
        this.height = dim.height;
        this._board = new Array(this.width)
            .fill(null)
            .map(i => new Array(this.height).fill(null));
    }

    public updateTile(tileUpdate: TileUpdate, position: Position) {
        const {
            tile,
            occupies,
        } = tileUpdate;
        
        const {
            x,
            y,
        } = position;

        const {
            width,
            height,
        } = occupies;

        this._board[x][y] = tile;
        for (let i = 1; i < width; ++i) {
            for (let j = 1; j < height; ++j) {
                this._board[x + i][y + j] = OccupiedTile;
            }
        }
    }

    public eraseTile(position: Position) {
        const {
            x, y,
        } = position;
        this._board[x][y] = EmptyTile;
    }
}