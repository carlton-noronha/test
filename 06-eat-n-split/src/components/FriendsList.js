import Friend from "./Friend";

const FriendsList = ({ selectedFriend, friends, onFriendSelection }) => {
    return (
        <ul>
            {friends.map((friend) => (
                <Friend
                    selectedFriend={selectedFriend}
                    friend={friend}
                    key={friend.id}
                    onFriendSelection={onFriendSelection}
                />
            ))}
        </ul>
    );
};

export default FriendsList;
