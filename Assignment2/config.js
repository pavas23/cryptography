const MINE_RATE = 1000; // mine rate is the avg time taken to mine a block and is in milli seconds;
const INITIAL_DIFFICULTY = 4;
const GENESIS_DATA = {
    timeStamp: 1680344161514,
    prevHash: "f82a30fc280e51bed411e265fa1dec3c4ce790c2a8cebc7fb35c60d50ca8ca9d",
    hash: "9ff0af45ce7c9b5dd40b9ce7cc79fc5bbd1f08e4100eaac2e2ad91f70e1beb2f",
    transaction: [],
    difficulty: INITIAL_DIFFICULTY,
    nonce: 0,
};

const USER_DATA = [
    {
        uid: 1,
        name: "Rohan Sharma",
        aadhaarId: "397788000234",
        panId: "ABCTY1234D",
        recoveryKey: "23$24%",
        bid:[]
    },
    {
        uid: 2,
        name: "Saksham Bajaj",
        aadhaarId: "294788000036",
        panId: "4BCTZ1634F",
        recoveryKey: "2%$+678%",
        bid:[]
    },
    {
        uid: 3,
        name: "Prachi Shah",
        aadhaarId: "994486004233",
        panId: "4ZCT21234X",
        recoveryKey: "ab@a$wkjn%",
        bid:[]
    },
    {
        uid: 4,
        name: "Dev Gala",
        aadhaarId: "794556004233",
        panId: "4ZCT21734X",
        recoveryKey: "gh$232%23@fg",
        bid:[]
    },
    {
        uid: 5,
        name: "Vashi Choudhari",
        aadhaarId: "784556404133",
        panId: "XZCT21834Y",
        recoveryKey: "gh$ewjkbfeb$32%23@fg",
        bid:[]
    },
    {
        uid: 6,
        name: "Ansh",
        aadharId: "918273645109",
        panId: "5647389210",
        recoveryKey: "987123",
        bid:[]
    },
    {
        uid: 7,
        name: "Stuti",
        aadharId: "102349875816",
        panId: "2834087456",
        recoveryKey: "109823",
        bid:[]
    },
    {
        uid: 8,
        name: "Nidhi",
        aadharId: "897123456019",
        panId: "1029387465",
        recoveryKey: "563428",
        bid:[]
    },
    {
        uid: 9,
        name: "Anjali",
        aadharId: "812763450967",
        panId: "4309817562",
        recoveryKey: "708965",
        bid:[]
    },
    {
        uid: 10,
        name: "Sujal",
        aadharId: "912837098788",
        panId: "1029677348",
        recoveryKey: "890144",
        bid:[]
    },
];

const BANK_DATA = [
    {
        Bid: 1,
        name: "South Indian Bank",
        password: "sgrhrzhrdzh",
        IFSCcode: "aesg232532",
    },
    {
        Bid: 2,
        name: "Kotak Mahindra Bank",
        password: "ghcfhdgdzg",
        IFSCcode: "vbfh765433",
    },
    {
        Bid: 3,
        name: "ICICI Bank",
        password: "poiuytrdfcv",
        IFSCcode: "poir39425903",
    },
    {
        Bid: 4,
        name: "HDFC Bank",
        password: "Zsdrtyhfjgmnjhg",
        IFSCcode: "mdsv634431982",
    },
    {
        Bid: 5,
        name: "Bandhan Bank",
        password: "thyfwvehLWUBWKV",
        IFSCcode: "vdgj09765423",
    }
];

module.exports = {
    GENESIS_DATA: GENESIS_DATA,
    MINE_RATE: MINE_RATE,
    USER_DATA: USER_DATA,
    BANK_DATA: BANK_DATA,
};

