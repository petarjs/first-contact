pragma solidity ^0.4.24;

contract FirstContact {
    struct User {
        uint fee;
        string linkedinUrl;
        address publicAddress;
    }

    event LogUserAdded (
        bytes32 indexed username,
        address publicAddress,
        uint fee,
        string linkedinUrl
    );

    event LogMessageSent (
        bytes32 indexed fromUsername,
        bytes32 indexed toUsername,
        string text
    );

    // username => User
    mapping (bytes32 => User) users;

    mapping (address => bytes32) userAddresses;

    constructor () public {}

    function isUsernameTaken (
        bytes32 username
    ) public view returns (bool) {
        return users[username].publicAddress != 0x0;
    }

    function registerUser (
        bytes32 username,
        uint fee,
        string linkedinUrl,
        address publicAddress
    ) public {
        require(username[0] != 0); // usernames must not be empty
        require(publicAddress != 0x0); // publicAddress must be a valid address
        require(!isUsernameTaken(username)); // no duplicate usernames
        require(userAddresses[msg.sender][0] == 0); // also, one address can register only one username

        User memory user = User({
            fee: fee,
            linkedinUrl: linkedinUrl,
            publicAddress: publicAddress
        });

        users[username] = user;
        userAddresses[msg.sender] = username;

        emit LogUserAdded(username, msg.sender, fee, linkedinUrl);
    }

    function sendMessage (
        bytes32 toUsername,
        string text
    ) public payable {
        User memory toUser = users[toUsername];
        require(toUser.publicAddress != 0x0); // recepient must exist
        require(msg.value == toUser.fee); // must send the required ether

        bytes32 myUsername = userAddresses[msg.sender];
        require(myUsername[0] != 0); // sender must exist

        toUser.publicAddress.transfer(msg.value);

        emit LogMessageSent(myUsername, toUsername, text);
    }
}