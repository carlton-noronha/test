import { useState } from "react";
import FormAddFriend from "./components/FormAddFriend";
import FriendsList from "./components/FriendsList";
import Button from "./components/Button";
import FormSplitBill from "./components/FormSplitBill";

const initialFriends = [
    {
        id: 118836,
        name: "Clark",
        image: "https://i.pravatar.cc/48?u=118836",
        balance: -7,
    },
    {
        id: 933372,
        name: "Sarah",
        image: "https://i.pravatar.cc/48?u=933372",
        balance: 20,
    },
    {
        id: 499476,
        name: "Anthony",
        image: "https://i.pravatar.cc/48?u=499476",
        balance: 0,
    },
];

const App = () => {
    const [showAddFiend, setShowAddFriend] = useState(false);
    const [friends, setFriends] = useState(initialFriends);
    const [selectedFriend, setSelectedFriend] = useState(null);

    const handleShowAddFriend = () => {
        setShowAddFriend((show) => !show);
        setSelectedFriend(null);
    };
    const handleAddFriend = (friend) => {
        setFriends((friends) => [...friends, friend]);
        setShowAddFriend(false);
    };
    const handleFriendSelection = (friend) => {
        setShowAddFriend(false);
        setSelectedFriend((previouslySelectedFriend) =>
            previouslySelectedFriend?.id === friend.id ? null : friend
        );
    };
    const handleSplitBill = (value) => {
        setFriends((friends) =>
            friends.map((friend) => {
                if (friend.id === selectedFriend.id) {
                    return { ...friend, balance: friend.balance + value };
                }
                return { ...friend };
            })
        );
        setSelectedFriend(null);
    };

    return (
        <section className="app">
            <section className="sidebar">
                <FriendsList
                    selectedFriend={selectedFriend}
                    friends={friends}
                    onFriendSelection={handleFriendSelection}
                />
                {showAddFiend && (
                    <FormAddFriend onAddFriend={handleAddFriend} />
                )}
                <Button onClick={handleShowAddFriend}>
                    {showAddFiend ? "Close" : "Add Friend"}
                </Button>
            </section>
            {selectedFriend && (
                <FormSplitBill
                    key={selectedFriend.id}
                    selectedFriend={selectedFriend}
                    onSplitBill={handleSplitBill}
                />
            )}
        </section>
    );
};

export default App;
