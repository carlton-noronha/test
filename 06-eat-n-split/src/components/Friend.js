import Button from "./Button";

const Friend = ({ selectedFriend, friend, onFriendSelection }) => {
    const isSelected = selectedFriend?.id === friend.id;
    return (
        <li className={isSelected ? "selected" : ""}>
            <img src={friend.image} alt={friend.name} />
            <h3>{friend.name}</h3>
            {friend.balance < 0 && (
                <p className="red">
                    You owe {friend.name} ${Math.abs(friend.balance)}
                </p>
            )}
            {friend.balance > 0 && (
                <p className="green">
                    {friend.name} owes you ${friend.balance}
                </p>
            )}
            {friend.balance === 0 && <p>You and {friend.name} are even</p>}
            <Button onClick={() => onFriendSelection(friend)}>
                {isSelected ? "Close" : "Select"}
            </Button>
        </li>
    );
};

export default Friend;
